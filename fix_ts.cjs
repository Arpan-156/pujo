const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/dist: getDistance\(p\.map!\.lat, p\.map!\.lng, x\.map!\.lat, x\.map!\.lng\)/g, "dist: getDistance(p.map!.lat!, p.map!.lng!, x.map!.lat!, x.map!.lng!)");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed TS error');
