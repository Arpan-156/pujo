const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const regex = /<div className="loader-bar" aria-hidden="true"><span style=\{\{ transform: `scaleX\(\$\{pct \/ 100\}\)` \}\} \/><\/div>\s*<p className="loader-pct">\{pct\}%<\/p>/;
const newJsx = `<div className="loader-bar-wrap">
            <p className="loader-pct">{pct}%</p>
            <div className="loader-bar" aria-hidden="true"><span style={{ transform: \`scaleX(\${pct / 100})\` }} /></div>
          </div>`;

code = code.replace(regex, newJsx);
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log("Loader JSX updated.");
