const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/url="https:\/\/\{s\}\.tile\.openstreetmap\.org\/\{z\}\/\{x\}\/\{y\}\.png"/g, 'url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"');
code = code.replace(/attribution='&copy; <a href="https:\/\/www\.openstreetmap\.org\/copyright">OpenStreetMap<\/a>'/g, "attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>'");
code = code.replace(/attribution='&copy; OpenStreetMap contributors'/g, "attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>'");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Switched to CARTO Voyager tiles for faster loading');
