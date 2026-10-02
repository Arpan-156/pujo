const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

// Remove the radius select block completely
code = code.replace(
  /<select\s+className="geo-select"[\s\S]*?<\/select>/,
  ''
);

// Remove the visual text "Radius: {radius} km from"
code = code.replace(
  '<p>Radius: {radius} km from</p>',
  '<p>From </p>'
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed radius dropdown in GeoBar');
