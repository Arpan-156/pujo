const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\{[\s\S]*?let distStr = '';\s*if \(geo\.lat && geo\.lng && p\.map\?\.lat && p\.map\?\.lng\) \{[\s\S]*?const d = getDistance\([\s\S]*?distStr = d < 1 \? `\$\{\(d \* 1000\)\.toFixed\(0\)[\s\S]*?return p\.map\?\.lat && p\.map\?\.lng \? \([\s\S]*?\) : null;\s*\}\)\(\)\}/;

const newJSX = `{(() => {
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
})()}`;

code = code.replace(regex, newJSX);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujasPage syntax');
