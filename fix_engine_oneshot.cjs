const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

// Add specific one-shot methods
const newOneShots = `  async playDhakBass() {
    const ctx = this.ensure();
    try { await ctx.resume(); } catch { /* ignore */ }
    if (ctx.state !== 'running') return;
    this.dhak(ctx.currentTime + 0.01, 1, true, false, this.fx);
  }

  async playDhakTreble() {
    const ctx = this.ensure();
    try { await ctx.resume(); } catch { /* ignore */ }
    if (ctx.state !== 'running') return;
    this.dhak(ctx.currentTime + 0.01, 0.8, false, false, this.fx);
  }

  async playDhakSoft() {
    const ctx = this.ensure();
    try { await ctx.resume(); } catch { /* ignore */ }
    if (ctx.state !== 'running') return;
    this.dhak(ctx.currentTime + 0.01, 0.6, true, true, this.fx);
  }

  async oneShot`;

code = code.replace("  async oneShot", newOneShots);
fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Added individual drum hit methods.");
