const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(300px, 1fr\)\)', gap: '24px', marginBottom: '24px' \}\}>([\s\S]*?)<\/div>\s*<\/div>\s*<\!--/m;
// Wait, I need to match the closing tag correctly.
// Let's use a simpler replace strategy for the specific JSX block.
