const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(
  'location: `${r.area}, Bardhaman`', 
  'location: r.area.includes("Bardhaman") ? r.area : `${r.area}, Bardhaman`'
);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Updated location string.");
