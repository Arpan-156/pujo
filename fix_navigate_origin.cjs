const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /button onClick=\{\(\) => window\.open\(`https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=\$\{n\.map\.lat\},\$\{n\.map\.lng\}`\)\}/,
  "button onClick={() => window.open(geo.lat && geo.lng ? `https://www.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${n.map.lat},${n.map.lng}` : `https://www.google.com/maps/dir/?api=1&destination=${n.map.lat},${n.map.lng}`)}"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed navigate origin');
