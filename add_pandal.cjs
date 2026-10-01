const fs = require('fs');

let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const newRow = `    { slug: 'radha-ballav-jiu-temple', name: 'Radha Ballav Jiu Temple', area: 'Natunganj, Sripally', town: true, themeId: 'heritage', themeName: 'A Timeless Legacy', cats: ['Heritage', 'Family Puja'], est: 1750, feat: true, art: 'temple', seed: 250, hue: 35, tone: 'dusk', x: 28, y: 60, lat: 23.23788, lng: 87.84902, desc: 'A historic heritage puja preserved for generations.' },\n`;
code = code.replace("const ROWS: Row[] = [\n", "const ROWS: Row[] = [\n" + newRow);

const newFeatured = `    { slug: 'radha-ballav-jiu-temple', tagline: 'A historic heritage puja preserved for generations.', note: 'Heritage' },\n`;
code = code.replace("export const FEATURED: FeaturedPandal[] = [\n", "export const FEATURED: FeaturedPandal[] = [\n" + newFeatured);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Pandal added!");
