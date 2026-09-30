const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

code = code.replace(/private stopVoices\(\) \{([\s\S]*?)\}/, (match) => {
  return match.replace(/this\.audioEl\?\.pause\(\);/g, '');
});

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Properly removed pause from stopVoices.");
