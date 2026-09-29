const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  'className="surv-card animate-surv-card" style={{ animationDelay: `${idx * 0.2}s` }} style={section.type === \'guide\' ? { gridColumn: \'1 / -1\' } : {}}',
  'className="surv-card animate-surv-card" style={{ animationDelay: `${idx * 0.15}s`, ...(section.type === \'guide\' ? { gridColumn: \'1 / -1\' } : {}) }}'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
