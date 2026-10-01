const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

pages = pages.replace(
  'transform: rotate(135deg) scale(1.2);',
  'transform: rotate(180deg) scale(1.2);'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Fixed arrow rotation');
