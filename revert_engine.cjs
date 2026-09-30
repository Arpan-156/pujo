const fs = require('fs');

// Revert engine.ts
let engineCode = fs.readFileSync('src/audio/engine.ts', 'utf8');
engineCode = engineCode.replace(/private audioEl: HTMLAudioElement \| null = null;\n  private audioSource: MediaElementAudioSourceNode \| null = null;/, `private audioEl: HTMLAudioElement | null = null;`);

const targetEngineRegex = /\/\/ Route through Web Audio API to bypass iOS Silent Switch[\s\S]*?this\.audioSource\.connect\(this\.bus\);\n        \}/;
engineCode = engineCode.replace(targetEngineRegex, ``);
engineCode = engineCode.replace(/a\.crossOrigin = "anonymous";\n        /, '');
fs.writeFileSync('src/audio/engine.ts', engineCode, 'utf8');

// Revert Experiences.tsx
let expCode = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');
const targetExpRegex = /audioRef\.current\.crossOrigin = "anonymous";[\s\S]*?\} catch \(e\) \{\}/;
expCode = expCode.replace(targetExpRegex, ``);
fs.writeFileSync('src/sections/Experiences.tsx', expCode, 'utf8');

console.log("Reverted Web Audio API routing.");
