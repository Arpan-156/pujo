const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const premiumNearby = `
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ color: 'var(--gold)', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontFamily: 'var(--f-display)' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 Nearby Pandals
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {validPujas.slice(0, isHome ? 3 : 4).map(p => (
                   <div key={p.slug} style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 10px 20px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform='none'}>
                      <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 16px', background: 'rgba(233,181,88,0.1)', color: 'var(--gold)', borderBottomLeftRadius: '16px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        {p.distance !== undefined ? p.distance.toFixed(1) + ' km away' : ''}
                      </div>
                      <h4 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: '#fff', paddingRight: '60px' }}>{p.name}</h4>
                      <div style={{ color: 'var(--mute)', fontSize: '0.9rem', marginBottom: '20px' }}>
                         {p.location}
                      </div>
                      {geo.lat && geo.lng && (
                        <a 
                          href={\`https://maps.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\`}
                          target="_blank" rel="noopener noreferrer"
                          className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}
                        >
                          Get Directions
                        </a>
                      )}
                   </div>
                ))}
              </div>
            </div>
`;

// Replace the old Nearby Pandals block
code = code.replace(
  /<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(30, 20, 20, 0\.8\) 0%, rgba\(15, 10, 10, 0\.9\) 100%\)', boxShadow: 'inset 0 1px 1px rgba\(255, 255, 255, 0\.1\), 0 20px 40px rgba\(0,0,0,0\.5\)', border: '1px solid rgba\(255, 255, 255, 0\.05\)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' \}\}>\s*<h3 style=\{\{ color: 'var\(--gold\)'[\s\S]*?Nearby Pandals\s*<\/h3>[\s\S]*?<\/div>/,
  premiumNearby
);

// Conditionally render Essential Services and Helplines
code = code.replace(
  /<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(30, 20, 20, 0\.8\) 0%, rgba\(15, 10, 10, 0\.9\) 100%\)'[\s\S]*?Essential Services[\s\S]*?<\/div>\s*<\/div>/,
  "{!isHome && (<>\n$&"
);

// Close the conditional block after Emergency Helplines
code = code.replace(
  /<\/ul>\s*<\/div>/,
  "</ul>\n              </div>\n            </>)}"
);

// Fix the "m away" that was missed in POI distance (since I used a regex that might have failed if it was already changed, wait let me just explicitly fix the POI card)
code = code.replace(
  /\{\(getDistance\(geo\.lat!, geo\.lng!, poi\.lat, poi\.lon\) \* 1000\)\.toFixed\(0\) \+ 'm away'\}/g,
  "{getDistance(geo.lat!, geo.lng!, poi.lat, poi.lon).toFixed(1) + ' km away'}"
);
// Also the fallback one
code = code.replace(
  /\{geo\.lat && geo\.lng \? \(getDistance\(geo\.lat, geo\.lng, poi\.lat, poi\.lon\) \* 1000\)\.toFixed\(0\) \+ 'm away' : 'Distance unknown'\}/g,
  "{geo.lat && geo.lng ? getDistance(geo.lat!, geo.lng!, poi.lat, poi.lon).toFixed(1) + ' km away' : 'Distance unknown'}"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed Nearby Pandals design and isHome logic');
