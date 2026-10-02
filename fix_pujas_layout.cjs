const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<div style=\{\{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' \}\}>[\s\S]*?<\/button>\s*<\/div>/;

const replacement = `<div style={{ marginTop: '12px', display: 'flex', alignItems: 'stretch', gap: '8px', width: '100%' }}>
                          {distStr && (
                            <div style={{ background: '#2C1B14', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '70px' }}>
                              <Pin size={14} color="var(--gold)" style={{ marginBottom: '2px' }} />
                              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{distStr}</span>
                            </div>
                          )}
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); const url = geo.lat && geo.lng ? \`https://www.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map.lat},\${p.map.lng}\` : \`https://www.google.com/maps/dir/?api=1&destination=\${p.map.lat},\${p.map.lng}\`; window.open(url, '_blank', 'noopener,noreferrer'); }} style={{ flex: 1, background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                            Get Directions
                          </button>
                        </div>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujasPage layout and directions');
