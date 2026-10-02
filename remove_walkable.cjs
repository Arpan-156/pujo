const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\{p\.map\?\.lat && p\.map\?\.lng && \([\s\S]*?Nearby Pandals \(Walkable Circuit\)[\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*<\/section>\s*<section className="pd-more wrap">/;

code = code.replace(regex, '</div>\n      </section>\n\n      <section className="pd-more wrap">');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Removed Walkable Circuit');
