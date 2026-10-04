const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
homeCode = homeCode.replace(/getDistance\(geo\.lat, geo\.lng, p\.map\.lat, p\.map\.lng\)/g, "getDistance(geo.lat!, geo.lng!, p.map.lat!, p.map.lng!)");
fs.writeFileSync('src/pages/Home.tsx', homeCode, 'utf8');

let pmapCode = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');
pmapCode = pmapCode.replace(/await fetchPOIs\(geo\.lat, geo\.lng, 3000, types\)/g, "await fetchPOIs(geo.lat!, geo.lng!, 3000, types)");
fs.writeFileSync('src/sections/PujaMap.tsx', pmapCode, 'utf8');

console.log('Fixed TS errors');
