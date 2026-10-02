const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/\.leaflet-tile-pane \{ filter: invert\(100%\) hue-rotate\(180deg\) brightness\(95%\) contrast\(90%\); \}/, '');
code = code.replace(/\.pmap-map-container \{ width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var\(--line\); background: #111; z-index: 1; display: flex; flex-direction: column; \}/, '.pmap-map-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #eee; z-index: 1; display: flex; flex-direction: column; }');
code = code.replace(/\.leaflet-container \{ flex: 1; width: 100%; background: #111; \}/, '.leaflet-container { flex: 1; width: 100%; background: #eee; }');

// Optionally change popup styling to light theme if it looks better with a white map
code = code.replace(/\.leaflet-popup-content-wrapper \{ background: #1a1a1a; color: #fff; border: 1px solid var\(--line\); border-radius: 8px; \}/, '.leaflet-popup-content-wrapper { background: #fff; color: #000; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }');
code = code.replace(/\.leaflet-popup-tip \{ background: #1a1a1a; \}/, '.leaflet-popup-tip { background: #fff; }');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed map color to white');
