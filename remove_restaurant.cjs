const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Revert back to 4 POI types
code = code.replace(
  /setActivePoiTypes\(new Set\(\['hospital', 'toilets', 'police', 'atm', 'restaurant'\]\)\);/,
  "setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm']));"
);

code = code.replace(
  /fetchPOIs\(lat, lng, 3000, \['hospital', 'police', 'atm', 'toilets', 'restaurant'\]\);/,
  "fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets']);"
);

code = code.replace(
  /activePoiTypes\.size === 5 && showPandals/,
  "activePoiTypes.size === 4 && showPandals"
);

code = code.replace(
  /\(\['hospital', 'toilets', 'police', 'atm', 'restaurant'\] as POIType\[\]\)/,
  "(['hospital', 'toilets', 'police', 'atm'] as POIType[])"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Removed restaurant from PujaMap.tsx');
