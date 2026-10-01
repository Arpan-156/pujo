const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Replace the H1 content to include an sr-only span with the full descriptive text
const search = '<h1 className="t-main" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}><img src="/images/calligraphy.png" alt="Burdwan Pujo 2026"';
const replace = '<h1 className="t-main" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}><span className="sr-only">Bardwan Puja Guide 2026 - Discover Burdwan Durga Puja, Pandals & Map</span><img src="/images/calligraphy.png" alt="Burdwan Pujo 2026"';

code = code.replace(search, replace);
fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');

// Ensure .sr-only class exists in index.css
let css = fs.readFileSync('src/styles/index.css', 'utf8');
if (!css.includes('.sr-only')) {
  css += `\n.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }\n`;
  fs.writeFileSync('src/styles/index.css', css, 'utf8');
}
console.log('Fixed H1 in Hero.tsx');
