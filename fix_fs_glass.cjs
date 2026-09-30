const fs = require('fs');
let code = fs.readFileSync('src/styles/pages.css', 'utf8');

code = code.replace(
  "background: rgba(30, 12, 15, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);",
  "background: rgba(20, 8, 10, 0.85); /* backdrop removed for iOS perf */"
);

code = code.replace(
  "transition: all 1s cubic-bezier",
  "transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s, transform 1s cubic-bezier"
);

fs.writeFileSync('src/styles/pages.css', code, 'utf8');
console.log("Fixed iOS fs-glass glitch.");
