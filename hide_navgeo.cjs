const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code = code.replace(
  /\.nav-geo \{ \/\* display: none removed \*\/ \}/,
  '.nav-geo { display: none; }'
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log('Hid nav-geo on mobile');
