const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  ".hero-brand {\n            position: relative; margin-top: 6vh; margin-bottom: 60px;",
  ".hero-brand {\n            position: absolute; bottom: 85px; left: 0; right: 0; margin: 0; padding: 0;"
);

code = code.replace(
  ".hero-brand { margin-top: 6vh; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }",
  ".hero-brand { bottom: 85px; margin: 0; padding: 0; font-size: 0.65rem; text-align: center; }"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated hero brand to absolute positioning");
