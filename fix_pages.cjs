const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Import the new icons
const importRegex = /import {([^}]+)} from '\.\.\/components\/Icons'/;
if (code.match(importRegex)) {
  const match = code.match(importRegex);
  if (!match[1].includes('Settings')) {
    code = code.replace(importRegex, `import { $1, Settings, Palette, Lightbulb } from '../components/Icons'`);
  }
}

// Replace "? Modify Criteria"
code = code.replace(
  `<span>?</span> <span>Modify Criteria</span>`,
  `<span className="spin-slow"><Settings size={20} /></span> <span>Modify Criteria</span>`
);

// Replace Theme ?
code = code.replace(
  /<span style={{ fontSize: '1.4rem' }}>\?<\/span>(\s*<div>\s*<div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var\(--mute\)', letterSpacing: '1px', marginBottom: '4px' }}>Theme<\/div>)/g,
  `<span style={{ color: 'var(--gold)' }}><Palette size={24} /></span>$1`
);

// Replace Insider Tip Emoji (or any ? left)
// Wait, the emoji is `??`. The regex might be tricky if it's utf8 or `dY'`.
// Let's replace by looking around "Insider Tip".
const tipRegex = /<span style={{ fontSize: '1.4rem' }}>[^<]+<\/span>(\s*<div>\s*<div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var\(--mute\)', letterSpacing: '1px', marginBottom: '4px' }}>Insider Tip<\/div>)/g;
code = code.replace(tipRegex, `<span style={{ color: 'var(--gold)' }}><Lightbulb size={24} /></span>$1`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Replaced ? with SVGs");
