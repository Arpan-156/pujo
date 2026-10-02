const fs = require('fs');
let code = fs.readFileSync('src/components/Nav.tsx', 'utf8');
code = code.replace('style={{  }}', '');
fs.writeFileSync('src/components/Nav.tsx', code, 'utf8');
console.log('Cleaned up Nav.tsx');
