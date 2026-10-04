const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace `poi.dist * 1000` with actual distance calculation
code = code.replace(
  /\{\(poi\.dist \* 1000\)\.toFixed\(0\)\}m away/,
  `{geo.lat && geo.lng ? (getDistance(geo.lat, geo.lng, poi.lat, poi.lon) * 1000).toFixed(0) + 'm away' : 'Distance unknown'}`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI distance calculation');
