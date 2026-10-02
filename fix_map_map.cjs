const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/p\.map\.map!\.lat/g, "p.map.lat");
code = code.replace(/p\.map\.map!\.lng/g, "p.map.lng");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed map.map error');
