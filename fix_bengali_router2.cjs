const fs = require('fs');
let code = fs.readFileSync('src/lib/router.tsx', 'utf8');

code = code.replace(
  /bn:\s*'[^']*?\?'/g,
  `bn: '\u09AC\u09B0\u09CD\u09A7\u09AE\u09BE\u09A8\u09C7\u09B0 \u09A6\u09C1\u09B0\u09CD\u0997\u09BE\u09AA\u09C2\u099C\u09BE'`
);

fs.writeFileSync('src/lib/router.tsx', code, 'utf8');
console.log('Fixed Bengali in router.tsx using regex');
