const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\{p\.map\?\.lat && p\.map\?\.lng && \([\s\S]*?<section className="wrap" style=\{\{ marginTop: '0', marginBottom: '40px' \}\}>[\s\S]*?Nearby Pandals \(Walkable Circuit\)[\s\S]*?<\/section>\s*\)\s*\}/;

if(code.match(regex)) {
  code = code.replace(regex, '');
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log('Removed Walkable Circuit successfully');
} else {
  console.log('Regex did not match!');
}
