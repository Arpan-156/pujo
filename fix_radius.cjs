const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/fetchPOIs\(mapCenter\[0\], mapCenter\[1\], 3000\)/g, "fetchPOIs(mapCenter[0], mapCenter[1], 5000)");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Increased POI radius');
