const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

// Replace expensive clip-path with cheap opacity/transform
code = code.replace(/\.menu-bg \{[\s\S]*?clip-path: circle\(0 at calc\(100% - 44px\) 44px\); transition: clip-path 0\.9s var\(--ease-io\); \}/, `.menu-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 10%, #4a0f16, var(--ink) 65%); transform: translateX(100%); transition: transform 0.6s var(--ease); }`);
code = code.replace(/\.menu\.open \.menu-bg \{ clip-path: circle\(150% at calc\(100% - 44px\) 44px\); \}/, `.menu.open .menu-bg { transform: translateX(0); }`);

// Remove backdrop-filter from heavily animated things on mobile
const noBlur = `
@media (max-width: 900px) {
  .nav.scrolled { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(20, 8, 9, 0.95); }
  .chat-fab, .music-fab, .music-panel, .chat-panel { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; background-color: rgba(20, 8, 9, 0.98) !important; }
}
`;
code += noBlur;

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log('Fixed CSS mobile lag');
