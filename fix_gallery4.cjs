const fs = require('fs');
let code = fs.readFileSync('src/sections/GalleryBoard.tsx', 'utf8');

const match = code.match(/\{list\.length > 0 \? \([\s\S]*?<\/FlipGrid>\n\s*\) : \(/);
console.log("Match found?", !!match);

