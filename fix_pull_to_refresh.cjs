const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

if (!code.includes('overscroll-behavior-y: none')) {
  code = code.replace(
    'body {',
    'body {\n  overscroll-behavior-y: none;\n'
  );
  code = code.replace(
    'html {',
    'html {\n  overscroll-behavior-y: none;\n'
  );
  fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
}
console.log('Fixed pull to refresh');
