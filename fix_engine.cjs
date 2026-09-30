const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const targetRegex = /if \(track\.src\) \{\s+const a = \(this\.audioEl \?\?= new Audio\(\)\);\s+if \(!a\.src\.includes\(track\.src\)\) a\.src = track\.src;\s+a\.loop = true;\s+a\.volume = this\.s\.volume;\s+a\.play\(\)\.catch\(\(\) => this\.set\(\{ blocked: true \}\)\);\s+\}/;

const replacement = `if (track.src) {
      const a = (this.audioEl ??= new Audio());
      if (!a.src.includes(track.src)) {
        a.src = track.src;
        a.load();
      }
      a.loop = true;
      a.volume = this.s.volume;
      a.play().catch(e => {
        console.error("Audio engine block:", e);
        this.set({ blocked: true });
      });
    } else {
      if (this.audioEl) this.audioEl.pause();
    }`;

code = code.replace(targetRegex, replacement);

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Updated engine.ts for better iOS Safari compatibility.");
