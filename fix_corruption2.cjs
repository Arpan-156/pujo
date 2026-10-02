const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

let lines = code.split('\n');
for(let i = 0; i < lines.length; i++) {
  if (lines[i].includes('m from here') && lines[i].includes('getWalkTimeStr')) {
    lines[i] = lines[i].replace(/m from here .*? \{getWalkTimeStr/, "m from here \u2022 {getWalkTimeStr");
  }
}
fs.writeFileSync('src/pages/Pages.tsx', lines.join('\n'), 'utf8');
console.log('Fixed bullet in walkable circuit');
