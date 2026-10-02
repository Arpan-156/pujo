const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /Approximately \{distStr \? getWalkTimeStr\(parseFloat\(distStr\)\) : 'calculating\.\.\.'\}/g,
  `Approximately {distStr ? getWalkTimeStr(rawDistKm) : 'calculating...'}`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed walk time bug again');
