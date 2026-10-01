const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const regex = /\.footer-grid li a:hover \{(?:[^}]*)\}/;

const newCss = `.footer-grid li a:hover { 
  color: var(--gold) !important; 
  padding-left: 10px !important; 
  text-shadow: 0 0 8px rgba(233, 181, 88, 0.8), 0 0 16px rgba(233, 181, 88, 0.4) !important; 
  transform: scale(1.05) !important;
  letter-spacing: 0.5px !important;
}`;

css = css.replace(regex, newCss);
fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Forced hover with !important");
