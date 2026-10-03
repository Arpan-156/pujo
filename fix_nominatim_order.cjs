const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /return data\.address\?\.city \|\| data\.address\?\.town \|\| data\.address\?\.suburb \|\| data\.address\?\.village \|\| data\.address\?\.county \|\| null;/;
const fix = `return data.address?.neighbourhood || data.address?.suburb || data.address?.village || data.address?.town || data.address?.city || data.address?.county || null;`;

code = code.replace(regex, fix);
// Also increase zoom to 16 for better granularity
code = code.replace(/zoom=14/, 'zoom=16');

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed property order');
