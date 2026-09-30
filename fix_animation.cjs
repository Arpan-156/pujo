const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /@keyframes floatTrophy \{ 0%, 100% \{ transform: translateY\(0\); filter: drop-shadow\([^\)]+\); \} 50% \{ transform: translateY\(-15px\); filter: drop-shadow\([^\)]+\); \} \}/;
const replacement = `@keyframes floatTrophy { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`;

code = code.replace(target, replacement);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed floatTrophy animation.");
