const fs = require('fs');
let code = fs.readFileSync('src/components/Nav.tsx', 'utf8');

code = code.replace(
  'transform: \'scale(0.7)\', transformOrigin: \'left center\'',
  '' // Remove scaling
);
// Also increase the gap to match Pic 2, which has a decent gap
code = code.replace(
  'gap: \'4px\'',
  'gap: \'12px\''
);

fs.writeFileSync('src/components/Nav.tsx', code, 'utf8');
console.log('Removed scale from Nav.tsx');
