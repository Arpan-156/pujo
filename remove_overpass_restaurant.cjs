const fs = require('fs');
let code = fs.readFileSync('src/lib/overpass.ts', 'utf8');

code = code.replace(
  /export type POIType = 'police' \| 'hospital' \| 'pharmacy' \| 'restaurant' \| 'cafe' \| 'toilets' \| 'atm';/,
  "export type POIType = 'police' | 'hospital' | 'pharmacy' | 'cafe' | 'toilets' | 'atm';"
);

code = code.replace(
  /restaurant: '"amenity"="restaurant"',\s*/,
  ""
);

fs.writeFileSync('src/lib/overpass.ts', code, 'utf8');
console.log('Removed restaurant from overpass.ts');
