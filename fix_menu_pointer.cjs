const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code = code.replace(
  '.menu.open { pointer-events: none !important;',
  '.menu.open { pointer-events: auto;'
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log('Fixed menu pointer events');
