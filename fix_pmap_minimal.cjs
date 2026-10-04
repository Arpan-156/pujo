const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const minimalNearby = `
              <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.4) 0%, rgba(15, 10, 10, 0.6) 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                {validPujas.slice(0, isHome ? 4 : 6).map((p, i) => (
                   <div key={p.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      <div style={{ flex: 1, paddingRight: '16px' }}>
                         <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>{p.name}</h4>
                         <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>{p.location}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                         {p.distance !== undefined && <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.distance.toFixed(1)} km</div>}
                         {geo.lat && geo.lng && (
                           <a 
                             href={\`https://maps.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\`}
                             target="_blank" rel="noopener noreferrer"
                             style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(233,181,88,0.15)', color: 'var(--gold)', display: 'grid', placeContent: 'center', flexShrink: 0, textDecoration: 'none' }}
                           >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                           </a>
                         )}
                      </div>
                   </div>
                ))}
              </div>
`;

// Replace the bulky grid
code = code.replace(
  /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(280px, 1fr\)\)', gap: '20px' \}\}>[\s\S]*?<\/div>\s*<\/div>/,
  minimalNearby + "\n            </div>"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed Nearby Pandals minimalistic design');
