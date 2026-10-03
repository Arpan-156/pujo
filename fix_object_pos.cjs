const fs = require('fs');
let code = fs.readFileSync('src/styles/pages.css', 'utf8');

const regex = /\.pd-hero-bg \.photo \{ animation: kenburns 36s ease-in-out infinite alternate; \}/;
const replacement = `.pd-hero-bg .photo { animation: kenburns 36s ease-in-out infinite alternate; object-position: center 80%; }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/styles/pages.css', code, 'utf8');
console.log('Fixed object-position');
