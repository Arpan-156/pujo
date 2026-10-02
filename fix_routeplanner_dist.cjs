const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// I will just replace .lat with .map?.lat in the specific sorting and calculation loops.
// This is inside `const handleGenerate = (e: FormEvent) => {`

code = code.replace(
  /const dA = \(a\.lat && a\.lng\) \? getDistance\(geo\.lat!, geo\.lng!, a\.lat, a\.lng\) : 999;/g,
  "const dA = (a.map?.lat && a.map?.lng) ? getDistance(geo.lat!, geo.lng!, a.map.lat, a.map.lng) : 999;"
);

code = code.replace(
  /const dB = \(b\.lat && b\.lng\) \? getDistance\(geo\.lat!, geo\.lng!, b\.lat, b\.lng\) : 999;/g,
  "const dB = (b.map?.lat && b.map?.lng) ? getDistance(geo.lat!, geo.lng!, b.map.lat, b.map.lng) : 999;"
);

code = code.replace(
  /if \(p\.map\?\.lat && p\.map\?\.lng && nextP\.lat && nextP\.lng\) \{/g,
  "if (p.map?.lat && p.map?.lng && nextP.map?.lat && nextP.map?.lng) {"
);

code = code.replace(
  /const dist = getDistance\(p\.map!\.lat, p\.lng, nextP\.lat, nextP\.lng\);/g,
  "const dist = getDistance(p.map!.lat, p.map!.lng, nextP.map!.lat, nextP.map!.lng);"
);

code = code.replace(
  /lng: p\.lng,/g,
  "lng: p.map?.lng,"
);

code = code.replace(
  /if \(!p\.lat \|\| !p\.map!\.lng\)/g,
  "if (!p.map?.lat || !p.map?.lng)"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed handleGenerate');
