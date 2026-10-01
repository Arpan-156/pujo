const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const targetRegex = /\s*\{\s*slug:\s*'bandhab-sangha'[\s\S]*?desc:\s*'Celebrating Durga Puja with grand festivities and devotion.'\s*\},/g;

code = code.replace(targetRegex, '');

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Removed Bandhab Sangha from pujas.ts");
