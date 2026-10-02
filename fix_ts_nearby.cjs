const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  'const withDist = pujas.filter(p => p.lat && p.lng).map(p => ({\n      ...p,\n      dist: getDistance(geo.lat, geo.lng, p.lat, p.lng)\n    }));',
  'const lat = geo.lat; const lng = geo.lng;\n    const withDist = pujas.filter(p => p.lat && p.lng).map(p => ({\n      ...p,\n      dist: getDistance(lat!, lng!, p.lat!, p.lng!)\n    }));'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed TS for nearby');
