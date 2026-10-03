const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// For PujasPage:
// replace distVal = getDistance(...) with:
// distVal = geo.distances?.[p.slug] ?? getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
code = code.replace(/distVal = getDistance\(geo\.lat, geo\.lng, p\.map\.lat, p\.map\.lng\);/g, `distVal = geo.distances?.[p.slug] ?? getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);`);

// For PujaDetail:
// replace rawDistKm = getDistance(...) with:
// rawDistKm = geo.distances?.[p.slug] ?? getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
code = code.replace(/rawDistKm = getDistance\(geo\.lat, geo\.lng, p\.map\.lat, p\.map\.lng\);/g, `rawDistKm = geo.distances?.[p.slug] ?? getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);`);

// One specific issue: in PujasPage, we have `p.slug` accessible? Yes, the map loop is `list.map(p => ...)`

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed UI to use OSRM distances');
