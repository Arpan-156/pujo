const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' \}\} className="pmap-mobile-wrapper">/,
  `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0 }} className="pmap-mobile-wrapper">`
);

// also fix the broken newline in css
c = c.replace(
  /\\.pmap-mobile-wrapper \{ height: auto !important; \}\\n          \\.pmap-new-bot \{ flex-direction: column; text-align: center; gap: 16px; \}/,
  `.pmap-mobile-wrapper { height: auto !important; } .pmap-new-bot { flex-direction: column; text-align: center; gap: 16px; }`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

