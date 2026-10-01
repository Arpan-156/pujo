const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const regex = /\.footer-grid li a\s*\{[\s\S]*?\}\s*\.footer-grid li a::before\s*\{[\s\S]*?\}\s*\.footer-grid li a:hover\s*\{[\s\S]*?\}\s*\.footer-grid li a:hover::before\s*\{[\s\S]*?\}/;

const newCss = `.footer-grid li a {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--mute);
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 4px 0;
  z-index: 50;
  pointer-events: auto !important;
}
.footer-grid li a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0px;
  height: 2px;
  background: var(--gold);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateY(-50%);
  opacity: 0;
  box-shadow: 0 0 8px var(--gold);
  pointer-events: none;
}
.footer-grid li a:hover { 
  color: var(--gold) !important; 
  padding-left: 14px !important; 
  text-shadow: 0 0 12px rgba(233, 181, 88, 0.4) !important; 
}
.footer-grid li a:hover::before {
  width: 8px;
  opacity: 1;
}`;

if (css.match(regex)) {
  css = css.replace(regex, newCss);
  fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
  console.log("Re-applied pointer-events and z-index");
} else {
  console.log("Could not find regex match");
}
