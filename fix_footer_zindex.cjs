const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

// Ensure .footer-grid is on top
code = code.replace(
  '.footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1.2fr 1fr; gap: 40px; align-items: start; }',
  '.footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1.2fr 1fr; gap: 40px; align-items: start; position: relative; z-index: 999; }'
);

// Force the glowing effect
code = code.replace(
  '.footer-grid li a:hover { \n    color: var(--gold) !important; \n    padding-left: 14px !important; \n    text-shadow: 0 0 12px rgba(233, 181, 88, 0.4) !important; \n  }',
  '.footer-grid li a:hover { \n    color: var(--gold) !important; \n    padding-left: 14px !important; \n    text-shadow: 0 0 12px rgba(233, 181, 88, 0.8) !important; \n  }'
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log("Footer Grid Z-index upgraded");
