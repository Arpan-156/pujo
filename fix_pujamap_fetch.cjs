const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// In togglePoi
code = code.replace(/const fetched = await fetchPOIs\(mapCenter\[0\], mapCenter\[1\], 5000\);\s*const filtered = fetched\.filter\(p => p\.type === type\);\s*setPois\(prev => \[\.\.\.prev, \.\.\.filtered\]\);/, `const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 5000, [type]);\n          setPois(prev => [...prev, ...fetched]);`);

// In toggleAll
code = code.replace(/const fetched = await fetchPOIs\(mapCenter\[0\], mapCenter\[1\], 5000\);\s*setPois\(fetched\);/, `const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 5000, ['hospital', 'police', 'atm', 'toilets']);\n          setPois(fetched);`);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed PujaMap POI fetching');
