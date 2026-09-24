const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');
c = c.replace("{pathname === '/' && <KashField />}", "");
fs.writeFileSync('src/components/shared.tsx', c);

