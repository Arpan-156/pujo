const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '.hero-in { padding: 40px 20px 0 20px; display: flex; flex-direction: column; justify-content: flex-start; margin: auto 0; }',
  '.hero-in { padding: 0 20px; display: flex; flex-direction: column; justify-content: center; margin: auto 0; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed mobile padding");
