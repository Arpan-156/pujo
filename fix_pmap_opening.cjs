const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(30, 20, 20, 0\.8\)/,
  "{!isHome && (<>\n            <div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8)"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed opening wrapper');
