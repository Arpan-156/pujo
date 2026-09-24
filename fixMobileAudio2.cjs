const fs = require('fs');
let c = fs.readFileSync('src/audio/engine.ts', 'utf8');
c = c.replace(
  /async play\(index = this\.s\.index\) \{([\s\S]*?)if \(track\.src\) \{([\s\S]*?)return;\s*\}/m,
  `async play(index = this.s.index) {
    const ctx = this.ensure();
    const track = TRACKS[index];
    if (track.src) {
      const a = (this.audioEl ??= new Audio());
      if (!a.src.includes(track.src)) a.src = track.src;
      a.loop = true;
      a.volume = this.s.volume;
      a.play().catch(() => this.set({ blocked: true }));
    }
    try { await ctx.resume(); } catch { /* ignore */ }
    this.stopVoices();
    const g = ++this.gen;
    this.set({ index, playing: true, started: true, blocked: ctx.state !== 'running' });
    const t = ctx.currentTime;
    this.bus.gain.cancelScheduledValues(t);
    this.bus.gain.setValueAtTime(this.bus.gain.value, t);
    this.bus.gain.linearRampToValueAtTime(1, t + 1.2);
    if (track.src) return;`
);
fs.writeFileSync('src/audio/engine.ts', c);

