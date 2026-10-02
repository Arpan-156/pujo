const fs = require('fs');
let code = fs.readFileSync('src/styles/base.css', 'utf8');

if (!code.includes('overscroll-behavior-y: none')) {
  code = code.replace(
    'body {\n  margin: 0;',
    'body {\n  overscroll-behavior-y: none;\n  margin: 0;'
  );
  fs.writeFileSync('src/styles/base.css', code, 'utf8');
}
console.log('Fixed pull to refresh in base.css');
