const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(/const dists = \{\};/g, `const dists: Record<string, number> = {};`);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed TS error');
