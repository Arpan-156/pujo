const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Sidebar list
code = code.replace(/\{\(p\.distance \* 1000\)\.toFixed\(0\)\}m away/g, "{p.distance.toFixed(1)} km away");

// POI card list
code = code.replace(/\(getDistance\(geo\.lat!, geo\.lng!, poi\.lat, poi\.lon\) \* 1000\)\.toFixed\(0\) \+ 'm away'/g, "getDistance(geo.lat!, geo.lng!, poi.lat, poi.lon).toFixed(1) + ' km away'");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed km conversion');
