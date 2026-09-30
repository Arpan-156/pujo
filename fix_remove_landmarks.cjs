const fs = require('fs');

let code = fs.readFileSync('src/data/content.ts', 'utf8');

// The items are in the LANDMARKS array:
// { id: 'lake', title: 'Krishna Sayar' ... }
// { id: 'streets', title: 'Local streets' ... }
// { id: 'market', title: 'Markets' ... }
// { id: 'zones', title: 'Puja zones' ... }

code = code.replace(/\{ id: 'lake'[\s\S]*?\},?\n?/g, '');
code = code.replace(/\{ id: 'streets'[\s\S]*?\},?\n?/g, '');
code = code.replace(/\{ id: 'market'[\s\S]*?\},?\n?/g, '');
code = code.replace(/\{ id: 'zones'[\s\S]*?\},?\n?/g, '');

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Removed landmarks.");
