const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

css = css.replace('.chatbot-wrapper.show { opacity: 1; pointer-events: none !important; }', '.chatbot-wrapper.show { opacity: 1; pointer-events: auto !important; }');
css = css.replace('.footer-alpana { position: absolute; right: -260px; bottom: -380px; opacity: 0.13; pointer-events: none !important; max-width: none; }', '.footer-alpana { position: absolute; right: -260px; bottom: -380px; opacity: 0.13; pointer-events: none !important; max-width: none; }');

fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log("Chatbot fixed");
