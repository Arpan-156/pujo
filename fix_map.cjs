const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/p\.map\.lat/g, 'p.lat');
code = code.replace(/p\.map\.lng/g, 'p.lng');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log("Fixed map properties");
