const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

css = css.replace(/\.footer-grid li a\s*\{/g, '.footer-grid li a {\n  z-index: 50;\n  pointer-events: auto !important;');

fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Forced successfully");
