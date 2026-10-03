const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex1 = /const fetched = await fetchPOIs\(mapCenter\[0\], mapCenter\[1\], 5000, \[type\]\);/g;
const replace1 = `const lat = geo.lat || mapCenter[0];
        const lng = geo.lng || mapCenter[1];
        const fetched = await fetchPOIs(lat, lng, geo.lat ? 10000 : 5000, [type]);`;

const regex2 = /const fetched = await fetchPOIs\(mapCenter\[0\], mapCenter\[1\], 5000, \['hospital', 'police', 'atm', 'toilets'\]\);/g;
const replace2 = `const lat = geo.lat || mapCenter[0];
        const lng = geo.lng || mapCenter[1];
        const fetched = await fetchPOIs(lat, lng, geo.lat ? 10000 : 5000, ['hospital', 'police', 'atm', 'toilets']);`;

code = code.replace(regex1, replace1);
code = code.replace(regex2, replace2);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POIs to use GPS');
