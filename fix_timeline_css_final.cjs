const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

// Ensure the dot is correctly positioned within the padded list
code = code.replace(
  ".tl-dot { position: absolute; left: 0; top: -9px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink); border: 3px solid var(--gold); box-shadow: 0 0 0 4px var(--ink), 0 0 15px rgba(233,181,88,0.6); z-index: 3; transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1); }",
  ".tl-dot { position: absolute; left: 0; top: -9px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink); border: 3px solid var(--gold); box-shadow: 0 0 0 4px var(--ink), 0 0 15px rgba(233,181,88,0.6); z-index: 3; transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1); transform: translateX(-50%); }"
);

// We added left: 30px, right: 30px inline, so remove it from CSS
code = code.replace(
  ".tl-line { position: absolute; left: 14px; right: 14px; top: 18px; height: 3px; background: rgba(233, 181, 88, 0.15); z-index: 1; border-radius: 2px; }",
  ".tl-line { position: absolute; top: 18px; height: 3px; background: rgba(233, 181, 88, 0.15); z-index: 1; border-radius: 2px; }"
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Timeline CSS fixed.");
