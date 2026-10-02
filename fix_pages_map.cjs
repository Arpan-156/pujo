const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/p\.map\?\.map\?\.lat/g, 'p.map?.lat');
code = code.replace(/p\.map\?\.map\?\.lng/g, 'p.map?.lng');
code = code.replace(/nextP\.map\?\.lat/g, 'nextP.map?.lat');
code = code.replace(/nextP\.map\?\.lng/g, 'nextP.map?.lng');

// I also need to check what `nextP` was originally. It was `nextP.lat`. But wait, `nextP` is `{ x, y, lat, lng }`! 
// Let's check `sortNearestNeighbor` definition.
