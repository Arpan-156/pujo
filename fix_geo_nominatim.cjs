const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /const getNearestArea = \([\s\S]*?return nearest;\n\}/m;
const fix = `// Synchronous fallback for instant UI
const getNearestArea = (lat: number, lng: number) => {
  let nearest = 'Burdwan';
  let minDist = Infinity;
  for (const a of AREAS) {
    const d = getDistance(lat, lng, a.lat, a.lng);
    if (d < minDist) {
      minDist = d;
      nearest = a.name;
    }
  }
  if (minDist > 15) {
    return 'Your Location';
  }
  return nearest;
};

// Async reverse geocoding to get actual city/suburb worldwide
async function fetchExactLocationName(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lng}&zoom=14\`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.address?.city || data.address?.town || data.address?.suburb || data.address?.village || data.address?.county || null;
  } catch(e) {
    return null;
  }
}`;

code = code.replace(regex, fix);

const watchRegex = /area: getNearestArea\(latitude, longitude\),/g;
// Replace the first occurrence which is in watchPosition
let replaced = false;
code = code.replace(/area: getNearestArea\(latitude, longitude\),/g, (match) => {
  if (!replaced) {
    replaced = true;
    return `area: globalGeo.area !== 'Your Location' && globalGeo.area !== 'Outside Burdwan' ? globalGeo.area : getNearestArea(latitude, longitude),`;
  }
  return match;
});


fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Added Nominatim');
