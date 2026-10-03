const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

// Remove from Row literal
code = code.replace(/, heroImage: '\/images\/radha-ballab\.jpg', gallery: \['\/images\/radha-ballab\.jpg'\]/, '');

// Add to build function
const regex = /if \(r\.slug === 'amadpur-zomidar-bari'\) \{[\s\S]*?\}/;
const replacement = `if (r.slug === 'amadpur-zomidar-bari') {
      customHeroSrc = '/images/zamindar.jpg';
    }
    if (r.slug === 'radha-ballav-jiu-temple') {
      customHeroSrc = '/images/radha-ballab.jpg';
      customIdolSrc = '/images/radha-ballab.jpg';
    }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Fixed build function');
