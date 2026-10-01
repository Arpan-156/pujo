const fs = require('fs');

let shared = fs.readFileSync('src/components/shared.tsx', 'utf8');
shared = shared.replace('<ul>{NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}', '<ul>{NAV.map((n) => <li key={n.to}><Link to={n.to} data-cursor="Open">{n.label}</Link></li>)}');
shared = shared.replace('<li><Link to="/map">Puja Map</Link></li><li><Link to="/timeline">The Five Days</Link></li>', '<li><Link to="/map" data-cursor="Open">Puja Map</Link></li><li><Link to="/timeline" data-cursor="Open">The Five Days</Link></li>');
fs.writeFileSync('src/components/shared.tsx', shared, 'utf8');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');
css = css.replace('.footer-grid li a {\n  z-index: 50;\n  pointer-events: auto !important;\n  color: var(--mute); \n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); \n  display: inline-block;\n  position: relative;\n}', '.footer-grid li a {\n  z-index: 50;\n  pointer-events: auto !important;\n  color: var(--mute); \n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); \n  display: flex;\n  width: fit-content;\n  padding: 4px 8px;\n  margin-left: -8px;\n  position: relative;\n  border-radius: 8px;\n}');
fs.writeFileSync('src/styles/chrome.css', css, 'utf8');

console.log("Hammer applied");
