const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

code = code.replace(/\/\/ removed pause/, 'this.audioEl?.pause();');

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Restored audioEl.pause in pause()");
