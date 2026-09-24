const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /<section className=\{`pmap \$\{className\}`\} style=\{\{ position: 'relative', overflow: 'visible' \}\}>/,
  `<section className={\`pmap \${className}\`} style={{ position: 'relative', overflow: 'hidden' }}>`
);

c = c.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '20px' \}\}>/,
  `<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', minHeight: 0 }}>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

