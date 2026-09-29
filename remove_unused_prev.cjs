const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const prev = pujas\[\(i - 1 \+ pujas\.length\) % pujas\.length\], next = pujas\[\(i \+ 1\) % pujas\.length\];\s*/;
if (code.match(regex)) {
    code = code.replace(regex, '');
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Removed unused prev/next variable definitions.");
} else {
    console.log("Regex didn't match.");
}
