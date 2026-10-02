const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');

code = code.replace(
  /const n = Math\.round\(count \* \(mobile \? 0\.25 : 0\.5\)\);/,
  'if (mobile) return; // Completely disable particles on mobile to fix lag\n      const n = Math.round(count * 0.5);'
);

fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
console.log('Disabled particles on mobile');
