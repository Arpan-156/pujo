const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const oldStyle = `style={{ flex: 1, background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}`;
const newStyle = `style={{ background: 'var(--gold)', color: '#1a0b0c', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)', transition: 'all 0.2s' }}`;

code = code.replace(oldStyle, newStyle);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Get Directions styling');
