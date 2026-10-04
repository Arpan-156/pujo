const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Revert 'attractions' back to 'restaurant'
code = code.replace(
  /setActivePoiTypes\(new Set\(\['hospital', 'toilets', 'police', 'atm', 'attractions'\]\)\);/,
  "setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm', 'restaurant']));"
);

code = code.replace(
  /fetchPOIs\(lat, lng, 3000, \['hospital', 'police', 'atm', 'toilets', 'attractions'\]\);/,
  "fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets', 'restaurant']);"
);

code = code.replace(
  /\(\['hospital', 'toilets', 'police', 'atm', 'attractions'\] as POIType\[\]\)/,
  "(['hospital', 'toilets', 'police', 'atm', 'restaurant'] as POIType[])"
);

code = code.replace(
  /attractions: '#F59E0B',/,
  "restaurant: '#F59E0B',"
);

code = code.replace(
  /<span style=\{\{ textTransform: 'capitalize' \}\}>\{type === 'attractions' \? 'Visiting Spots' : type\}<\/span>/g,
  `<span style={{ textTransform: 'capitalize' }}>{type}</span>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Reverted POI filter back to restaurant');
