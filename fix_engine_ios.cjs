const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const targetRegex = /const a = \(this\.audioEl \?\?= new Audio\(\)\);/;
const replacement = `const a = (this.audioEl ??= new Audio());
      // Route through Web Audio API to bypass iOS Silent Switch
      if (!this.audioSource && this.ctx) {
        a.crossOrigin = "anonymous";
        this.audioSource = this.ctx.createMediaElementSource(a);
        this.audioSource.connect(this.bus);
      }`;

if (code.match(targetRegex)) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
  console.log("Added MediaElementSource to engine.ts");
} else {
  console.log("Regex failed for engine.ts");
}

// Now we need to update DhakTile to do the same!
let expCode = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');
const expTarget = /audioRef\.current = new Audio\('\/audio\/dhak\.mp3'\);/;
const expReplace = `audioRef.current = new Audio('/audio/dhak.mp3');
      audioRef.current.crossOrigin = "anonymous";
      // Ensure it works on iOS by bypassing silent switch (if engine ctx exists)
      try {
        const audioCtx = window.webkitAudioContext ? new window.webkitAudioContext() : new window.AudioContext();
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(audioCtx.destination);
      } catch (e) {}`;

if (expCode.match(expTarget)) {
  expCode = expCode.replace(expTarget, expReplace);
  fs.writeFileSync('src/sections/Experiences.tsx', expCode, 'utf8');
  console.log("Added MediaElementSource to DhakTile");
}
