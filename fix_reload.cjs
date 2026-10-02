const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /const \{ geo \} = useGeo\(\);/,
  'const { geo, requestPermission } = useGeo();'
);

code = code.replace(
  /window\.location\.reload\(\);/g,
  'requestPermission();'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed reload');
