const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace the fn-icon ?
code = code.replace(/<div className="fn-icon">\?<\/div>/, '<div className="fn-icon"><Search size={24} /></div>');

// Replace the transit ?
// The span is <span style={{ color: 'var(--gold)' }}>?</span>
code = code.replace(
  /<span style=\{\{ color: 'var\(--gold\)' \}\}>\?<\/span>/g,
  `<span style={{ color: 'var(--gold)', display: 'flex' }}>
    {p.transit.includes('End') ? <CheckCircle size={20} /> : <Navigation size={20} style={{ transform: 'rotate(135deg)' }} />}
  </span>`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Replaced all ?");
