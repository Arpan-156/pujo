const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/BCO - Burdwan City Online/g, "BCO - Burdwan Capturers Official");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
