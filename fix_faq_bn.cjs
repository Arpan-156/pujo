const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  'bn="???????????????"',
  'bn="\\u09B8\\u09BE\\u09A7\\u09BE\\u09B0\\u09A3 \\u09AA\\u09CD\\u09B0\\u09B6\\u09CD\\u09A8"'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed FAQ bn');
