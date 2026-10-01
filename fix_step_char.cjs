const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/Step \{i \+ 1\} . \{p\.zone\}/, 'Step {i + 1} &bull; {p.zone}');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Step character with bull');
