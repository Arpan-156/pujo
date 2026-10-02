const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(/\{validPujas\.map\(p => \(/, "{showPandals && validPujas.map(p => (");

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed validPujas conditional');
