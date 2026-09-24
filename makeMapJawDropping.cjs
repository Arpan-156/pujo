const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

if (!c.includes('import { Particles, Alpana }')) {
  c = c.replace(
    "import { Photo } from '../components/Art';",
    "import { Photo } from '../components/Art';\nimport { Particles, Alpana } from '../components/fx';"
  );
}

c = c.replace(
  /<section className=\{`pmap \$\{className\}`\}>/,
  `<section className={\`pmap \${className}\`} style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles kind="embers" count={45} />
        <Alpana size={800} style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }} spin />
        <Alpana size={600} style={{ position: 'absolute', left: '-10%', bottom: '-10%', opacity: 0.1, pointerEvents: 'none' }} />`
);

// Add glassmorphism to map box
c = c.replace(
  /className="pmap-new-iframe" style=\{\{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var\(--line-2\)' \}\}/,
  `className="pmap-new-iframe" style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', zIndex: 2 }}`
);

// Add glassmorphism to bottom panel
c = c.replace(
  /className="pmap-new-bot" style=\{\{ padding: '24px', background: 'rgba\(255,255,255,0\.02\)', border: '1px solid var\(--line\)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' \}\}/,
  `className="pmap-new-bot" style={{ padding: '24px', background: 'rgba(20, 8, 9, 0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(233, 181, 88, 0.2)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

