const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Upgrade the cards to premium glassmorphism
const glassBase = "background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden'";
const redBase = "background: 'linear-gradient(145deg, rgba(40, 10, 10, 0.8) 0%, rgba(15, 5, 5, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 100, 100, 0.2), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden'";

// Replace the generic background styles for the 3 cards
code = code.replace(/style=\{\{ background: 'rgba\(20,8,9,0\.5\)', border: '1px solid var\(--line\)', padding: '24px', borderRadius: '16px' \}\}/g, `style={{ ${glassBase} }}`);
code = code.replace(/style=\{\{ background: 'rgba\(20,8,9,0\.5\)', border: '1px solid rgba\(239, 68, 68, 0\.3\)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' \}\}/g, `style={{ ${redBase} }}`);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Upgraded Map Dashboard to premium glassmorphism');
