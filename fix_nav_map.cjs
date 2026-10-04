const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

// The map might not be in NAV array at all right now, or it might be elsewhere.
// Let's ensure it exists.
const mapObj = "{ label: 'Puja Map', bn: '\\u09AE\\u09CD\\u09AF\\u09BE\\u09AA', to: '/map' }";

// If it already exists, remove it.
code = code.replace(/\{ label: 'Puja Map'.*?\},?\n?/g, '');

const ptMatch = code.match(/\{ label: 'Pandals & Themes'.*?\},/);
if (ptMatch) {
  code = code.replace(ptMatch[0], ptMatch[0] + '\n    ' + mapObj + ',');
}

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Fixed Nav Map Order');
