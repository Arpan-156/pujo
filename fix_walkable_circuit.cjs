const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const distanceBannerRegex = /<button onClick=\{\(\) => \{ if\(geo\.status !== 'loading'\) requestPermission\(\); \}\} style=\{\{ background: 'transparent', border: '1px solid rgba\(255,255,255,0\.2\)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0\.9rem' \}\}>[\s\S]*?<\/button>/;

const newButtons = `<div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { const url = geo.lat && geo.lng ? \`https://www.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\` : \`https://www.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`; window.open(url, '_blank', 'noopener,noreferrer'); }} style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                <Navigation size={16} /> Get Directions
              </button>
              <button onClick={() => { if(geo.status !== 'loading') requestPermission(); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Refresh Location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.44l5.36 5.36"/></svg>
              </button>
            </div>`;

code = code.replace(distanceBannerRegex, newButtons);

const insertionPoint = '<section className="pd-more wrap">';
const walkableCircuit = `{p.map?.lat && p.map?.lng && (
          <section className="wrap" style={{ marginTop: '0', marginBottom: '40px' }}>
            <div style={{ border: '1px solid #4a1c1c', borderRadius: '12px', padding: '24px', background: 'rgba(10, 5, 5, 0.8)' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pin size={20} color="#ef4444" />
                  Nearby Pandals (Walkable Circuit)
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--gold)' }}>Within 2 km</span>
                </h3>
                <p style={{ color: 'var(--mute)', margin: '0 0 24px 0', fontSize: '0.9rem' }}>Visiting <strong>{p.name}</strong>? Hop directly to these neighboring pandals on foot without hailing a cab:</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {(() => {
                  const neighbors = pujas
                    .filter(x => x.slug !== p.slug && x.map?.lat && x.map?.lng)
                    .map(x => ({ ...x, dist: getDistance(p.map!.lat, p.map!.lng, x.map!.lat, x.map!.lng) }))
                    .filter(x => x.dist < 2)
                    .sort((a, b) => a.dist - b.dist)
                    .slice(0, 3);
                  
                  return neighbors.map((n, i) => (
                    <div key={n.slug} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content', marginBottom: '12px' }}>
                        <Footprints size={12} /> {(n.dist * 1000).toFixed(0)} m from here \u2022 {getWalkTimeStr(n.dist)}
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1.1rem' }}>{n.name}</h4>
                      <p style={{ margin: '0 0 16px 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                        <Pin size={12} style={{ flexShrink: 0, marginTop: '2px' }} /> {n.location}
                      </p>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Evening</span>
                        {n.featured ? (
                          <Link to={\`/puja/\${n.slug}\`} style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Hop to Pandal &rarr;</Link>
                        ) : null}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </section>
        )}\n\n      ` + insertionPoint;

code = code.replace(insertionPoint, walkableCircuit);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Restored and fixed Walkable Circuit');
