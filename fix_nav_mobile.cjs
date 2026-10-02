const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

// Remove the display: none !important for .nav-geo
css = css.replace('  .nav-geo { display: none !important; }', '');
fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log('Unhid nav-geo on mobile');
