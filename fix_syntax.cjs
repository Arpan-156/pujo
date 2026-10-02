const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /\}m away` : `\$\{d\.toFixed\(1\)\}km away`;\s*\}/g,
  ''
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed syntax error');
