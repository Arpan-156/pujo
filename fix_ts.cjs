const fs = require('fs');

// Fix engine.ts
let engineCode = fs.readFileSync('src/audio/engine.ts', 'utf8');
engineCode = engineCode.replace(/audioEl\?: HTMLAudioElement;/, `audioEl?: HTMLAudioElement;\n  audioSource?: MediaElementAudioSourceNode;`);
fs.writeFileSync('src/audio/engine.ts', engineCode, 'utf8');

// Fix Experiences.tsx
let expCode = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');
expCode = expCode.replace(/window\.webkitAudioContext/g, `(window as any).webkitAudioContext`);
fs.writeFileSync('src/sections/Experiences.tsx', expCode, 'utf8');

console.log("Fixed TypeScript errors.");
