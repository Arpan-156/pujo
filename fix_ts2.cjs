const fs = require('fs');
let engineCode = fs.readFileSync('src/audio/engine.ts', 'utf8');
engineCode = engineCode.replace(/private audioEl: HTMLAudioElement \| null = null;/, `private audioEl: HTMLAudioElement | null = null;\n  private audioSource: MediaElementAudioSourceNode | null = null;`);
fs.writeFileSync('src/audio/engine.ts', engineCode, 'utf8');
console.log("Fixed engine TS.");
