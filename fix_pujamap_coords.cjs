const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/p\.lat/g, 'p.map.lat');
code = code.replace(/p\.lng/g, 'p.map.lng');
code = code.replace(/activePuja\?\.map\.lat/g, 'activePuja?.map?.lat');
code = code.replace(/activePuja\?\.map\.lng/g, 'activePuja?.map?.lng');
code = code.replace(/validPujas\[0\]\?\.map\.lat/g, 'validPujas[0]?.map?.lat');
code = code.replace(/validPujas\[0\]\?\.map\.lng/g, 'validPujas[0]?.map?.lng');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
