const fs = require('fs');

let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

// Regex to find and remove the exact row
const regex = /\s*\{\s*slug:\s*'kalna-gate-bank-para'[^}]*\},\r?\n?/;
code = code.replace(regex, '');

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Pandal removed successfully!");
