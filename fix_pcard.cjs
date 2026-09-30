const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

code = code.replace(
  "backdrop-filter: blur(12px);",
  "/* backdrop-filter: blur(12px); Removed for iOS performance */"
);
code = code.replace(
  "-webkit-backdrop-filter: blur(12px);",
  "/* -webkit-backdrop-filter: blur(12px); */"
);

// In case the background was too transparent and relied on blur, let's make sure it's opaque enough
// .pcard { background: linear-gradient(135deg, rgba(20,5,8,0.95), rgba(30,10,12,0.9)); }
// It seems fine.

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed iOS pcard glitch.");
