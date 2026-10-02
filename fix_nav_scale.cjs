const fs = require('fs');
let code = fs.readFileSync('src/components/Nav.tsx', 'utf8');

code = code.replace(
  'transform: \'scale(0.85)\'',
  'transform: \'scale(0.7)\''
);
// We can also reduce the gap from 8px to 4px
code = code.replace(
  'gap: \'8px\'',
  'gap: \'4px\''
);

fs.writeFileSync('src/components/Nav.tsx', code, 'utf8');
console.log('Fixed Nav.tsx scale');
