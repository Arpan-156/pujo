const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = `export * from './SouvenirPage';\n` + code;
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Exported SouvenirPage");
