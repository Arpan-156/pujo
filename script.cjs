
const data = [
  ['natural-city', 'Natural City', 'Vivekananda College Road', 'heritage', 'Sabekiana / Traditional Bengal'],
  ['rathtala-barowari', 'Rathtala Barowari', 'Rathtala', 'mythology', 'Mahakal'],
  ['kiran-sangha', 'Kiran Sangha', 'Ichlabad', 'eco', 'Jol-i Jibon / Water is Life'],
  ['padmashree-sangha', 'Padmashree Sangha', 'Susopanna', 'heritage', 'Pushpanjali'],
  ['boro-nilpur', 'Boro Nilpur', 'Boro Nilpur', 'architecture', 'Dubai Swaminarayan Temple'],
  ['alamganj-barowari-kedarnath', 'Alamganj Barowari', 'Alamganj', 'architecture', 'Kedarnath'],
  ['laxmipur-math', 'Laxmipur Math', 'Laxmipur Math', 'contemporary', 'Domino Theme'],
  ['nabin-sangha', 'Nabin Sangha', 'Chhotonilpur', 'architecture', 'Hawa Mahal, Rajasthan'],
  ['ichlabad-kiran-sangha', 'Ichlabad Kiran Sangha', 'Ichlabad', 'mythology', 'Baahubali', true],
  ['keshabganj-choti-barowari', 'Keshabganj Choti Barowari', 'Keshabganj', 'social', 'Ami Nari, Ami Mohiyoshi'],
  ['alamganj-barowari-bhubaneswari', 'Alamganj Barowari', 'Alamganj', 'architecture', 'Bhubaneswari Temple'],
  ['chowringhee-club', 'Chowringhee Club', 'Chhotonilpur', 'contemporary', 'In the Land of the Blue Fairy'],
  ['laltu-smriti-sangha', 'Laltu Smriti Sangha', 'Baranilpur', 'architecture', 'Tirupati Balaji Temple', true],
  ['subhash-athletic-club', 'Subhash Athletic Club', 'Nutanpally', 'contemporary', 'A Piece of Kashmir - Vande Bharat'],
  ['badamtala-khaluibil-math', 'Badamtala Khaluibil Math', 'Katwa Road', 'social', 'Artanader Itikotha'],
  ['burirbagan-sarbojanin', 'Burirbagan Sarbojanin', 'Burir Bagan', 'social', 'Matririn'],
  ['barsul-yma', 'Barsul Young Mens Association', 'Barsul', 'architecture', 'Red Fort', false, false],
  ['tikrahat-sarbojanin', 'Tikrahat Sarbojanin', 'Tikrahat', 'social', 'The Agony of 46'],
  ['barsul-jagarani', 'Barsul Jagarani', 'Barsul', 'contemporary', 'Rangamanch / Stage', false, false],
  ['kalna-gate-bank-para', 'Kalna Gate Bank Para', 'Kalna Gate', 'mythology', 'Ardhanarishwar'],
  ['sripally-officers-colony', 'Sripally Officers Colony', 'Sripally', 'social', 'Yoga Shakti'],
  ['bandhab-sangha', 'Bandhab Sangha', 'Bardhaman', 'contemporary', 'Pinjore Pran Muktir Gaan'],
  ['shyamlal-sarbojanin', 'Shyamlal Sarbojanin', 'Khosbagan', 'mythology', 'Har Har Mahadev']
];

const rows = [
  '{ slug: \'vivekananda-sevak-sangha\', name: \'Vivekananda Sevak Sangha\', area: \'Vivekananda Pally\', themeId: \'eco\', themeName: \'Prakriti O Pran\', cats: [\'Traditional\', \'Community Puja\'], est: 1985, feat: true, art: \'eco\', seed: 231, hue: 140, tone: \'day\', x: 50, y: 50, lat: 23.22969, lng: 87.86378, desc: \'An eco-friendly celebration focusing on nature, using natural materials for a serene and pure environment.\', story: \'For decades, Vivekananda Sevak Sangha has organized an authentic, traditional puja. This year, the focus is entirely on eco-consciousness. The pandal is woven from jute and bamboo, and the idol is sculpted from untouched river clay without synthetic paints, returning peacefully to nature on Dashami.\' }'
];

data.forEach((d, i) => {
  const [slug, name, area, themeId, themeName, feat = false, town = true] = d;
  const cat = themeId !== 'heritage' ? 'Theme Puja' : 'Traditional';
  const out = '{ slug: \'' + slug + '\', name: \'' + name + '\', area: \'' + area + '\', town: ' + town + ', themeId: \'' + themeId + '\', themeName: \'' + themeName + '\', cats: [\'Community Puja\', \'' + cat + '\'], est: ' + (1970 + i) + ', feat: ' + feat + ', art: \'pandal\', seed: ' + (100 + i) + ', hue: ' + (i * 10) + ', tone: \'night\', x: ' + (20 + (i % 5) * 15) + ', y: ' + (20 + Math.floor(i / 5) * 15) + ', desc: \'Celebrating Durga Puja with grand festivities and devotion.\' }';
  rows.push(out);
});

const fs = require('fs');
let content = fs.readFileSync('src/data/pujas.ts', 'utf8');
content = content.replace(/const ROWS: Row\[\] = \[[\s\S]*?\];/, 'const ROWS: Row[] = [\n  ' + rows.join(',\n  ') + '\n];');

const featBlock = 'export const FEATURED: FeaturedPandal[] = [\n' +
  '  { slug: \'vivekananda-sevak-sangha\', tagline: \'A luminous presence in the heart of the city.\', note: \'Traditional & Eco\' },\n' +
  '  { slug: \'ichlabad-kiran-sangha\', tagline: \'Epic grandeur brought to life.\', note: \'Mythology\' },\n' +
  '  { slug: \'laltu-smriti-sangha\', tagline: \'Divine architecture recreated.\', note: \'Architecture\' }\n' +
  '];';

content = content.replace(/export const FEATURED: FeaturedPandal\[\] = \[[\s\S]*?\];/, featBlock);
fs.writeFileSync('src/data/pujas.ts', content);
console.log('done');

