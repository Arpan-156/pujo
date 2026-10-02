const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /\.pmap-new-list \{ max-height: 400px; overflow-y: auto; \}/,
  '.pmap-new-list { height: 450px !important; max-height: 50vh !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch; flex: none !important; }'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile scroll css');
