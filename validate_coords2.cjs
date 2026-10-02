const fs = require('fs');
const code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const rowsMatch = code.match(/const ROWS: Row\[\] = \[([\s\S]*?)\];\s*export const PUJAS:/);
if (!rowsMatch) {
  console.log("Could not find ROWS array");
  process.exit();
}

const rowsStr = rowsMatch[1];
const rowRegex = /\{([^}]+)\}/g;
let rMatch;
const allPujas = [];
while ((rMatch = rowRegex.exec(rowsStr)) !== null) {
  const row = rMatch[1];
  const slugMatch = row.match(/slug:\s*'([^']+)'/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  const latMatch = row.match(/lat:\s*([\d\.]+)/);
  const lngMatch = row.match(/lng:\s*([\d\.]+)/);
  
  allPujas.push({
    slug,
    lat: latMatch ? parseFloat(latMatch[1]) : null,
    lng: lngMatch ? parseFloat(lngMatch[1]) : null
  });
}

console.log(`Total pujas: ${allPujas.length}`);
const missing = allPujas.filter(p => p.lat === null || p.lng === null);
console.log(`Missing coordinates: ${missing.length}`);
missing.forEach(p => console.log(`  - ${p.slug}`));
