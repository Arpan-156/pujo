const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!code.includes("import { useGeo, getDistance }")) {
  code = code.replace(/import \{ useData \} from '\.\.\/data\/store';/, "import { useData } from '../data/store';\nimport { useGeo, getDistance } from '../lib/geo';");
}

const replacement = `
      {/* Sleek Nearby Pandals Widget for Home Page */}
      <section className="wrap" style={{ padding: '60px 0' }}>
        <RevealText lines={['NEARBY PANDALS']} className="display" />
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '32px' }}>
            <p className="lead" style={{ margin: 0, maxWidth: '40ch' }}>
              We're tracking your location to bring you the closest celebrations.
            </p>
            <Btn to="/map" cursor="Open">Open the full map</Btn>
          </div>
        </Reveal>
        
        {(() => {
          const { geo, requestPermission } = useGeo();
          if (geo.status !== 'success' || !geo.lat || !geo.lng) {
            return (
              <Reveal delay={250}>
                <div style={{ background: 'rgba(20,8,9,0.5)', border: '1px solid var(--gold)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--mute)', fontSize: '1.1rem', marginBottom: '20px' }}>Enable Location Services to see pandals near you.</p>
                  <button onClick={requestPermission} className="btn solid" style={{ margin: '0 auto' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Locate Me
                  </button>
                </div>
              </Reveal>
            );
          }
          
          const nearby = [...pujas]
            .filter(p => p.map?.lat != null)
            .map(p => ({ ...p, distance: getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng) }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
            
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {nearby.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 16px', background: 'rgba(233,181,88,0.1)', color: 'var(--gold)', borderBottomLeftRadius: '16px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      {(p.distance * 1000).toFixed(0)}m away
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 8px 0', paddingRight: '70px' }}>{p.name}</h3>
                    <p style={{ color: 'var(--mute)', margin: '0 0 20px 0', fontSize: '0.9rem' }}>{p.location}</p>
                    <a 
                      href={\`https://maps.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map.lat},\${p.map.lng}\`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Get Directions
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          );
        })()}
      </section>
`;

// Replace the map section
code = code.replace(
  /<div className="wrap map-head">[\s\S]*?<PujaMap \/>/,
  replacement
);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Replaced Map with sleek nearby pandals widget on Home');
