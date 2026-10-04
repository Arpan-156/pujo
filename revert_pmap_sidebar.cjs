const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const originalSidebarCard = `
                <div className="pmap-card-mob" key={p.slug} onClick={() => setSel(sel === p.slug ? null : p.slug)} style={{
                    background: isActive ? 'rgba(233,181,88,0.1)' : 'transparent',
                    border: isActive ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: isActive ? 'var(--gold)' : '#fff' }}>
                    {p.name} {hasCoords ? '' : <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>(No map pin)</span>}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--mute)', marginBottom: '12px' }}>
                    {p.location}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {p.distance !== undefined && (
                      <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                        {p.distance.toFixed(1)} km away
                      </div>
                    )}
                    
                    {hasCoords && (
                      <a 
                        href={(geo.lat && geo.lng) ? \`https://maps.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\` : \`https://maps.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: 'var(--gold)', color: '#1a0b0c', padding: '8px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)' }}
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
`;

code = code.replace(
  /<div className="pmap-card-mob" key=\{p\.slug\}[\s\S]*?<\/div>\s*<\/div>\s*\);\s*\}\)\}/,
  originalSidebarCard + "\n              );\n            })}"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Reverted Sidebar card to bulky card');
