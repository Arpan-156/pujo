const fs = require('fs');

// --- Fix PujaMap.tsx ---
let mapCode = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

if (!mapCode.includes('import { GeoBar }')) {
  mapCode = "import { GeoBar } from '../components/GeoBar';\nimport { getDistance, useGeo } from '../lib/geo';\n" + mapCode;
}

const mapStart = mapCode.indexOf('export function PujaMap');
const mapEnd = mapCode.indexOf('export function MiniMap');

const newPujaMap = `export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  const [q, setQ] = useState('');
  const [radius, setRadius] = useState(3);
  const { geo } = useGeo();

  const filtered = pujas.filter(p => {
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase());
    let matchRad = true;
    if (geo.active && geo.lat && geo.lng && p.lat && p.lng) {
      const d = getDistance(geo.lat, geo.lng, p.lat, p.lng);
      if (d > radius) matchRad = false;
    }
    return matchQ && matchRad;
  });

  const cur = pujas.find((p) => p.slug === sel) || filtered[0] || pujas[0];
  const mapQuery = cur.lat && cur.lng ? \`\${cur.lat},\${cur.lng}\` : (cur.x && cur.y ? \`\${23.28 - (cur.y / 100) * 0.06},\${(cur.x / 100) * 0.08 + 87.82}\` : encodeURIComponent(\`\${cur.name} Durga Puja, \${cur.location}, Bardhaman\`));

  return (
    <>
      <style>{\`
        .pmap-new-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
        @media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; }
          .pmap-new-list { max-height: 280px; overflow-y: auto; }
          .pmap-new-iframe { height: 350px; margin-top: 10px; }
          .pmap-mobile-wrapper { height: auto !important; }
        }
      \`}</style>
      <section className={\`pmap \${className}\`} style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles kind="embers" count={45} />
        <div style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }}><Alpana size={800} spin /></div>
        <PujaScenario />
        
        <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '20px' }}>
          <GeoBar radius={radius} setRadius={setRadius} searchQuery={q} setSearchQuery={setQ} />
        </div>

        <div className="wrap pmap-new-grid" style={{ paddingTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0 }} className="pmap-mobile-wrapper">
            <aside className="pmap-new-list" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '12px', scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
              {filtered.length === 0 && <div style={{ color: 'var(--mute)', textAlign: 'center', padding: '40px 0' }}>No pujas found within {radius}km.</div>}
              {filtered.map((p) => {
                const active = sel === p.slug;
                let distStr = '';
                if (geo.active && geo.lat && geo.lng && p.lat && p.lng) {
                  const d = getDistance(geo.lat, geo.lng, p.lat, p.lng);
                  distStr = d < 1 ? \`\${(d * 1000).toFixed(0)}m away\` : \`\${d.toFixed(1)}km away\`;
                }

                return (
                  <button
                    key={p.slug}
                    onClick={() => setSel(p.slug)}
                    style={{
                      textAlign: 'left',
                      padding: '20px',
                      background: active ? 'rgba(233,181,88,0.12)' : 'rgba(255,255,255,0.02)',
                      border: \`1px solid \${active ? 'var(--gold)' : 'var(--line)'}\`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
                    {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: 'var(--gold)' }} />}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500, lineHeight: 1.5, paddingBottom: '8px' }}>
                        {p.name}
                      </h4>
                      {distStr && <span style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(233,181,88,0.1)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>{distStr}</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.4 }}>{p.location}</p>
                  </button>
                );
              })}
            </aside>
          </div>
          
          <div className="pmap-new-iframe" style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)', background: '#111' }}>
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)' }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src={\`https://maps.google.com/maps?q=\${mapQuery}&t=m&z=16&output=embed&iwloc=near\`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

`;

mapCode = mapCode.substring(0, mapStart) + newPujaMap + mapCode.substring(mapEnd);
fs.writeFileSync('src/sections/PujaMap.tsx', mapCode, 'utf8');

// --- Fix Pages.tsx (RoutePlannerPage) ---
let pageCode = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

