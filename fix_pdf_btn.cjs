const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = `<p className="dir-count" aria-live="polite">{list.length} of {pujas.length} Puja</p>`;
const replacement = `
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p className="dir-count" aria-live="polite" style={{ margin: 0 }}>{list.length} of {pujas.length} Pandals</p>
            <button className="btn solid" onClick={() => window.print()} style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download PDF
            </button>
          </div>
`;

code = code.replace(target, replacement.trim());

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Added Download PDF button.");
