const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

const regex = /\.hero-cam \.photo \{ animation: kenburns 40s ease-in-out infinite alternate; \}/;
const replacement = `.hero-cam .photo { animation: kenburns 40s ease-in-out infinite alternate; object-position: center 75%; }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log('Fixed hero-cam object-position');
