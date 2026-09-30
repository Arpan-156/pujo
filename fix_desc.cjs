const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/p\.descriptionription/g, "p.description");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
