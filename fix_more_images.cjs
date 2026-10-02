const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const replacement = `
  if (r.slug === 'amadpur-zomidar-bari') {
    customHeroSrc = '/photos/idol-1.jpg';
    customIdolSrc = '/photos/idol-1.jpg';
  }
  if (r.slug === 'vivekananda-sevak-sangha') {
    customHeroSrc = '/photos/idol-2.jpg';
    customIdolSrc = '/photos/idol-2.jpg';
  }
  if (r.slug === 'laltu-smriti-sangha') {
    customHeroSrc = '/photos/idol-3.jpg';
    customIdolSrc = '/photos/idol-3.jpg';
  }
  if (r.slug === 'jagoroni-sangha') {
    customHeroSrc = '/photos/idol-4.jpg';
    customIdolSrc = '/photos/idol-4.jpg';
  }
`;

code = code.replace(
  /if \(r\.slug === 'amadpur-zomidar-bari'\) \{[\s\S]*?customIdolSrc = '\/photos\/idol-2\.jpg';\n  \}/,
  replacement.trim()
);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Replaced images block');
