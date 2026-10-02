const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /const createPujaIcon = \(isActive: boolean\) => L\.divIcon\(\{[\s\S]*?\}\);/;

const newIcons = `const activePujaIcon = L.divIcon({
  className: 'custom-puja-marker',
  html: \`<div style="background: #facc15; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #111; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: all 0.3s ease;"></div>\`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const inactivePujaIcon = L.divIcon({
  className: 'custom-puja-marker',
  html: \`<div style="background: #eab308; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #ca8a04; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: all 0.3s ease;"></div>\`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});`;

code = code.replace(regex, newIcons);
code = code.replace(/icon=\{createPujaIcon\(sel === p\.slug\)\}/g, "icon={sel === p.slug ? activePujaIcon : inactivePujaIcon}");
code = code.replace(/icon=\{createPujaIcon\(true\)\}/g, "icon={activePujaIcon}");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed icon recreation lag');
