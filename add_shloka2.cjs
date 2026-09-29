const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!code.includes('<DailyShloka />')) {
    code = code.replace(/<Countdown \/>[\s\S]*?<Manifesto \/>/, "<Countdown />\n      <DailyShloka />\n      <Manifesto />");
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
}
