const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

code = code.replace(/^[ \t]*\},[ \t]*\r?\n/gm, "");

fs.writeFileSync('src/data/content.ts', code, 'utf8');
