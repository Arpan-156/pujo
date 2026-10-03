const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(/emit\(\{ \.\.\.globalGeo, status: 'error', error: 'Geolocation not supported' \}\);/, `globalGeo = { ...globalGeo, status: 'error', error: 'Geolocation not supported' };\n      emit(globalGeo);`);

code = code.replace(/emit\(\{ \.\.\.globalGeo, status: 'loading', isManual: false \}\);/, `globalGeo = { ...globalGeo, status: 'loading', isManual: false };\n      emit(globalGeo);`);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed requestPermission mutation');
