const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

// Change from using vertical --p to horizontal --hp
code = code.replace(
  ".tl-line span { display: block; height: 100%; background: linear-gradient(90deg, var(--gold), var(--sindoor)); transform-origin: left; transform: scaleX(min(1, max(0, calc(var(--p, 0) * 1.9 - 0.3)))); box-shadow: 0 0 10px var(--gold); }",
  ".tl-line span { display: block; height: 100%; background: linear-gradient(90deg, var(--gold), var(--sindoor)); transform-origin: left; transform: scaleX(var(--hp, 0)); box-shadow: 0 0 10px var(--gold); transition: transform 0.1s linear; }"
);

// Also strictly force particles to stay in background
code = code.replace(
  "/* ================= TIMELINE ================= */",
  "/* ================= TIMELINE ================= */\n.tl-particles { z-index: 0 !important; pointer-events: none !important; opacity: 0.25; }"
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed Timeline CSS for hp and particles.");
