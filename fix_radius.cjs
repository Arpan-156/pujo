const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/geo\.lat \? 10000 : 5000/g, '3000');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed radius');
