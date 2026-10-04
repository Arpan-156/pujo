const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /\(\['hospital', 'toilets', 'police', 'atm'\] as POIType\[\]\)/,
  "(['hospital', 'toilets', 'police', 'atm', 'restaurant'] as POIType[])"
);

// We need to make sure the auto-fetch only fetches the vital ones to save bandwidth, but 'restaurant' can be clicked.
// Also update the 'All' toggle to include restaurant.
code = code.replace(
  /activePoiTypes\.size === 4 && showPandals/,
  "activePoiTypes.size === 5 && showPandals"
);

code = code.replace(
  /setActivePoiTypes\(new Set\(\['hospital', 'toilets', 'police', 'atm'\]\)\);/,
  "setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm', 'restaurant']));"
);

code = code.replace(
  /fetchPOIs\(lat, lng, 3000, \['hospital', 'police', 'atm', 'toilets'\]\);/,
  "fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets', 'restaurant']);"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added restaurants to map POIs');
