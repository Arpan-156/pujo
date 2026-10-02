const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(/\{ label: 'Explore Bardhaman'[^}]*\},/, '');

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Removed Explore Bardhaman from Nav');
