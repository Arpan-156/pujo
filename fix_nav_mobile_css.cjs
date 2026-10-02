const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code += `\n@media (max-width: 1120px) {\n  .nav-geo {\n    display: none !important;\n  }\n}\n`;

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log('Appended nav-geo hide rule');
