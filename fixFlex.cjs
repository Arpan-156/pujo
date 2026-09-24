const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /<aside className="pmap-new-list" style=\{\{ overflowY: 'auto'/,
  `<aside className="pmap-new-list" style={{ flex: 1, minHeight: 0, overflowY: 'auto'`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

