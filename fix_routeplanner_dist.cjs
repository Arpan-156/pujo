const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/dist: getDistance\(lat!, lng!, p\.map!\.lat!, p\.map!\.lng!\)/g, `dist: geo.distances?.[p.slug] ?? getDistance(lat!, lng!, p.map!.lat!, p.map!.lng!)`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed RoutePlannerPage OSRM distances');
