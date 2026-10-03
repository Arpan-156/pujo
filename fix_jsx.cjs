const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\{\s*<\/section>/;

code = code.replace(regex, '</section>');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed JSX syntax error');
