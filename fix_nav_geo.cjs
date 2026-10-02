const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code = code.replace(
  /\.nav-geo \{\s*display: none !important;\s*\}/,
  '.nav-geo { /* display: none removed */ }'
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
