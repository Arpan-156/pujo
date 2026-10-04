const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(
  /\{ label: 'Pandals & Themes', bn: ',? ? \?o <', to: '\/pujas' \},/,
  "{ label: 'Pandals & Themes', bn: ',? ? ?o <', to: '/pujas' },\n  { label: 'Route Planner', bn: '?? \"? ?? ? ? _', to: '/planner' },"
);

code = code.replace(
  /\s*\{ label: 'Route Planner', bn: '?? "? \?? ? ? _', to: '\/planner' \},/g,
  ""
);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Fixed Nav Order');
