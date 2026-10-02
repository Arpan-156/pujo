const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// First, make sure Footprints is imported in Pages.tsx
if (!code.includes('Footprints')) {
  code = code.replace(/import \{ Pin, /, 'import { Pin, Footprints, ');
}

// Replace the distStr logic in PujasPage
const regex = /let distStr = '';\s*if \(geo\.lat && geo\.lng && p\.map\?\.lat && p\.map\?\.lng\) \{[\s\S]*?distStr = [\s\S]*?\}\s*return p\.map\?\.lat && p\.map\?\.lng \? \([\s\S]*?<div style=\{\{ marginTop: '12px', display: 'flex', alignItems: 'stretch', gap: '8px', width: '100%' \}\}>[\s\S]*?\{distStr && \([\s\S]*?<\/div>[\s\S]*?\)\}/;

const newBlock = `let distVal = 0;
                        if (geo.lat && geo.lng && p.map?.lat && p.map?.lng) {
                          distVal = getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
                        }
                        return p.map?.lat && p.map?.lng ? (
                          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
                            {distVal > 0 && (
                              <div style={{ background: '#0a0505', border: '1px solid rgba(225,29,72,0.3)', borderRadius: '99px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                <Pin size={14} color="#e11d48" />
                                <span style={{ color: '#e0f2fe', fontWeight: 600, fontSize: '0.85rem' }}>
                                  {distVal < 1 ? \`\${(distVal * 1000).toFixed(0)}m\` : \`\${distVal.toFixed(1)}km\`}
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>•</span>
                                <Footprints size={14} color="#d97757" />
                                <span style={{ color: '#e0f2fe', fontWeight: 600, fontSize: '0.85rem' }}>
                                  {getWalkTimeStr(distVal)}
                                </span>
                              </div>
                            )}`;

code = code.replace(regex, newBlock);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujasPage pill');
