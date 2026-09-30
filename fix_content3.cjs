const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

code = code.replace(/wide: r\[6\] === 'wide',/g, `wide: r[6] === 'wide',\n    year: 2025 - (i % 3),`);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Updated GALLERY");
