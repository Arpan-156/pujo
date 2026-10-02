const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Stop matching radius in filter
code = code.replace(
  'if (d > radius) matchRad = false;',
  '// radius removed'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Removed radius logic from PujaMap');
