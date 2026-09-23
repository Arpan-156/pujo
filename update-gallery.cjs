const fs = require('fs');

let content = fs.readFileSync('src/data/content.ts', 'utf8');

content = content.replace(
  /export const GALLERY_CATEGORIES = \[[^\]]+\];/,
  "export const GALLERY_CATEGORIES = ['All', 'Maa Durga', 'Pandals', 'Street', 'Crowd'];"
);

content = content.replace(
  /type Row = \[.*?\];/,
  "type Row = [string, string, ArtKind, Tone, number, number, ('tall' | 'wide')?, string?];"
);

content = content.replace(
  /export const GALLERY: GalleryItem\[\] = ROWS\.map\(\(r, i\) => \(\{\n\s*id: `g\$\{i \+ 1\}`,\n\s*category: r\[0\],\n\s*caption: r\[1\],\n\s*credit: CREDIT,\n\s*visual: \{ art: r\[2\], tone: r\[3\], seed: r\[4\], hue: r\[5\] \},/,
  "export const GALLERY: GalleryItem[] = ROWS.map((r, i) => ({\n  id: `g${i + 1}`,\n  category: r[0],\n  caption: r[1],\n  credit: CREDIT,\n  visual: { art: r[2], tone: r[3], seed: r[4], hue: r[5], src: r[7] },"
);

const newRows = `const ROWS: Row[] = [
  ['Maa Durga', 'Durga under the chalchitra arch, moments before Bodhon', 'idol', 'dusk', 301, 8, 'tall', '/images/maa1.jpg'],
  ['Maa Durga', 'Ekchala idol, painted by hand, unlit', 'idol', 'night', 302, 20, undefined, '/images/maa2.jpg'],
  ['Maa Durga', 'Ten arms, one lamp', 'idol', 'night', 303, 350, 'tall', '/images/maa3.jpg'],
  ['Maa Durga', 'Traditional daaker saaj and vibrant colors', 'idol', 'dusk', 304, 34, undefined, '/images/maa4.jpg'],
  ['Pandals', 'Three tiers of light, Ashtami evening', 'pandal', 'night', 304, 12, 'wide'],
  ['Pandals', 'The gate that became a pandal', 'gate', 'dusk', 305, 14],
  ['Pandals', 'Bamboo and cloth in the last week of construction', 'pandal', 'dusk', 306, 30, 'tall'],
  ['Pandals', 'Terracotta panels, copied one by one', 'temple', 'dusk', 330, 18],
  ['Crowd', 'Ashtami night, the queue at the gate', 'crowd', 'night', 316, 20, 'wide'],
  ['Crowd', 'Anjali, packed to the courtyard wall', 'crowd', 'day', 317, 30],
  ['Street', 'Bunting and lamps on a lane', 'street', 'night', 318, 24, 'tall'],
  ['Street', 'Station Bazar after midnight', 'market', 'night', 319, 28],
  ['Street', 'Sitabhog and mihidana, a sweet-shop counter', 'food', 'dusk', 320, 34],
];`;

content = content.replace(/const ROWS: Row\[\] = \[[\s\S]*?\];/, newRows);

fs.writeFileSync('src/data/content.ts', content);

