const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code = code.replace(
  '.music-fab { pointer-events: none !important;',
  '.music-fab { pointer-events: auto;'
);

code = code.replace(
  '.music.open .music-panel { opacity: 1; transform: none; pointer-events: none !important;',
  '.music.open .music-panel { opacity: 1; transform: none; pointer-events: auto;'
);

code = code.replace(
  '.chatbot-wrapper.open .chat-panel { transform: scale(1) translateY(0); opacity: 1; pointer-events: none !important; }',
  '.chatbot-wrapper.open .chat-panel { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }'
);

// Also remove from .music-panel base class if it has it, wait, let's check
code = code.replace(
  'pointer-events: none; visibility: hidden; transition: opacity 0.35s, transform 0.45s var(--ease), visibility 0s 0.45s;',
  'pointer-events: none; visibility: hidden; transition: opacity 0.35s, transform 0.45s var(--ease), visibility 0s 0.45s;'
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log('Fixed pointer events');
