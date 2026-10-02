const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Fix encoding ? marks
code = code.replace(/\?\? \{distStr\}/g, '<Pin size={12} style={{ marginRight: "4px" }} /> {distStr}');
code = code.replace(/Get Directions \?/g, 'Get Directions');

// 2. Add getWalkTimeStr
if (!code.includes('function getWalkTimeStr')) {
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
}

// 3. Update the distance display inside PujasPage
// The block starts with `let distStr = '';` inside the `PujasPage` return block.
const pujasPageBlock = `let distStr = '';
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
                        ) : null;`;

// Let's replace precisely by matching the exact old code snippet
const oldBlockMatch = /let distStr = '';\s*if \(geo\.lat[\s\S]*?Get Directions[\s\S]*?<\/button>\s*<\/div>\s*\) : null;/;
code = code.replace(oldBlockMatch, pujasPageBlock);

// 4. Update the distStr logic in PujaDetail and replace pd-info / pd-story
const pdStart = `    const { geo } = useGeo();
    let distStr = '';
    let rawDistKm = 0;
    if (geo.lat && geo.lng && p?.map?.lat && p?.map?.lng) {
      rawDistKm = getDistance(geo.lat, geo.lng, p.map?.lat, p.map?.lng);
      distStr = rawDistKm < 1 ? \`\${(rawDistKm * 1000).toFixed(0)}m away\` : \`\${rawDistKm.toFixed(1)}km away\`;
    }`;

code = code.replace(/const \{ geo \} = useGeo\(\);\s*let distStr = '';\s*if \(geo\.lat[\s\S]*?km away`;\s*\}/, pdStart);

const newJSX = fs.readFileSync('new_pujadetail.jsx', 'utf8');
code = code.replace(/<section className="pd-info wrap">[\s\S]*?<\/section>\s*<section className="pd-story wrap">[\s\S]*?<\/section>/, newJSX);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed all safely');
