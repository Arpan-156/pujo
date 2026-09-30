const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/'Sankhari Pukur ln, Sripally', 'Sankhari Pukur ln, Sripally'/g, "'Sankhari Pukur ln, Sripally'");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
