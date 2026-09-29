const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

// The original tl-line and tl-dot
const oldLine = /.tl-line \{ position: absolute; left: 0; right: 0; top: 19px; height: 2px; background: rgba\(233, 181, 88, 0.18\); z-index: 1; \}/;
const oldDot = /.tl-dot \{ position: absolute; left: 0; top: -7px; width: 14px; height: 14px; border-radius: 50%; background: var\(--gold\); box-shadow: 0 0 0 4px var\(--ink\), 0 0 0 6px rgba\(233, 181, 88, 0.4\); z-index: 2; transition: transform 0.3s; \}/;

code = code.replace(oldLine, ".tl-line { position: absolute; left: 0; right: 0; top: 18px; height: 3px; background: rgba(233, 181, 88, 0.15); z-index: 1; border-radius: 2px; }");

code = code.replace(
  oldDot,
  ".tl-dot { position: absolute; left: 0; top: -8px; width: 18px; height: 18px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 6px var(--ink), 0 0 20px rgba(233,181,88,0.8); z-index: 3; transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1); }"
);

// We should also adjust the alignment of the dates so they align perfectly with the dots
code = code.replace(
  ".tl-item h3 { font-family: var(--f-display); font-weight: 500; font-size: 1.7rem; line-height: 1.1; }",
  ".tl-item h3 { font-family: var(--f-display); font-weight: 500; font-size: 1.7rem; line-height: 1.1; margin-top: 10px; }"
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed timeline bar CSS.");
