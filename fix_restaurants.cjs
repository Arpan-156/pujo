const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /\(\['hospital', 'toilets', 'police', 'atm', 'restaurant'\] as POIType\[\]\)/,
  "(['hospital', 'toilets', 'police', 'atm'] as POIType[])"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Removed restaurants');
