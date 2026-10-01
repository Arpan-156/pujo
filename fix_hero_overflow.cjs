const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Remove overflow-y: auto to prevent the "scroll trap" bug and let the section naturally push content down
code = code.replace(
  'position: relative; min-height: 100vh; overflow-x: hidden; overflow-y: auto;',
  'position: relative; min-height: 100vh; overflow-x: hidden;'
);

// 2. Fix the massive padding that created the black space
code = code.replace(
  '.hero-brand { margin-top: 6vh; margin-bottom: 0; padding-bottom: 140px; font-size: 0.65rem; text-align: center; }',
  '.hero-brand { margin-top: 6vh; margin-bottom: 0; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed Hero scroll trap and blank space");
