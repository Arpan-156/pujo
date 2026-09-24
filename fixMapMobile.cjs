const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /max-height: 350px;/,
  `max-height: 280px; overflow-y: auto;`
);

c = c.replace(
  /\.pmap-new-iframe \{ height: 400px; \}/,
  `.pmap-new-iframe { height: 350px; margin-top: 10px; }`
);

// also I need to make sure the input doesn't stretch things
c = c.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '100%' \}\}>/,
  `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }} className="pmap-mobile-wrapper">`
);

c = c.replace(
  /\.pmap-new-grid \{ display: grid; grid-template-columns: 350px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; \}/,
  `.pmap-new-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

