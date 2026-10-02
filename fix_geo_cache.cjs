const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(
  '{ timeout: 10000, enableHighAccuracy: true }',
  '{ timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }'
);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed GPS cache');
