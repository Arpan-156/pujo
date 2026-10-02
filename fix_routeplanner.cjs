const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /\{p\.dist\.toFixed\(1\)\} km away • \{p\.theme \|\| 'Traditional'\}/,
  '{p.dist.toFixed(1)} km away • {getWalkTimeStr(p.dist)}'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed RoutePlannerPage walk time');
