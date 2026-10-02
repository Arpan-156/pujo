const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Ensure useGeo is imported
if (!code.includes('useGeo')) {
  code = code.replace(
    "import { useData } from '../data/store';",
    "import { useData } from '../data/store';\nimport { useGeo, getDistance } from '../lib/geo';"
  );
}

// Add logic to PujaDetail
code = code.replace(
  'const p = bySlug(slug);',
  `const p = bySlug(slug);\n    const { geo } = useGeo();\n    let distStr = '';\n    if (geo.lat && geo.lng && p?.map?.lat && p?.map?.lng) {\n      const d = getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);\n      distStr = d < 1 ? \`\${(d * 1000).toFixed(0)}m away\` : \`\${d.toFixed(1)}km away\`;\n    }`
);

// Add the button
code = code.replace(
  /<div style=\{\{ marginTop: '24px' \}\}>\s*<PassportButton slug=\{p.slug\} \/>\s*<\/div>/,
  `<div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <PassportButton slug={p.slug} />
                {distStr && <span style={{ background: 'rgba(233,181,88,0.2)', color: 'var(--gold)', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Pin size={16} /> {distStr}</span>}
                {p.map?.lat && p.map?.lng && (
                  <button onClick={() => window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`, '_blank', 'noopener,noreferrer')} style={{ background: 'var(--gold)', color: '#111', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'inherit' }}>
                    Get Directions ?
                  </button>
                )}
              </div>`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Pages directions added');
