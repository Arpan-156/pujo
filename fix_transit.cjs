const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const importRegex = /import {([^}]+)} from '\.\.\/components\/Icons'/;
if (code.match(importRegex)) {
  const match = code.match(importRegex);
  if (!match[1].includes('Navigation')) {
    code = code.replace(importRegex, `import { $1, Navigation, CheckCircle } from '../components/Icons'`);
  }
}

// Find the precise block rendering the transit `?`
const targetHtml = `<div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: 'var(--gold)' }}>?</span>
                          </div>`;

const replacementHtml = `<div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: 'var(--gold)', display: 'flex' }}>
                              {p.transit.includes('End') ? <CheckCircle size={20} /> : <Navigation size={20} style={{ transform: 'rotate(45deg)' }} />}
                            </span>
                          </div>`;

code = code.replace(targetHtml, replacementHtml);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Replaced transit ? with Navigation icon");
