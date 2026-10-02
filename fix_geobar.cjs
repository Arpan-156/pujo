const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

const regex = /<div style=\{\{ display: 'flex', alignItems: 'center', gap: '10px' \}\}>[\s\S]*?<p>From <\/p>[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?\{geo\.isManual && \([\s\S]*?<\/button>[\s\S]*?\)\]\}[\s\S]*?<\/div>/;

const newJSX = `<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <p>From <strong style={{ color: '#10b981' }}>{geo.area}</strong></p>
                  {geo.isManual && (
                    <button onClick={requestPermission} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>
                      (Use Live GPS)
                    </button>
                  )}
                </div>`;

code = code.replace(
  /<div style=\{\{ display: 'flex', alignItems: 'center', gap: '10px' \}\}>\s*<p>From <\/p>[\s\S]*?<\/select>[\s\S]*?\{geo\.isManual && \([\s\S]*?<\/button>\s*\)\}s*<\/div>/,
  newJSX
);
// Above regex is a bit complex, let's do a simpler replace by reading the string.
// Actually, it's safer to just replace the select tag.

code = code.replace(
  /<select[\s\S]*?<\/select>/,
  `<strong style={{ color: '#10b981' }}>{geo.area}</strong>`
);
fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed GeoBar dropdown');
