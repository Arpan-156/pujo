const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Add useGeo to PujasPage
code = code.replace(
  'const { pujas, themes } = useData();',
  'const { pujas, themes } = useData();\n    const { geo } = useGeo();'
);

// Add the distStr and Directions button inside the plist-col for Address
code = code.replace(
  /<p className="plist-loc">\{p\.location\}<\/p>/,
  `<p className="plist-loc">{p.location}</p>
                      {(() => {
                        let distStr = '';
                        if (geo.lat && geo.lng && p.map?.lat && p.map?.lng) {
                          const d = getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
                          distStr = d < 1 ? \`\${(d * 1000).toFixed(0)}m away\` : \`\${d.toFixed(1)}km away\`;
                        }
                        return p.map?.lat && p.map?.lng ? (
                          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {distStr && <span style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(233,181,88,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>?? {distStr}</span>}
                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${p.map.lat},\${p.map.lng}\`, '_blank', 'noopener,noreferrer'); }} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                              Get Directions ?
                            </button>
                          </div>
                        ) : null;
                      })()}
  `
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujasPage list');
