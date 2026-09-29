const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');
code = code.replace('<Link href="/survival"', '<Link to="/survival"');
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
