const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/nextP\.lat/g, 'nextP.map?.lat');
code = code.replace(/nextP\.lng/g, 'nextP.map?.lng');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed nextP logic');
