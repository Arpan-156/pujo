const fs = require('fs');
let code = fs.readFileSync('src/lib/overpass.ts', 'utf8');

const regexNodes = /const nodes = types\.map\(t => \`node\["amenity"="\\$\{t\}"\]\(around:\\$\{radiusMeters\},\\$\{lat\},\\$\{lng\}\);\`\)\.join\('\\n      '\);/;
code = code.replace(regexNodes, `// Use nwr (node, way, relation) to catch polygon hospitals/clinics!
  const nodes = types.map(t => {
    // Also include 'clinic' if hospital is requested
    if (t === 'hospital') {
      return \`nwr["amenity"="hospital"](around:\${radiusMeters},\${lat},\${lng});\\n      nwr["amenity"="clinic"](around:\${radiusMeters},\${lat},\${lng});\`;
    }
    return \`nwr["amenity"="\${t}"](around:\${radiusMeters},\${lat},\${lng});\`;
  }).join('\\n      ');`);

const regexOut = /out body;/;
code = code.replace(regexOut, `out center; // out center calculates the center of ways/relations instantly`);

// Modify mapping to handle center coords from ways/relations
const regexMap = /lat: el\.lat,\n\s*lon: el\.lon,/m;
code = code.replace(regexMap, `lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,`);

fs.writeFileSync('src/lib/overpass.ts', code, 'utf8');
console.log('Fixed overpass logic for clinics and speed');
