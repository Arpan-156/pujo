const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /const REAL_PHOTOS = \['\/photos\/idol-1.jpg'[^;]+;\nconst IDOL_PHOTOS = \['\/photos\/idol-1.jpg'[^;]+;\n\nconst build = \(r: Row\): Puja => \{([\s\S]*?)heroImage: \{ art: r\.art, seed: r\.seed, hue: r\.hue, tone: r\.tone \?\? 'night', src: REAL_PHOTOS\[r\.seed % REAL_PHOTOS\.length\] \},([\s\S]*?)idolImage: \{ art: 'idol', seed: r\.seed \+ 40, hue: r\.hue, tone: 'dusk', src: IDOL_PHOTOS\[\(r\.seed \+ 40\) % IDOL_PHOTOS\.length\] \},/m;

const replacement = `
const build = (r: Row): Puja => {
  let customHeroSrc = undefined;
  let customIdolSrc = undefined;
  
  if (r.slug === 'amadpur-zomidar-bari') {
    customHeroSrc = '/photos/idol-1.jpg';
    customIdolSrc = '/photos/idol-1.jpg';
  }
  if (r.slug === 'vivekananda-sevak-sangha') {
    customHeroSrc = '/photos/idol-2.jpg';
    customIdolSrc = '/photos/idol-2.jpg';
  }$1heroImage: { art: r.art, seed: r.seed, hue: r.hue, tone: r.tone ?? 'night', src: customHeroSrc },$2idolImage: { art: 'idol', seed: r.seed + 40, hue: r.hue, tone: 'dusk', src: customIdolSrc },`;

code = code.replace(regex, replacement.trim());
fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Replaced global images with explicit slugs');
