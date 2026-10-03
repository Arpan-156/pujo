const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/<MapPin/g, '<Pin');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed MapPin to Pin');
