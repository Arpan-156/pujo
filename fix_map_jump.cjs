const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /useEffect\(\(\) => \{\s*if \(center\) \{\s*map\.flyTo\(center, zoom, \{ duration: 1\.5 \}\);\s*\}\s*\}, \[center, zoom, map\]\);/m;
const fix = `useEffect(() => {
      if (center) {
        map.flyTo(center, zoom, { duration: 1.5, animate: true });
      }
    }, [center?.[0], center?.[1], zoom, map]);`;

code = code.replace(regex, fix);
fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed map jump');
