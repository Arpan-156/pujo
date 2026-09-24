const fs = require('fs');
let c = fs.readFileSync('src/audio/engine.ts', 'utf8');
c = c.replace(
  /async play\(index = this\.s\.index\) \{([\s\S]*?)const track = TRACKS\[index\];/m,
  `async play(index = this.s.index) {
    const ctx = this.ensure();
    const track = TRACKS[index];
    if (track.src) {
        const a = (this.audioEl ??= new Audio());
        if (a.src !== track.src) a.src = track.src;
        a.loop = true;
        a.volume = this.s.volume;
        a.play().catch(() => this.set({ blocked: true }));
    }
    try { await ctx.resume(); } catch { /* ignore */ }
    this.stopVoices();`
);

c = c.replace(
  /if \(track\.src\) \{[\s\S]*?return;\n      \}/m,
  `if (track.src) return;`
);

fs.writeFileSync('src/audio/engine.ts', c);

