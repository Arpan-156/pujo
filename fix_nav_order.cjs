const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const match = code.match(/\{ label: 'Public Choice Awards', bn: '.*?', to: '\/vote' \},/);
if (match) {
  code = code.replace(match[0], '');
  const featMatch = code.match(/\{ label: 'Featured Pandals', bn: '.*?', to: '\/featured' \},/);
  if (featMatch) {
    code = code.replace(featMatch[0], featMatch[0] + '\n    ' + match[0]);
  }
}

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Fixed Nav Order');
