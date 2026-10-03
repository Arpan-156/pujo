const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /if \(r\.slug === 'radha-ballav-jiu-temple'\) \{/;
const replacement = `if (r.slug === 'amadpur-zomidar-bari') {
      customHeroSrc = '/images/zamindar.jpg';
      customIdolSrc = '/images/zamindar.jpg';
    }
    if (r.slug === 'radha-ballav-jiu-temple') {`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Restored Zamindar image');
