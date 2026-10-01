const fs = require('fs');
let code = fs.readFileSync('src/sections/DailyShloka.tsx', 'utf8');

code = code.replace(
  /const diff = \(d - start\) \+ \(\(start\.getTimezoneOffset\(\) - d\.getTimezoneOffset\(\)\) \* 60 \* 1000\);/,
  'const diff = (d.getTime() - start.getTime()) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);'
);

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
console.log('Fixed Date subtraction for TypeScript');
