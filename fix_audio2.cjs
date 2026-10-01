const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(/jago-durga\.m4a/g, 'jago-durga.mp3');

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Updated playlist to use new mp3");