if (!pageCode.includes('import { GeoBar }')) {
  pageCode = "import { GeoBar } from '../components/GeoBar';\nimport { useGeo, getDistance } from '../lib/geo';\n" + pageCode;
}

const rpStart = pageCode.indexOf('export function RoutePlannerPage() {');
const rpEnd = pageCode.indexOf('export function SurvivalKitPage'); // Safe end!

const newRp = `export function RoutePlannerPage() {
  const [time, setTime] = useState('quick');
  const [vibe, setVibe] = useState('accessible');
  const [transport, setTransport] = useState('toto');
  const [route, setRoute] = useState<any>(null);
  const [radius, setRadius] = useState(5);
  const [q, setQ] = useState('');
  
  const { pujas } = useData();
  const { geo } = useGeo();

  const generate = () => {
    let pool = [...pujas];
    
    if (geo.active && geo.lat && geo.lng) {
      pool = pool.filter(p => {
        if (!p.lat || !p.lng) return true; // keep if no coords just in case
        return getDistance(geo.lat!, geo.lng!, p.lat, p.lng) <= radius;
      });
    } else {
      // Fallback if no GPS, just take Town
      pool = pool.filter(p => p.zone === 'Bardhaman Town');
    }

    let vibePujas = pool.filter(p => {
      if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
      if (vibe === 'carnival') return p.categories.includes('Community Puja');
      if (vibe === 'accessible') return p.categories.includes('Traditional');
      return true;
    });
    if (vibePujas.length === 0) vibePujas = pool;

    let count = 5;
    let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
    if (time === 'standard') { count = 8; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
    if (time === 'marathon') { count = 12; timeDesc = 'An all-night marathon covering maximum ground!'; }

    // Sort by distance to user if active, otherwise fallback sorting
    if (geo.active && geo.lat && geo.lng) {
      vibePujas.sort((a, b) => {
        const dA = (a.lat && a.lng) ? getDistance(geo.lat!, geo.lng!, a.lat, a.lng) : 999;
        const dB = (b.lat && b.lng) ? getDistance(geo.lat!, geo.lng!, b.lat, b.lng) : 999;
        return dA - dB;
      });
    }

    let finalPandals = vibePujas.slice(0, count);

    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        if (p.lat && p.lng && nextP.lat && nextP.lng) {
          const dist = getDistance(p.lat, p.lng, nextP.lat, nextP.lng);
          if (dist < 0.5) transit = 'Walk 5-10 mins';
          else if (dist < 1.5) transit = transport === 'walk' ? 'Walk 15-20 mins' : 'Toto 5-10 mins';
          else transit = transport === 'toto' ? 'Toto 15+ mins' : 'Drive/Auto 10 mins';
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        lat: p.lat,
        lng: p.lng,
        tip: p.featured ? 'Award Winner! Highly recommended.' : 'Expect crowds during peak hours.',
        transit
      };
    });

    setRoute({
      title: geo.active ? \`Dynamic Route from \${geo.area}\` : 'Your Custom Puja Trail',
      desc: geo.active ? \`Optimized for your realtime location (\${radius}km radius).\` : 'A robust mix of everything that makes Burdwan Durga Puja famous.',
      pandals: mappedPandals,
      timeDesc
    });
  };

  const openGoogleMaps = () => {
    if (!route || route.pandals.length === 0) return;
    const getQuery = (p: any) => p.lat && p.lng ? \`\${p.lat},\${p.lng}\` : encodeURIComponent(\`\${p.name}, Burdwan\`);
    
    let originStr = '';
    if (geo.active && geo.lat && geo.lng) {
      originStr = \`\${geo.lat},\${geo.lng}\`;
    } else {
      originStr = getQuery(route.pandals[0]);
    }
    
    const destination = getQuery(route.pandals[route.pandals.length - 1]);
    
    let waypointsArr = route.pandals;
    if (!geo.active) waypointsArr = route.pandals.slice(1, -1);
    else waypointsArr = route.pandals.slice(0, -1);
    
    if (waypointsArr.length > 8) {
      const step = waypointsArr.length / 8;
      waypointsArr = Array.from({ length: 8 }, (_, i) => waypointsArr[Math.floor(i * step)]);
    }
    const waypoints = waypointsArr.map(getQuery).join('%7C'); // URL encoded pipe
    
    let mode = 'driving';
    if (transport === 'walk') mode = 'walking';
    
    const url = \`https://www.google.com/maps/dir/?api=1&origin=\${originStr}&destination=\${destination}&waypoints=\${waypoints}&travelmode=\${mode}\`;
    window.open(url, '_blank');
  };

  return (
    <div className="page-head" style={{ minHeight: '100vh', height: 'auto', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 'calc(var(--safe-t, 0px) + 120px) 20px 120px', position: 'relative' }}>
      <div className="page-head-bg" style={{ position: 'absolute', inset: '-5%', zIndex: -3, opacity: 0.25, filter: 'blur(8px)' }}>
        <div style={{ width: '100%', height: '100%', opacity: 1 }}><Photo v={{ src: '/images/saptami.jpg', art: 'pandal', seed: 0 }} eager alt="" className="full-photo" /></div>
      </div>
      <div className="page-head-shade" style={{ position: 'absolute', inset: 0, zIndex: -2, background: 'radial-gradient(circle at center, rgba(15,5,6,0.6) 0%, rgba(10,3,4,0.98) 100%)' }} />

      <style>{\`
        .full-photo img { width: 100%; height: 100%; object-fit: cover; }
        .rp-wrap { width: 100%; max-width: 900px; position: relative; z-index: 2; display: flex; flex-direction: column; gap: 40px; }
        
        .rp-radio-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
        @media (min-width: 768px) { .rp-radio-grid { grid-template-columns: repeat(3, 1fr); } }
        
        .rp-label { display: block; cursor: pointer; position: relative; }
        .rp-label input { position: absolute; opacity: 0; width: 0; height: 0; }
        .rp-card { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; transition: all 0.3s ease; height: 100%; backdrop-filter: blur(10px); }
        .rp-label:hover .rp-card { border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
        .rp-label input:checked + .rp-card { border-color: var(--gold); background: rgba(233,181,88,0.1); box-shadow: 0 0 20px rgba(233,181,88,0.2); }
        
        .rp-btn { width: 100%; background: linear-gradient(135deg, var(--gold), #d49527); color: #0a0304; border: none; padding: 20px; font-size: 1.25rem; font-weight: bold; border-radius: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(233,181,88,0.3); font-family: var(--f-body); margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .rp-btn:hover { transform: scale(1.02); box-shadow: 0 15px 40px rgba(233,181,88,0.5); }
        
        .rp-timeline { position: relative; padding-left: 30px; margin-top: 40px; }
        .rp-timeline::before { content: ''; position: absolute; left: 0; top: 20px; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--gold) 0%, rgba(233,181,88,0.1) 100%); }
        
        .rp-node { position: relative; margin-bottom: 40px; }
        .rp-node-dot { position: absolute; left: -39px; top: 20px; width: 20px; height: 20px; background: #0a0304; border: 3px solid var(--gold); border-radius: 50%; box-shadow: 0 0 15px var(--gold); z-index: 2; transition: all 0.3s ease; }
        .rp-node:hover .rp-node-dot { transform: scale(1.2); box-shadow: 0 0 25px var(--gold); background: var(--gold); }
        .rp-pandal-card { background: rgba(15,5,6,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.3s ease; }
        .rp-pandal-card:hover { border-color: rgba(233,181,88,0.3); transform: translateX(10px); }
        
        .map-btn { background: rgba(233,181,88,0.15); color: var(--gold); border: 1px solid var(--gold); border-radius: 12px; padding: 12px 24px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; font-family: 'Inter', system-ui, sans-serif; }
        .map-btn:hover { background: var(--gold); color: #0a0304; box-shadow: 0 0 20px rgba(233,181,88,0.4); }
      \`}</style>

      <div className="rp-wrap">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', margin: '0 0 10px', background: 'linear-gradient(to right, #fff, #e9b558)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Route Planner</h1>
          <p style={{ color: 'var(--mute)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Generate an optimized pandal hopping route based on your real-time location.</p>
        </div>

        <GeoBar radius={radius} setRadius={setRadius} searchQuery={q} setSearchQuery={setQ} />

        {!route ? (
          <div style={{ animation: 'popIn 0.5s ease' }}>
            <div style={{ marginBottom: '30px', marginTop: '20px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Time Available</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>How long do you plan to hop?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'quick', title: 'Quick Sprint', desc: '~2 Hours / 5 Pandals', icon: '??' },
                  { id: 'standard', title: 'Standard', desc: '~4 Hours / 8 Pandals', icon: '??' },
                  { id: 'marathon', title: 'Marathon', desc: 'All Night / 12 Pandals', icon: '??' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="time" value={opt.id} checked={time === opt.id} onChange={(e) => setTime(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{opt.icon}</div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Vibe / Preference</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>What kind of pujas do you want to see?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'art', title: 'Theme & Art', desc: 'Award-winning installations', icon: '??' },
                  { id: 'carnival', title: 'Mela & Carnival', desc: 'Big crowds, food, fun', icon: '??' },
                  { id: 'accessible', title: 'Traditional', desc: 'Classic, authentic vibes', icon: '??' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="vibe" value={opt.id} checked={vibe === opt.id} onChange={(e) => setVibe(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{opt.icon}</div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Transport Mode</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>How are you getting around?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'walk', title: 'Walking', desc: 'Best for tight lanes', icon: '??' },
                  { id: 'toto', title: 'Toto / E-Rickshaw', desc: 'The Burdwan way', icon: '??' },
                  { id: 'car', title: 'Car / Bike', desc: 'Prepare for parking', icon: '??' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="transport" value={opt.id} checked={transport === opt.id} onChange={(e) => setTransport(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{opt.icon}</div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="rp-btn" onClick={generate}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Generate Optimized Route
            </button>
          </div>
        ) : (
          <div style={{ animation: 'popIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', background: 'rgba(15,5,6,0.8)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(233,181,88,0.3)', backdropFilter: 'blur(20px)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--f-display)', fontSize: '2.5rem', margin: '0 0 10px', color: 'var(--gold)' }}>{route.title}</h2>
                <p style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.1rem' }}>{route.desc}</p>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', color: 'var(--gold)', fontSize: '0.9rem', marginTop: '10px' }}>
                  ?? {route.timeDesc}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="map-btn" onClick={() => setRoute(null)} style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  Back
                </button>
                <button className="map-btn" onClick={openGoogleMaps}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  Open in Maps
                </button>
              </div>
            </div>

            <div className="rp-timeline">
              {route.pandals.map((p: any, i: number) => (
                <div key={i} className="rp-node">
                  <div className="rp-node-dot"></div>
                  <div className="rp-pandal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <span style={{ background: 'var(--gold)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{i + 1}</span>
                          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{p.zone}</span>
                        </div>
                        <h3 style={{ margin: '0 0 8px', fontSize: '1.8rem', color: '#fff', fontFamily: 'var(--f-display)' }}>{p.name}</h3>
                        <p style={{ margin: '0', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#d63384' }}></span>
                          {p.theme}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--gold)', fontSize: '0.95rem' }}><strong>Insider Tip:</strong> {p.tip}</p>
                    </div>
                  </div>
                  
                  {i < route.pandals.length - 1 && (
                    <div style={{ padding: '20px 0 0 10px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {p.transit} to next stop
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="rp-btn" onClick={openGoogleMaps} style={{ marginTop: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Start Navigating
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
`;

pageCode = pageCode.substring(0, rpStart) + newRp + pageCode.substring(rpEnd);
fs.writeFileSync('src/pages/Pages.tsx', pageCode, 'utf8');

console.log('Safely replaced RoutePlannerPage and PujaMap!');
