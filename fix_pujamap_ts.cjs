const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /activePuja\?\.lat \? \[activePuja\.lat, activePuja\.lng\] : \(validPujas\[0\]\?\.lat \? \[validPujas\[0\]\.lat, validPujas\[0\]\.lng\] : \[23\.2324, 87\.8615\]\);/,
  'activePuja?.lat && activePuja?.lng ? [activePuja.lat, activePuja.lng] : (validPujas[0]?.lat && validPujas[0]?.lng ? [validPujas[0].lat, validPujas[0].lng] : [23.2324, 87.8615]);'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
