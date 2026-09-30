const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const target = /\/\/ Route through Web Audio API to bypass iOS Silent Switch\n\s*if \(\!this\.audioSource && this\.ctx\) \{\n\s*this\.audioSource = this\.ctx\.createMediaElementSource\(a\);\n\s*this\.audioSource\.connect\(this\.bus\);\n\s*\}/;
code = code.replace(target, '');
fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Removed audioSource references");
