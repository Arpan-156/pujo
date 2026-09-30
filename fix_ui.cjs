const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /<h1>Community Top 3<\/h1>/;
const newUI = `<h1>Community Top 3</h1>
            {isSyncing && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(233,181,88,0.2)', color: 'var(--gold)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginTop: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 1s infinite' }} />
              Syncing Global Votes...
            </div>}`;

code = code.replace(target, newUI);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Added sync indicator.");
