const fs = require('fs');
let code = fs.readFileSync('src/styles/base.css', 'utf8');

// Remove overflow-x: clip
code = code.replace(/overflow-x: clip;/g, '');

fs.writeFileSync('src/styles/base.css', code, 'utf8');
console.log('Fixed clip');
