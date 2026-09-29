const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /<section className="surv-teaser"[\s\S]*?<\/section>/;
if (code.match(regex)) {
    code = code.replace(regex, '');
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
}
