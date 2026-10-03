const fs = require('fs');
let code = fs.readFileSync('src/styles/base.css', 'utf8');

code = code.replace(/\.page \{ overflow-x: hidden;  \}/, '.page { overflow-x: hidden; overflow-x: clip; }');
code = code.replace(/#root \{ overflow-x: hidden;  width: 100%; position: relative; \}/, '#root { overflow-x: hidden; overflow-x: clip; width: 100%; position: relative; }');

fs.writeFileSync('src/styles/base.css', code, 'utf8');
console.log('Restored overflow-x: clip to fix position: sticky');
