const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

if (!code.includes('.photo { width: 100%; height: 100%; object-fit: cover; }')) {
  code += '\n\n/* Global Photo Class */\nimg.photo { width: 100%; height: 100%; object-fit: cover; }\n';
  fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
}
console.log('Fixed photo CSS');
