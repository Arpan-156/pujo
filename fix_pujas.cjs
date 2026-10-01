const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(
  "{ slug: 'alamganj-barowari-bhubaneswari', name: 'Alamganj Barowari',",
  "{ slug: 'alamganj-natun-sangha', name: 'Alamganj Natun Sangha',"
);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Fixed duplicate Alamganj Barowari");
