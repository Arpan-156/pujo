const fs = require('fs');
let code = fs.readFileSync('src/pages/SouvenirPage.tsx', 'utf8');
code = code.replace(/crossOrigin="anonymous"/g, '');
fs.writeFileSync('src/pages/SouvenirPage.tsx', code, 'utf8');
console.log("Fixed build error.");
