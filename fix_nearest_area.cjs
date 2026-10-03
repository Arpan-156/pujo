const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /const getNearestArea = \([\s\S]*?return nearest;\n\}/m;

const newNearest = `const getNearestArea = (lat: number, lng: number) => {
  let nearest = 'Burdwan';
  let minDist = Infinity;
  for (const a of AREAS) {
    const d = getDistance(lat, lng, a.lat, a.lng);
    if (d < minDist) {
      minDist = d;
      nearest = a.name;
    }
  }
  // If the user is more than 15km away from the nearest Burdwan area, they are out of town
  if (minDist > 15) {
    return 'Outside Burdwan';
  }
  return nearest;
}`;

code = code.replace(regex, newNearest);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed getNearestArea');
