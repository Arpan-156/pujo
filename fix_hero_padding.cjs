const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Set desktop padding
code = code.replace(
  'padding: 0 !important; isolation: isolate; background: #0a0808;',
  'padding: 100px 0 80px 0 !important; isolation: isolate; background: #0a0808;'
);

// Set mobile padding
code = code.replace(
  '.hero { padding: 0 !important; align-items: center !important; }',
  '.hero { padding: 100px 0 80px 0 !important; align-items: center !important; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Applied absolute safe padding to Hero container!");
