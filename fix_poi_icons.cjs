const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /const poiIcon = \(color: string\) => L\.divIcon\(\{[\s\S]*?\}\);/;

const cachedPoiIcons = `const poiIconCache: Record<string, L.DivIcon> = {};
const getPoiIcon = (color: string) => {
  if (!poiIconCache[color]) {
    poiIconCache[color] = L.divIcon({
      className: 'poi-marker',
      html: \`<div style="background: \${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>\`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }
  return poiIconCache[color];
};`;

code = code.replace(regex, cachedPoiIcons);
code = code.replace(/icon=\{poiIcon\(POI_COLORS\[poi\.type\]\)\}/g, "icon={getPoiIcon(POI_COLORS[poi.type])}");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI icon recreation lag');
