const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

code = code.replace(/year: 2025 - \(i % 3\)/g, 'year: 2025');

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Updated year to 2025 only");
