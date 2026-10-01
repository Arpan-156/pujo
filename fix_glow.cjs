const fs = require('fs');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const oldCss = `.footer-grid li a { color: var(--mute); transition: color 0.25s, padding 0.3s var(--ease); }
.footer-grid li a:hover { color: var(--shankha); padding-left: 6px; }`;

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

if (css.includes('.footer-grid li a { color: var(--mute); transition: color 0.25s, padding 0.3s var(--ease); }')) {
  css = css.replace(oldCss, newCss);
  fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
  console.log("Glowing animations added!");
} else {
  console.log("Could not find old css.");
}

