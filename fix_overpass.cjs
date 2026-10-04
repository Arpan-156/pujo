const fs = require('fs');
let code = fs.readFileSync('src/lib/overpass.ts', 'utf8');

code = code.replace(
  /export type POIType = 'police' \| 'hospital' \| 'pharmacy' \| 'attractions' \| 'cafe' \| 'toilets' \| 'atm';/,
  "export type POIType = 'police' | 'hospital' | 'pharmacy' | 'restaurant' | 'cafe' | 'toilets' | 'atm';"
);

code = code.replace(
  /attractions: '"tourism"="attraction"',/,
  "restaurant: '\"amenity\"=\"restaurant\"',"
);

code = code.replace(
  /else if \(el\.tags\.tourism === 'attraction'\) resolvedType = 'attractions';/,
  ""
);

fs.writeFileSync('src/lib/overpass.ts', code, 'utf8');
console.log('Reverted overpass types');
