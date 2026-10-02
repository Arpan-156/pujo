const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/customPool\.find\(p=>p\.map\?\.lat\)\?\.lat/g, 'customPool.find(p=>p.map?.lat)?.map?.lat');
code = code.replace(/customPool\.find\(p=>p\.map\?\.lng\)\?\.lng/g, 'customPool.find(p=>p.map?.lng)?.map?.lng');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed find logic in Pages');
