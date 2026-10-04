const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace 'restaurant' with 'attractions' in activePoiTypes initialization and fetchPOIs
code = code.replace(
  /setActivePoiTypes\(new Set\(\['hospital', 'toilets', 'police', 'atm', 'restaurant'\]\)\);/,
  "setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm', 'attractions']));"
);

code = code.replace(
  /fetchPOIs\(lat, lng, 3000, \['hospital', 'police', 'atm', 'toilets', 'restaurant'\]\);/,
  "fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets', 'attractions']);"
);

code = code.replace(
  /\(\['hospital', 'toilets', 'police', 'atm', 'restaurant'\] as POIType\[\]\)/,
  "(['hospital', 'toilets', 'police', 'atm', 'attractions'] as POIType[])"
);

// POI_COLORS update
code = code.replace(
  /restaurant: '#EA580C',/,
  "attractions: '#F59E0B'," // Amber color for tourist spots
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Replaced restaurant with attractions');
