const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /distStr = d < 1 \? `\$\{\(d \* 1000\)\.toFixed\(0\)\}m away` : `\$\{d\.toFixed\(1\)\}km away`;/,
  'distStr = d < 1 ? `${(d * 1000).toFixed(0)}m away • ${getWalkTimeStr(d)}` : `${d.toFixed(1)}km away • ${getWalkTimeStr(d)}`;'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed walking time in PujasPage');
