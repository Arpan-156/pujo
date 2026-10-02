const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /const handleDirections = \(lat: number, lng: number\) => \{[\s\S]*?const url = `https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=\$\{lat\},\$\{lng\}`;/,
  `const handleDirections = (lat: number, lng: number) => {
    const url = geo.lat && geo.lng 
      ? \`https://www.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${lat},\${lng}\`
      : \`https://www.google.com/maps/dir/?api=1&destination=\${lat},\${lng}\`;`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed directions in Map');
