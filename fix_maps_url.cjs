const fs = require('fs');

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/https:\/\/www\.google\.com\/maps\/dir\//g, 'https://maps.google.com/maps/dir/');
  fs.writeFileSync(filePath, code, 'utf8');
}

fixFile('src/pages/Pages.tsx');
fixFile('src/sections/PujaMap.tsx');
console.log('Fixed Google Maps URLs');
