const fs = require('fs');

const code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const startIdx = code.indexOf('export function RoutePlannerPage() {');
const endIdx = code.indexOf('export function SurvivalKitPage() {');

let newRp = `export function RoutePlannerPage() {
  const [zone, setZone] = useState('central');
  const [time, setTime] = useState('quick');
  const [vibe, setVibe] = useState('accessible');
  const [transport, setTransport] = useState('toto');
  const [route, setRoute] = useState<any>(null);

  const { pujas } = useData();

  const generate = () => {
    const townPujas = pujas.filter(p => p.zone === 'Bardhaman Town');

    const ZONES: Record<string, string[]> = {
      central: ['Bardhaman Town', 'Baranilpur', 'Khosbagan', 'Vivekananda College Road', 'Rathtala', 'Chhotonilpur', 'Laxmipur Math', 'Susopanna', 'Bardhaman'],
      north: ['Alamganj', 'Tikrahat', 'Keshabganj', 'Kalna Gate'],
      south: ['Sripally', 'Sankhari Pukur ln, Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan']
    };

    let zonePujas = townPujas.filter(p => (ZONES[zone] || []).includes(p.area));
    if (zonePujas.length === 0) zonePujas = [...townPujas];

    let vibePujas = zonePujas.filter(p => {
      if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
      if (vibe === 'carnival') return p.categories.includes('Community Puja');
      if (vibe === 'accessible') return p.categories.includes('Traditional') || p.zone === 'Bardhaman Town';
      return true;
    });
    if (vibePujas.length === 0) vibePujas = [...zonePujas];

    let count = 5;
    let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
    if (time === 'standard') { count = 8; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
    if (time === 'marathon') { count = 12; timeDesc = 'An all-night marathon covering maximum ground!'; }

    const AREA_ORDER = [
      'Alamganj', 'Tikrahat', 'Keshabganj', 'Kalna Gate',
      'Khosbagan', 'Rathtala', 'Vivekananda College Road', 'Bardhaman', 'Susopanna',
      'Baranilpur', 'Chhotonilpur', 'Laxmipur Math',
      'Sripally', 'Sankhari Pukur ln, Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan'
    ];

    const getAreaIndex = (area: string) => {
      const idx = AREA_ORDER.indexOf(area);
      return idx === -1 ? 99 : idx;
    };

    let available = [...townPujas];
    available.sort((a, b) => {
      const idxA = getAreaIndex(a.area);
      const idxB = getAreaIndex(b.area);
      if (idxA !== idxB) return idxA - idxB;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    let finalPandals: any[] = [];
    let startPool = available.filter(p => vibePujas.includes(p));
    if (startPool.length === 0) startPool = available;
    
    let current = startPool[Math.floor(Math.random() * Math.min(3, startPool.length))];
    if (!current) current = startPool[0];

    finalPandals.push(current);

    while (finalPandals.length < count) {
      const usedNames = finalPandals.map(p => p.name);
      let candidates = startPool.filter(p => !usedNames.includes(p.name));
      if (candidates.length === 0) candidates = available.filter(p => !usedNames.includes(p.name));
      if (candidates.length === 0) break;
      
      let next = candidates.find(p => getAreaIndex(p.area) >= getAreaIndex(current.area));
      if (!next) next = candidates[0];
      
      finalPandals.push(next);
      current = next;
    }

    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        if (p.area === nextP.area) {
          transit = 'Walk 5 mins';
        } else {
          const idxDiff = Math.abs(getAreaIndex(p.area) - getAreaIndex(nextP.area));
          if (transport === 'walk') {
            transit = idxDiff > 3 ? 'Toto / Walk 20+ mins' : 'Walk 10-15 mins';
          } else if (transport === 'car') {
            transit = 'Drive / Park 10 mins';
          } else {
            transit = idxDiff > 3 ? 'Toto 15 mins' : 'Toto 5 mins';
          }
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        lat: p.lat,
        lng: p.lng,
        tip: (() => {
          if (p.featured) return (p.description && p.description.length > 70 ? p.description.substring(0, 70) + '...' : p.description) + ' (Award Winner!)';
          let tips = [];
          if (p.categories.includes('Theme Puja')) tips.push('Take your time to notice the intricate theme details.');
          else if (p.categories.includes('Traditional')) tips.push('Experience the authentic, traditional Sabeki vibe.');
          if (p.themeId === 'architecture') tips.push('Stand back for a wide-angle shot of the grand structure!');
          if (p.themeId === 'eco') tips.push('Look closely at the eco-friendly materials used in the decor.');
          if (['Chhotonilpur', 'Baranilpur', 'Alamganj'].includes(p.area)) tips.push('Expect heavy crowds—keep your group together!');
          if (time === 'marathon' && Math.random() > 0.6) tips.push('Great spot to grab some phuchka or egg roll nearby!');
          if (tips.length > 0) return tips[Math.floor(Math.random() * tips.length)];
          return 'Arrive early to beat the massive queues!';
        })(),
        transit
      };
    });

    const routeTitles: Record<string, string> = {
      'central': 'The Central Core Trail',
      'north': 'The Northern Heritage Route',
      'south': 'The Sripally Serenade'
    };

    const routeDescs: Record<string, string> = {
      'art': 'A curated journey through breathtaking thematic installations and award-winning artistry.',
      'carnival': 'Dive into massive crowds, giant wheels, endless street food, and ultimate celebration.',
      'accessible': 'An easy-to-navigate route focusing on comfort, tradition, and minimal walking.'
    };

    setRoute({
      title: routeTitles[zone] || 'Your Custom Puja Trail',
      desc: routeDescs[vibe] || 'A robust mix of everything that makes Burdwan Durga Puja famous.',
      pandals: mappedPandals,
      timeDesc
    });
  };

  const openGoogleMaps = () => {
    if (!route || route.pandals.length === 0) return;
    const origin = route.pandals[0].lat + ',' + route.pandals[0].lng;
    const destination = route.pandals[route.pandals.length - 1].lat + ',' + route.pandals[route.pandals.length - 1].lng;
    
    let waypointsArr = route.pandals.slice(1, -1);
    if (waypointsArr.length > 8) {
      const step = waypointsArr.length / 8;
      waypointsArr = Array.from({ length: 8 }, (_, i) => waypointsArr[Math.floor(i * step)]);
    }
    const waypoints = waypointsArr.map((p: any) => p.lat + ',' + p.lng).join('|');
    
    let mode = 'driving';
    if (transport === 'walk') mode = 'walking';
    
    const url = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + destination + '&waypoints=' + waypoints + '&travelmode=' + mode;
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

        @media print {
          body { background: white !important; color: black !important; }
          @page { size: A4; margin: 0; }
            .rp-wrap { padding: 1.2cm !important; }
            .page-head-bg, .page-head-shade, .print-hide, nav, footer, .music, .passport-wrapper, .map-btn { display: none !important; }
          .page-head { padding: 0 !important; min-height: 0 !important; }
          .rp-pandal-card { background: white !important; border: 1px solid #ccc !important; box-shadow: none !important; break-inside: avoid; color: black !important; }
          .rp-timeline::before { background: black !important; }
          .rp-node-dot { border-color: black !important; background: white !important; box-shadow: none !important; }
          h1, h2, h3, h4, p, span { color: black !important; text-shadow: none !important; }
        }
      \`}</style>

      <div className="rp-wrap">
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.04, pointerEvents: 'none', zIndex: -1 }}>
           <Alpana size={800} spin={true} />
        </div>

        {!route ? (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--gold)', lineHeight: 0.9, marginBottom: '20px' }}><RevealText as="h1" lines={['Route', 'Planner']} className="display" live /></div>
              <p style={{ color: 'var(--mute)', fontSize: '1.2rem' }}>Smart itinerary generation powered by geographic routing.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>1. Starting Zone</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'central', t: 'Central Core', d: 'Khosbagan & Baranilpur. Massive themes.' },
                    { v: 'north', t: 'Northern Heritage', d: 'Alamganj. Traditional heavy-hitters.' },
                    { v: 'south', t: 'South Serenade', d: 'Sripally. Creative & less chaotic.' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="zone" value={o.v} checked={zone === o.v} onChange={() => setZone(o.v)} />
                      <div className="rp-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>2. Available Time</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'quick', i: '?', t: 'Quick Express', d: '~2 Hours (5 Pandals)' },
                    { v: 'standard', i: '??', t: 'Standard Hop', d: '~4 Hours (8 Pandals)' },
                    { v: 'marathon', i: '??', t: 'Night Marathon', d: '8+ Hours (12 Pandals)' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="time" value={o.v} checked={time === o.v} onChange={() => setTime(o.v)} />
                      <div className="rp-card" style={{ textAlign: 'center', padding: '30px 20px' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{o.i}</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>3. Preferred Experience</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'accessible', t: 'Easy & Accessible', d: 'Clustered pandals with easy auto access.' },
                    { v: 'art', t: 'Art & Architecture', d: 'Award-winning architecture and designs.' },
                    { v: 'carnival', t: 'Carnival Vibe', d: 'Loud dhak, melas, and huge crowds.' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="vibe" value={o.v} checked={vibe === o.v} onChange={() => setVibe(o.v)} />
                      <div className="rp-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>4. Transportation</h2>
                  <div className="rp-radio-grid">
                    {[
                      { v: 'walk', t: 'Walking', d: 'Foot-friendly routes between close pandals.' },
                      { v: 'toto', t: 'Toto / Rickshaw', d: 'Short hops between major drops.' },
                      { v: 'car', t: 'Personal Car', d: 'Routes prioritizing parking access.' }
                    ].map(o => (
                      <label key={o.v} className="rp-label">
                        <input type="radio" name="transport" value={o.v} checked={transport === o.v} onChange={() => setTransport(o.v)} />
                        <div className="rp-card">
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="rp-btn" onClick={generate}>
                  <span>Generate My Adventure Route</span>
                  <span style={{ fontSize: '1.5rem' }}>???</span>
                </button>
            </div>
          </div>
        ) : (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div className="print-hide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
              <button onClick={() => setRoute(null)} style={{ background: 'transparent', color: 'var(--mute)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>?</span> <span>Modify Criteria</span>
              </button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={() => window.print()} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 24px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }}>Save PDF</button>
                <button onClick={openGoogleMaps} className="map-btn">
                  <span>???</span>
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '40px 20px', borderRadius: '24px', border: '1px solid rgba(233,181,88,0.2)', marginBottom: '50px' }}>
              <span style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 'bold' }}>Your Customized Itinerary</span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--f-display)', margin: '15px 0 10px', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{route.title}</h1>
              <p style={{ color: 'var(--mute)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{route.desc} {route.timeDesc}</p>
            </div>

            <div className="rp-timeline">
              {route.pandals.map((p: any, i: number) => {
                const isLast = i === route.pandals.length - 1;
                return (
                  <div key={i} className="rp-node">
                    <div className="rp-node-dot"></div>
                    <div className="rp-pandal-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                          <span style={{ background: 'rgba(233,181,88,0.15)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1.5px', display: 'inline-block', marginBottom: '10px' }}>Step {i + 1} • {p.zone}</span>
                          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--f-display)', color: '#fff', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{p.name}</h2>
                        </div>
                        <a href={'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng} target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--shankha)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }} className="print-hide">
                          <span>??</span> View Map
                        </a>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span style={{ fontSize: '1.4rem' }}>?</span>
                          <div>
                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Theme</div>
                            <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '500' }}>{p.theme}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span style={{ fontSize: '1.4rem' }}>??</span>
                          <div>
                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Insider Tip</div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--shankha)', fontStyle: 'italic', lineHeight: 1.5 }}>{p.tip}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="print-hide" style={{ padding: '30px 0 30px 20px', color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{ color: 'var(--gold)' }}>?</span>
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500', letterSpacing: '0.5px' }}>{p.transit}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`;

const result = code.substring(0, startIdx) + newRp + '\n' + code.substring(endIdx);
fs.writeFileSync('src/pages/Pages.tsx', result, 'utf8');
console.log("Route Planner overhauled successfully!");
