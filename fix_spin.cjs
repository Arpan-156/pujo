const fs = require('fs');
let code = fs.readFileSync('src/styles/base.css', 'utf8');
if (!code.includes('.spin-slow')) {
  code = code.replace('@keyframes spin', '.spin-slow { animation: spin 8s linear infinite; display: inline-flex; }\n@keyframes spin');
  fs.writeFileSync('src/styles/base.css', code, 'utf8');
}
console.log("spin-slow added");
