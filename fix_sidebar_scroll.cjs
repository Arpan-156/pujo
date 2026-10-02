const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /flex: 1, minHeight: 0, display: 'flex'/,
  "flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', WebkitOverflowScrolling: 'touch'"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed sidebar scroll');
