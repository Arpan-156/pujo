const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /if \(r\.slug === 'amadpur-zomidar-bari'\) \{/;
const replacement = `if (r.slug === 'ichlabad-youth-club') {
      customHeroSrc = '/images/ichlabad-youth-club.jpg';
      customIdolSrc = '/images/ichlabad-youth-club.jpg';
    }
    if (r.slug === 'amadpur-zomidar-bari') {`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Added Ichlabad Youth Club image');
