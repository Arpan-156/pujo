const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

code = code.replace(
  '.hs.pinned .hs-track { width: max-content; }',
  '.hs.pinned .hs-track { width: max-content; margin: 0 auto; }'
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log('Fixed HScroll on ultrawide');
