const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /const getQuery = \(p: any\) => p\.map\?\.lat && p\.map\?\.lng \? `\$\{p\.map\.lat\},\$\{p\.map\.lng\}` : encodeURIComponent\(`\$\{p\.name\}, Burdwan`\);/,
  "const getQuery = (p: any) => p.lat && p.lng ? `${p.lat},${p.lng}` : encodeURIComponent(`${p.name}, Burdwan`);"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed openGoogleMaps');
