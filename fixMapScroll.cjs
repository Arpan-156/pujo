const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /<aside className="pmap-new-list">/,
  `<aside className="pmap-new-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, paddingRight: '8px' }}>`
);

c = c.replace(
  /const mapQuery = cur \? encodeURIComponent\(cur\.name \+ ' ' \+ cur\.location \+ ' Bardhaman'\) : 'Bardhaman';/,
  `const mapQuery = cur && cur.lat && cur.lng ? \`\${cur.lat},\${cur.lng}\` : (cur ? encodeURIComponent(cur.name + ' ' + cur.location + ' Bardhaman') : 'Bardhaman');`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

