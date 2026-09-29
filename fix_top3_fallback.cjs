const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  'animation: cardReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-timeline: view(); animation-range: entry 10% cover 30%; background: linear-gradient',
  'animation: cardReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; background: linear-gradient'
);

// Inject inline stagger delays in the map function
code = code.replace(
  '<div key={p.id} className="t3-card">',
  '<div key={p.id} className="t3-card" style={{ animationDelay: `${idx * 0.1}s` }}>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Applied fallback animations.");
