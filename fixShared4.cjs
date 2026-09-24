const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');
c = c.replace('<footer className="footer">', "{pathname === '/' && <KashField />}\n      <footer className=\"footer\">");
fs.writeFileSync('src/components/shared.tsx', c);

