const fs = require('fs');
let code = fs.readFileSync('src/sections/About.tsx', 'utf8');

code = code.replace(
  "<RevealText lines={['ABOUT', 'BURDWAN PUJO']} className=\"display\" />",
  "<RevealText lines={['ABOUT THE', 'ORGANIZERS']} className=\"display\" />"
);

fs.writeFileSync('src/sections/About.tsx', code, 'utf8');
console.log("Fixed About.");
