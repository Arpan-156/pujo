const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Use flex-start on .hero so it doesn't clip top content on overflow
code = code.replace(
  'display: flex; align-items: center !important; justify-content: center !important; flex-direction: column;',
  'display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column;'
);

// Add margin: auto 0 to desktop .hero-in to center it safely
code = code.replace(
  'width: 100%; max-width: 1200px; padding: 0 40px; margin: auto 0;',
  'width: 100%; max-width: 1200px; padding: 80px 40px 20px 40px; margin: auto 0;'
);

// Add margin: auto 0 to mobile .hero-in
code = code.replace(
  '.hero-in { padding: 80px 20px 20px 20px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }',
  '.hero-in { padding: 80px 20px 20px 20px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; margin: auto 0; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Applied safe flex scroll fix");
