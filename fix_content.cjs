const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

code = code.replace(/type Row = \[(.*?)\];/, "type Row = [$1, number?];");

code = code.replace(/export const GALLERY: GalleryItem\[\] = ROWS\.map\(\(r, i\) => \(\{\n\s*id: \`g\$\{i \+ 1\}\`,\n\s*category: r\[0\],\n\s*caption: r\[1\],\n\s*credit: CREDIT,\n\s*visual: \{ art: r\[2\], tone: r\[3\], seed: r\[4\], hue: r\[5\], src: r\[7\] \},\n\s*tall: r\[6\] === 'tall',\n\s*wide: r\[6\] === 'wide',\n\s*\}\)\);/, `export const GALLERY: GalleryItem[] = ROWS.map((r, i) => ({
  id: \`g\${i + 1}\`,
  category: r[0],
  caption: r[1],
  credit: CREDIT,
  visual: { art: r[2], tone: r[3], seed: r[4], hue: r[5], src: r[7] },
  tall: r[6] === 'tall',
  wide: r[6] === 'wide',
  year: r[8] || (2026 - (i % 3)),
}));`);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Updated GALLERY year mapping");
