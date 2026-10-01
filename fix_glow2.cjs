const fs = require('fs');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const regex = /\.footer-grid li a \{(?:[^}]*)\}\r?\n\.footer-grid li a:hover \{(?:[^}]*)\}/;

const newCss = `.footer-grid li a { 
  color: var(--mute); 
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  display: inline-block;
  position: relative;
}
.footer-grid li a:hover { 
  color: var(--gold); 
  padding-left: 10px; 
  text-shadow: 0 0 8px rgba(233, 181, 88, 0.8), 0 0 16px rgba(233, 181, 88, 0.4); 
  transform: scale(1.05);
  letter-spacing: 0.5px;
}`;

if (regex.test(css)) {
  css = css.replace(regex, newCss);
  fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
  console.log("Replaced successfully!");
} else {
  console.log("Could not find the css block using regex.");
}
