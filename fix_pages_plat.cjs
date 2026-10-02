const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/p\.lat/g, 'p.map?.lat');
code = code.replace(/p\.lng/g, 'p.map?.lng');
code = code.replace(/p => p\.map\?\.lat && p\.map\?\.lng/g, 'p => p.map?.lat != null && p.map?.lng != null');
code = code.replace(/p\.map\?\.lat!/g, 'p.map!.lat!');
code = code.replace(/p\.map\?\.lng!/g, 'p.map!.lng!');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed p.lat in Pages.tsx');
