const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  ".hero-brand {\n            position: absolute; bottom: 85px; left: 0; right: 0; margin: 0; padding: 0;",
  ".hero-brand {\n            position: absolute; bottom: 85px; left: 0; right: 0; margin: 0; padding: 0; text-align: center;"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed text alignment!");
