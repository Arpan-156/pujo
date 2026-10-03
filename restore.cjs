const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /<a\s*href=\{\(geo\.lat[\s\S]*?<\/div>\s*\);\s*\}\)\}/;

const fix = `<button onClick={requestPermission} style={{ background: "#e11d48", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "999px", cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "1.05rem", fontFamily: "inherit" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {geo.status === 'loading' ? 'Locating...' : 'Use My Location'}
                  </button>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder="Search Pandals..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              />
            </div>

            {filteredPujas.map((p) => {
              const isActive = sel === p.slug;
              const hasCoords = p.map?.lat != null;
              
              return (
                <div
                  key={p.slug}
                  onClick={() => setSel(p.slug)}
                  style={{
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
                        {(p.distance * 1000).toFixed(0)}m away
                      </div>
                    )}
                    
                    {hasCoords && (
                      <a 
                        href={(geo.lat && geo.lng) ? \`https://www.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\` : \`https://www.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`}
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
              );
            })}`;

code = code.replace(regex, fix);
fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Restored map list and get directions link');
