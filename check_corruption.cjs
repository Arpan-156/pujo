const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.includes('\uFFFD')) {
    console.log(`Line ${i+1}: ${l}`);
  }
});
