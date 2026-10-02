const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

if (!code.includes('white-space: nowrap;')) {
  code = code.replace(
    '.nav-brand-text { display: grid; line-height: 1.1; }',
    '.nav-brand-text { display: grid; line-height: 1.1; white-space: nowrap; }'
  );
  fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
  console.log('Fixed nav-brand-text wrap');
}
