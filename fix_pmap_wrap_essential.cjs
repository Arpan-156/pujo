const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Remove the `{!isHome && (<>` that is currently before Visiting Spots
code = code.replace(
  /\{!isHome && \(\s*<>\s*<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(20, 30, 20, 0\.8\)/,
  "<div style={{ background: 'linear-gradient(145deg, rgba(20, 30, 20, 0.8)"
);

// Inject `{!isHome && (<>` right before Essential Services
const essentialStart = `<div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ color: 'var(--gold)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                       Essential Services`;

code = code.replace(essentialStart, "{!isHome && (<>\n              " + essentialStart);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed outer wrapper for Essential Services');
