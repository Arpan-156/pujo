const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
let lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('\uFFFD')) {
    if (lines[i].includes('Geographic Coordinates')) {
      lines[i] = lines[i].split('\uFFFD').join('&deg;');
    } else {
      lines[i] = lines[i].split('\uFFFD').join('•');
    }
  }
}

fs.writeFileSync('src/pages/Pages.tsx', lines.join('\n'), 'utf8');
console.log('Fixed by line split/join');
