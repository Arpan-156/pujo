const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

code = code.replace(/wide: r\[6\] === 'wide',\n\s*\}\)\);/, `wide: r[6] === 'wide',\n    year: r[8] || (2025 - (i % 3)),\n  }));`);
code = code.replace(/type Row = \[([^\]]+)\];/, `type Row = [$1, number?];`);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Updated GALLERY");
