const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  'display: flex; align-items: center !important; justify-content: center !important;',
  'display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column;'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated justify-content to flex-start");
