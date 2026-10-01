const fs = require('fs');
let code = fs.readFileSync('src/sections/About.tsx', 'utf8');

code = code.replace(/if \(b === 'pujo' && key === 'youtube'\) return null; \/\/ Hidden for now/g, '');

fs.writeFileSync('src/sections/About.tsx', code, 'utf8');
console.log("Fixed About.tsx");
