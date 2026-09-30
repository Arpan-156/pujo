const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// I will just find "</FlipGrid>" inside PujasPage and replace it with "</FlipGrid></>"
// Be careful to only replace the first occurrence in PujasPage!

// Let's replace </FlipGrid> with </FlipGrid></>
const target = /<\/FlipGrid>\s*\) : \(/;
code = code.replace(target, "</FlipGrid></>) : (");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed JSX syntax.");
