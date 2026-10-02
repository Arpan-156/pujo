const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace the TileLayer URLs
code = code.replace(
  /url="https:\/\/\{s\}\.basemaps\.cartocdn\.com\/dark_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png"/g,
  'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"'
);

// Add the CSS filter for the dark mode map tiles
code = code.replace(
  /\.leaflet-container \{ width: 100%; height: 100%; background: #1a1a1a; \}/g,
  '.leaflet-container { width: 100%; height: 100%; background: #111; }\n        .leaflet-tile-pane { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed map tiles');
