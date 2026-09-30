const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const target = /private stopVoices\(\) \{\n\s*if \(this\.timer\) clearInterval\(this\.timer\);\n\s*this\.timer = null;\n\s*this\.audioEl\?\.pause\(\);\n\s*this\.spec = null;\n\s*\}/;
const replacement = `private stopVoices() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
      this.spec = null;
    }`;

code = code.replace(target, replacement);

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Fixed stopVoices.");
