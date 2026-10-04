const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /<span style=\{\{ textTransform: 'capitalize' \}\}>\{type\}<\/span>/g,
  `<span style={{ textTransform: 'capitalize' }}>{type === 'attractions' ? 'Visiting Spots' : type}</span>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Renamed attractions to Visiting Spots in UI');
