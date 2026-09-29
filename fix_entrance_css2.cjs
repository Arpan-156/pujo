const fs = require('fs');
let css = fs.readFileSync('src/styles/entrance.css', 'utf8');

css = css.replace('.tap-skip:hover::before { transform: translateX(100%); } 50% { opacity: 1; } }', '.tap-skip:hover::before { transform: translateX(100%); }');

fs.writeFileSync('src/styles/entrance.css', css, 'utf8');
