const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /return 2 \* R \* Math\.asin\(Math\.sqrt\(a\)\);/;
const fix = `const straightLineDist = 2 * R * Math.asin(Math.sqrt(a));\n    // Multiply by a tortuosity factor (1.4) to approximate actual walking/road distance rather than straight-line (crow-flies)\n    return straightLineDist * 1.4;`;

code = code.replace(regex, fix);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed distance formula');
