const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /restaurant: '#F59E0B',\s*/,
  ""
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Removed restaurant color');
