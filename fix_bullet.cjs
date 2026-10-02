const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/<span style=\{\{ color: 'rgba\(255,255,255,0\.3\)', fontSize: '0\.85rem' \}\}>.*<\/span>/, "<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>\u2022</span>");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed bullet in pill');
