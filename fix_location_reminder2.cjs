const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const reminder = `
          {(!geo.active || geo.isManual) && (
            <div style={{ background: 'rgba(233,181,88,0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(233,181,88,0.4)', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>For the best routing experience, we recommend enabling GPS. We will automatically prompt you for location access to calculate accurate distances!</span>
            </div>
          )}
`;

code = code.replace(
  /<GeoBar radius=\{radius\} setRadius=\{setRadius\}\s*\/>/,
  reminder + '\n          <GeoBar radius={radius} setRadius={setRadius} />'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Added location reminder successfully');
