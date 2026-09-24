const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /<Alpana size=\{800\} style=\{\{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0\.15, pointerEvents: 'none' \}\} spin \/>/,
  `<div style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }}><Alpana size={800} spin /></div>`
);

c = c.replace(
  /<Alpana size=\{600\} style=\{\{ position: 'absolute', left: '-10%', bottom: '-10%', opacity: 0\.1, pointerEvents: 'none' \}\} \/>/,
  `<div style={{ position: 'absolute', left: '-10%', bottom: '-10%', opacity: 0.1, pointerEvents: 'none' }}><Alpana size={600} /></div>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

