const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const target = `private stopVoices() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.audioEl?.pause();
    this.spec = null;
  }`;

code = code.replace("this.audioEl?.pause();", "// removed pause");

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Removed pause from stopVoices.");
