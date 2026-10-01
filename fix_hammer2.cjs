const fs = require('fs');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const regex = /\.footer-grid li a\s*\{[^}]*\}/;

const newCss = `.footer-grid li a {
  z-index: 50;
  pointer-events: auto !important;
  color: var(--mute);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  width: fit-content;
  padding: 4px 8px;
  margin-left: -8px;
  position: relative;
  border-radius: 8px;
}`;

css = css.replace(regex, newCss);
fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Hammer CSS applied");
