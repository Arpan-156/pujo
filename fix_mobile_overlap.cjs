const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '.hero-brand { margin-top: 6vh; margin-bottom: 40px; padding-bottom: 0; font-size: 0.65rem; text-align: center; }',
  '.hero-brand { margin-top: 6vh; margin-bottom: 0; padding-bottom: 140px; font-size: 0.65rem; text-align: center; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed mobile overlap with circular buttons");
