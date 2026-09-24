const fs = require('fs');
let c = fs.readFileSync('src/styles/base.css', 'utf8');
c = c.replace(/\\n@media/, '\n@media');
fs.writeFileSync('src/styles/base.css', c);

