const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/setPois\(pois\.filter\(p => p\.type !== type\)\);/g, "setPois(prev => prev.filter(p => p.type !== type));");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI stale state closure');
