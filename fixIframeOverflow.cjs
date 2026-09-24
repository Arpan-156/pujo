const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /className="pmap-new-iframe" style=\{\{ flex: 1, borderRadius: '16px', overflow: 'visible'/,
  `className="pmap-new-iframe" style={{ flex: 1, borderRadius: '16px', overflow: 'hidden'`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

