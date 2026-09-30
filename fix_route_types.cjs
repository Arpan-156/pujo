const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/p\.town/g, "p.zone === 'Bardhaman Town'");
code = code.replace(/p\.desc/g, "p.description");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed types.");
