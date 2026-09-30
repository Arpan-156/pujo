const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /\.t3-pod-slot \{ position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; animation: floatTrophy 6s ease-in-out infinite; \}/;
const replacement = `.t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; animation: floatTrophy 6s ease-in-out infinite; will-change: transform; filter: drop-shadow(0 15px 25px rgba(233,181,88,0.3)); }`;

code = code.replace(target, replacement);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Added will-change.");
