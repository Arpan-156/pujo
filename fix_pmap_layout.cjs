const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Undo the `.pmap-new-list > div` selector
code = code.replace(/\.pmap-new-list > div \{/g, '.pmap-card-mob {');

// For location and search, we don't want them to shrink/grow weirdly if they are in a row.
// Let's actually change the CSS to only target .pmap-card-mob
// Also, let's make .pmap-new-list stay flex-column on desktop, and flex-row on mobile.
// Since Search and Location Services are in the same container, on mobile they will be horizontal slides.
// Let's wrap them with .pmap-card-mob so they behave identically as slides!

code = code.replace(/<div style=\{\{ padding: '16px', background: 'rgba\(20,8,9,0\.5\)', borderRadius: '12px', border: '1px solid var\(--line\)', marginBottom: '10px' \}\}>/, '<div className="pmap-card-mob" style={{ padding: \'16px\', background: \'rgba(20,8,9,0.5)\', borderRadius: \'12px\', border: \'1px solid var(--line)\', marginBottom: \'10px\' }}>');

code = code.replace(/<div style=\{\{ marginBottom: '16px' \}\}>/, '<div className="pmap-card-mob" style={{ marginBottom: \'16px\' }}>');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile layout for map cards');
