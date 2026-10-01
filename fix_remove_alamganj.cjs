const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /\s*\{\s*slug:\s*'alamganj-natun-sangha'[\s\S]*?\},/g;
code = code.replace(regex, '');

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Removed Alamganj Natun Sangha");
