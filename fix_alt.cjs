const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  'alt={`${p.name} pandal`}',
  'alt={`Durga Puja pandal of ${p.name} in Burdwan`}'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed alt in Pages.tsx');
