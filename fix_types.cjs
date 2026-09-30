const fs = require('fs');
let code = fs.readFileSync('src/data/types.ts', 'utf8');

const target = /wide\?: boolean;\n\}/;
const replacement = `wide?: boolean;\n  year: number;\n}`;

code = code.replace(target, replacement);

fs.writeFileSync('src/data/types.ts', code, 'utf8');
console.log("Added year to GalleryItem");
