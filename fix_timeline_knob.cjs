const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

// Update the tl-dot to look like a premium ring
const oldDotRegex = /\.tl-dot \{ position: absolute; left: 0; top: -8px; width: 18px; height: 18px; border-radius: 50%; background: var\(--gold\); box-shadow: 0 0 0 6px var\(--ink\), 0 0 20px rgba\(233,181,88,0\.8\); z-index: 3; transition: all 0\.4s cubic-bezier\(0\.2,0\.8,0\.2,1\); \}/;

const premiumDot = ".tl-dot { position: absolute; left: 0; top: -9px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink); border: 3px solid var(--gold); box-shadow: 0 0 0 4px var(--ink), 0 0 15px rgba(233,181,88,0.6); z-index: 3; transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1); }";

code = code.replace(oldDotRegex, premiumDot);

// Fix the hover state to match
const oldDotHover = /\.tl-item:hover \.tl-dot \{ transform: scale\(1\.3\); background: var\(--gold-2\); \}/;
const premiumDotHover = ".tl-item:hover .tl-dot { transform: scale(1.3); background: var(--gold); box-shadow: 0 0 0 4px var(--ink), 0 0 25px rgba(233,181,88,0.9); }";
code = code.replace(oldDotHover, premiumDotHover);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Upgraded timeline knob to premium ring style.");
