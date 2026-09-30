const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

const targetStr = `onClick={() => { setHit((h) => h + 1); engine.playDhakBass(); }}`;
const replacementStr = `onClick={() => { setHit((h) => h + 1); toggleAuto(); }}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
  console.log("Replaced drum click handler successfully.");
} else {
  console.log("Target string not found.");
}
