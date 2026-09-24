const fs = require('fs');
let c = fs.readFileSync('src/data/pujas.ts', 'utf8');
c = c.replace(/slug: 'amadpur-zomidar-bari'([\s\S]*?)feat: false/, "slug: 'amadpur-zomidar-bari'$1feat: true");
fs.writeFileSync('src/data/pujas.ts', c);

