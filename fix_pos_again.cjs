const fs = require('fs');

let pagesCode = fs.readFileSync('src/styles/pages.css', 'utf8');
pagesCode = pagesCode.replace(/object-position: center 80%;/g, 'object-position: center 55%;');
fs.writeFileSync('src/styles/pages.css', pagesCode, 'utf8');

let sectionsCode = fs.readFileSync('src/styles/sections.css', 'utf8');
sectionsCode = sectionsCode.replace(/object-position: center 75%;/g, 'object-position: center 55%;');
fs.writeFileSync('src/styles/sections.css', sectionsCode, 'utf8');

console.log('Fixed object position to center 55%');
