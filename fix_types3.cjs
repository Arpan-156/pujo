const fs = require('fs');
let code = fs.readFileSync('src/data/types.ts', 'utf8');

code = code.replace('wide?: boolean;', 'wide?: boolean;\n  year?: number;');

fs.writeFileSync('src/data/types.ts', code, 'utf8');
console.log("Added year to GalleryItem.");
