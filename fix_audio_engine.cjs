const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

code = code.replace(
  "async unlock() {",
  "unlock() {"
);
code = code.replace(
  "try { await ctx.resume(); } catch { /* ignore */ }",
  "try { ctx.resume(); } catch { /* ignore */ }"
);

// We need to also fix playDhakBass to unlock immediately synchronously just in case it's not awaited
code = code.replace(
  "async playDhakBass() {",
  "playDhakBass() {"
);
code = code.replace(
  "async playDhakTreble() {",
  "playDhakTreble() {"
);
code = code.replace(
  "async playDhakSoft() {",
  "playDhakSoft() {"
);
code = code.replace(
  "async oneShot(kind: 'dhak' | 'shankha' | 'bell') {",
  "oneShot(kind: 'dhak' | 'shankha' | 'bell') {"
);

// Strip await ctx.resume() from these one shots and replace with just ctx.resume();
code = code.replace(/try \{ await ctx\.resume\(\); \} catch \{ \/\* ignore \*\/ \}/g, "try { ctx.resume(); } catch { /* ignore */ }");

fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Fixed audio engine iOS sync unlock.");
