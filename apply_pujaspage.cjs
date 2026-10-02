const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Add getWalkTimeStr before PujasPage
code = code.replace(
  /export function PujasPage\(\) \{/,
  `export function getWalkTimeStr(distKm: number) {
  const timeInHours = distKm / 5;
  const hours = Math.floor(timeInHours);
  const mins = Math.round((timeInHours - hours) * 60);
  if (hours > 0) return \`\${hours}h \${mins}m walk\`;
  return \`\${mins} min walk\`;
}

export function PujasPage() {`
);

// 2. Add useGeo to PujasPage
code = code.replace(
  /export function PujasPage\(\) \{\s*const \{ pujas, themes \} = useData\(\);/,
  `export function PujasPage() {
  const { pujas, themes } = useData();
  const { geo } = useGeo();`
);

// 3. Inject the vertical block inside plist-col for Address in PujasPage
// Pristine code has: <p className="plist-loc">{p.location}</p>
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
                        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          {distStr && (
                            <div style={{ background: '#2C1B14', borderRadius: '8px', padding: '6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <Pin size={16} color="var(--gold)" style={{ marginBottom: '2px' }} />
                              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }}>{distStr}</span>
                            </div>
                          )}
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${p.map.lat},\${p.map.lng}\`, '_blank', 'noopener,noreferrer'); }} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', height: '100%' }}>
                            Get Directions
                          </button>
                        </div>
                      ) : null;
                    })()}`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujasPage');
