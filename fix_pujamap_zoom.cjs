const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /const \[sel, setSel\] = useState<string \| null>\(pujas\[0\]\?\.slug \?\? null\);/,
  'const [sel, setSel] = useState<string | null>(null);'
);

code = code.replace(
  /const activePuja = sortedPujas\.find\(p => p\.slug === sel\) \|\| sortedPujas\[0\];/,
  'const activePuja = sortedPujas.find(p => p.slug === sel);'
);

code = code.replace(
  /const mapCenter: \[number, number\] \| null = activePuja\?\.map\?\.lat && activePuja\?\.map\?\.lng \? \[activePuja\.map\.lat, activePuja\.map\.lng\] : \(validPujas\[0\]\?\.map\?\.lat && validPujas\[0\]\?\.map\?\.lng \? \[validPujas\[0\]\.map\.lat, validPujas\[0\]\.map\.lng\] : \[23\.2324, 87\.8615\]\);/,
  'const mapCenter: [number, number] = activePuja?.map?.lat && activePuja?.map?.lng ? [activePuja.map.lat, activePuja.map.lng] : [23.2324, 87.8615];'
);

code = code.replace(
  /<MapController center=\{sel && activePuja\?\.map\?\.lat \? mapCenter : null\} zoom=\{16\}/,
  '<MapController center={mapCenter} zoom={sel ? 16 : 14}'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed zoom behavior');
