const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

code = code.replace(
  "onClick={() => setAuto((a) => !a)}",
  "onClick={() => { engine.unlock(); setAuto((a) => !a); }}"
);

code = code.replace(
  "onClick={() => { setHit((h) => h + 1); engine.playDhakBass(); }}",
  "onClick={() => { engine.unlock(); setHit((h) => h + 1); engine.playDhakBass(); }}"
);

// Also check the Shankha button and Bell button
code = code.replace(
  "onClick={() => { setRun(true); engine.oneShot('shankha'); }}",
  "onClick={() => { engine.unlock(); setRun(true); engine.oneShot('shankha'); }}"
);

code = code.replace(
  "onClick={() => { setSwing((s) => s + 1); engine.oneShot('bell'); }}",
  "onClick={() => { engine.unlock(); setSwing((s) => s + 1); engine.oneShot('bell'); }}"
);

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Fixed iOS audio unlocking in Experiences.");
