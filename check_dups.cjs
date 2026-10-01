const fs = require('fs');
const code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const names = [];
const regex = /name:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(code)) !== null) {
  names.push(match[1]);
}

const counts = {};
names.forEach(n => counts[n] = (counts[n] || 0) + 1);

Object.keys(counts).forEach(k => {
  if (counts[k] > 1) console.log("Duplicate:", k, counts[k]);
});
console.log("Done checking duplicates.");
