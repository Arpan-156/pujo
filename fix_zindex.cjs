const fs = require('fs');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

// 1. Force pointer-events: none on Alpana
css = css.replace('pointer-events: auto;', 'pointer-events: none !important;');

// 2. Force z-index on footer links
css = css.replace('.footer-grid li a { \r\n    color: var(--mute);', '.footer-grid li a { \n    color: var(--mute); \n    z-index: 50; \n    pointer-events: auto !important;');
css = css.replace('.footer-grid li a { \n    color: var(--mute);', '.footer-grid li a { \n    color: var(--mute); \n    z-index: 50; \n    pointer-events: auto !important;');

fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Z-index and pointer events forced!");

