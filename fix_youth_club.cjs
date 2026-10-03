const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(/slug: 'ichlabad-youth-club'[\s\S]*?lat: 23\.\d+, lng: 87\.\d+/, (match) => {
  return match.replace(/lat: 23\.\d+, lng: 87\.\d+/, 'lat: 23.2276, lng: 87.8808');
});

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Fixed Ichlabad Youth Club coords');
