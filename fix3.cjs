const fs = require('fs');
let c = fs.readFileSync('src/sections/About.tsx', 'utf8');

const headerRegex = /<div className="soc-header-row">\s*<RevealText lines=\{\['FOLLOW THE', 'PUJO JOURNEY'\]\} className="display" \/>\s*<\/div>/s;
c = c.replace(headerRegex, '');

const insertRegex = /(<\/Reveal>)\s*(<div className="soc-grid">)/s;
c = c.replace(insertRegex, `$1\n            <div className="soc-header-row" style={{ marginTop: '60px' }}>\n              <RevealText lines={['FOLLOW THE', 'PUJO JOURNEY']} className="display" />\n            </div>\n            $2`);

fs.writeFileSync('src/sections/About.tsx', c);

