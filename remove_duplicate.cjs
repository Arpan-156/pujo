const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\/\*\s*Nearby Pandals\s*\*\/[\s\S]*?(?=<\/div>\s*<\/div>\s*<section className="wrap" style=\{\{ padding: '60px 0' \}\}>)/;

// Let's do it safer by finding the exact block
const regex2 = /\/\*\s*Nearby Pandals\s*\*\/[\s\S]*?\{i !== 1 \? \([\s\S]*?Hop to Pandal \?[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/div>/;

const replaced = code.replace(regex2, '');
if (replaced !== code) {
  fs.writeFileSync('src/pages/Pages.tsx', replaced, 'utf8');
  console.log('Removed first Walkable Circuit block');
} else {
  console.log('Could not find the first block');
}
