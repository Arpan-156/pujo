const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Use regex to match the Transport Mode div regardless of \r or \n
code = code.replace(
  /<\/?div[^>]*>\s*<h3[^>]*>Transport Mode<\/h3>/,
  '</>)}\n\n              <div style={{ marginBottom: \'30px\' }}>\n                <h3 style={{ color: \'#fff\', fontSize: \'1.3rem\', margin: \'0 0 8px 0\' }}>Transport Mode</h3>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed TS syntax with regex');
