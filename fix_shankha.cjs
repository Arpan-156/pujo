const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

code = code.replace(
  "engine.oneShot('shankha');",
  "new Audio('/audio/shankha.mp3').play().catch(e => console.error(e));"
);

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Shankha sound replaced!");
