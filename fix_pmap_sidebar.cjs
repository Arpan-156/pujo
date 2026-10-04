const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const minimalSidebarCard = `
                <div className="pmap-card-mob" key={p.slug} onClick={() => setSel(sel === p.slug ? null : p.slug)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isActive ? 'rgba(233,181,88,0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '16px' }}>
                     <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: isActive ? 'var(--gold)' : '#fff', fontWeight: 600 }}>
                       {p.name} {hasCoords ? '' : <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>(No map pin)</span>}
                     </h4>
                     <div style={{ fontSize: '0.85rem', color: 'var(--mute)' }}>
                       {p.location}
                     </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {p.distance !== undefined && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {p.distance.toFixed(1)} km
                      </div>
                    )}
                    
                    {hasCoords && (
                      <a 
                        href={(geo.lat && geo.lng) ? \`https://maps.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\` : \`https://maps.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(233,181,88,0.15)', color: 'var(--gold)', display: 'grid', placeContent: 'center', flexShrink: 0, textDecoration: 'none' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    )}
                  </div>
                </div>
`;

code = code.replace(
  /<div className="pmap-card-mob" key=\{p\.slug\}[\s\S]*?<\/div>\s*<\/div>\s*\);\s*\}\)\}/,
  minimalSidebarCard + "\n              );\n            })}"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed Sidebar card to minimalist');
