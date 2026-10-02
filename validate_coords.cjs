const fs = require('fs');

// We need to parse src/data/pujas.ts
// But since it's TS, maybe we can just run it using ts-node or dynamically import if it's compiled, 
// or just read it via regex.
// Let's use regex to extract lat and lng.
const code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /slug:\s*'([^']+)'[\s\S]*?lat:\s*([\d\.]+),\s*lng:\s*([\d\.]+)/g;
let match;
const pujas = [];
while ((match = regex.exec(code)) !== null) {
  pujas.push({ slug: match[1], lat: parseFloat(match[2]), lng: parseFloat(match[3]) });
}

// Wait, the regex might not catch those without lat/lng.
// Let's match all rows in PUJAS array.
const rowsMatch = code.match(/const PUJAS: Row\[\] = \[([\s\S]*?)\];/);
if (!rowsMatch) {
  console.log("Could not find PUJAS array");
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

const invalid = allPujas.filter(p => p.lat !== null && (p.lat < -90 || p.lat > 90 || p.lng < -180 || p.lng > 180));
console.log(`Invalid coordinates: ${invalid.length}`);

// Burdwan is around lat: 23.23, lng: 87.86
const outsideBurdwan = allPujas.filter(p => p.lat !== null && (p.lat < 23.0 || p.lat > 23.5 || p.lng < 87.5 || p.lng > 88.2));
console.log(`Outside Burdwan expected region (23.0-23.5, 87.5-88.2): ${outsideBurdwan.length}`);
outsideBurdwan.forEach(p => console.log(`  - ${p.slug} (${p.lat}, ${p.lng})`));

// Check for reversed lat/lng (lng around 23, lat around 87)
const reversed = allPujas.filter(p => p.lat !== null && p.lat > 80 && p.lng < 30);
console.log(`Likely reversed lat/lng: ${reversed.length}`);
reversed.forEach(p => console.log(`  - ${p.slug} (${p.lat}, ${p.lng})`));

// Check duplicates
const seen = new Set();
const duplicates = [];
allPujas.forEach(p => {
  if (p.lat !== null && p.lng !== null) {
    const key = `${p.lat},${p.lng}`;
    if (seen.has(key)) duplicates.push(p.slug);
    seen.add(key);
  }
});
console.log(`Duplicate coordinates: ${duplicates.length}`);
duplicates.forEach(p => console.log(`  - ${p.slug}`));

