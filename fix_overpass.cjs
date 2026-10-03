const fs = require('fs');
let code = fs.readFileSync('src/lib/overpass.ts', 'utf8');

const regex = /export async function fetchPOIs\(lat: number, lng: number, radiusMeters: number\): Promise<POI\[\]> \{[\s\S]*?out body;\s*`;/m;

const newFetch = `export async function fetchPOIs(lat: number, lng: number, radiusMeters: number, types: POIType[] = ['hospital', 'police', 'atm', 'toilets']): Promise<POI[]> {
  const nodes = types.map(t => \`node["amenity"="\${t}"](around:\${radiusMeters},\${lat},\${lng});\`).join('\\n      ');
  const query = \`
    [out:json][timeout:10];
    (
      \${nodes}
    );
    out body;
  \`;`;

code = code.replace(regex, newFetch);
fs.writeFileSync('src/lib/overpass.ts', code, 'utf8');
console.log('Fixed overpass query builder');
