const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/url="https:\/\/\{s\}\.basemaps\.cartocdn\.com\/rastertiles\/voyager\/\{z\}\/\{x\}\/\{y\}\{r\}\.png"/g, 'url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"');
code = code.replace(/attribution='&copy; <a href="https:\/\/www\.openstreetmap\.org\/copyright">OpenStreetMap<\/a> contributors &copy; <a href="https:\/\/carto\.com\/attributions">CARTO<\/a>'/g, "attribution='&copy; Google Maps'");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Switched to Google Maps tiles');
