const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /const build = \(r: Row\): Puja => \{([\s\S]*?)heroImage: V\(r.art, r.seed, r.hue, r.tone \?\? 'night'\),([\s\S]*?)idolImage: V\('idol', r.seed \+ 40, r.hue, 'dusk'\),/m;

const replacement = `
const REAL_PHOTOS = ['/photos/idol-1.jpg', '/photos/idol-2.jpg', '/photos/durga.jpg', '/photos/kash.jpg', '/photos/108-shiva.jpg', '/photos/curzon.jpg', '/photos/gate.jpg', '/photos/overbridge.jpg', '/photos/radio.jpg', '/photos/station.jpg'];
const IDOL_PHOTOS = ['/photos/idol-1.jpg', '/photos/idol-2.jpg', '/photos/durga.jpg'];

const build = (r: Row): Puja => {$1heroImage: { art: r.art, seed: r.seed, hue: r.hue, tone: r.tone ?? 'night', src: REAL_PHOTOS[r.seed % REAL_PHOTOS.length] },$2idolImage: { art: 'idol', seed: r.seed + 40, hue: r.hue, tone: 'dusk', src: IDOL_PHOTOS[(r.seed + 40) % IDOL_PHOTOS.length] },`;

code = code.replace(regex, replacement.trim());
fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Replaced images');
