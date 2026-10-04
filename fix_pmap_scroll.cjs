const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace the mobile list styling
code = code.replace(
  /\.pmap-new-list \{ height: auto !important; max-height: none !important; overflow-y: visible !important; flex: none !important; \}/,
  '.pmap-new-list { height: 400px !important; max-height: 50vh !important; overflow-y: auto !important; flex: none !important; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding-top: 10px; }'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile scrollable list');
