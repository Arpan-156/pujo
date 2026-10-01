const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

css = css.replace(/pointer-events: auto;/g, 'pointer-events: none !important;');

fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Alpana fixed");
