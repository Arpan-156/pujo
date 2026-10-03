const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(/if \(r\.slug === 'amadpur-zomidar-bari'\) \{\s*customHeroSrc = '\/images\/zamindar\.jpg';\s*\}/, '');

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Removed broken image override');
