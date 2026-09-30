const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

code = code.replace(/this\.bus\.gain\.linearRampToValueAtTime\(0, t \+ 0\.5\);\n\s*\/\/ removed pause/, `this.bus.gain.linearRampToValueAtTime(0, t + 0.5);\n      this.audioEl?.pause();`);

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Restored pause in pause()");
