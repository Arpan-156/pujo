const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Reset .hero
code = code.replace(
  '.hero { padding: 80px 0 0 0 !important; align-items: center !important; }',
  '.hero { padding: 100px 0 60px 0 !important; align-items: center !important; justify-content: flex-start !important; }'
);
code = code.replace(
  'display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column;',
  'display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column;'
);

// 2. Reset .hero-in
code = code.replace(
  'width: 100%; max-width: 1200px; padding: 80px 40px 20px 40px; margin: auto 0;',
  'width: 100%; max-width: 1200px; padding: 0 40px; margin: auto 0;' // Clean padding!
);
code = code.replace(
  '.hero-in { padding: 80px 20px 20px 20px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; margin: auto 0; }',
  '.hero-in { padding: 40px 20px 0 20px; display: flex; flex-direction: column; justify-content: flex-start; margin: auto 0; }'
);

// 3. Fix inner spacings
code = code.replace(
  '.hero-brand {\n            position: relative; margin-top: 4vh; margin-bottom: 80px;',
  '.hero-brand {\n            position: relative; margin-top: 6vh; margin-bottom: 40px;'
);
code = code.replace(
  '.hero-brand { margin-top: 4vh; margin-bottom: 80px; padding-bottom: 0; font-size: 0.65rem; text-align: center; }',
  '.hero-brand { margin-top: 6vh; margin-bottom: 40px; padding-bottom: 0; font-size: 0.65rem; text-align: center; }'
);
code = code.replace(
  '.hero-bn-wrap { margin-bottom: 4vh; border-radius: 12px; }',
  '.hero-bn-wrap { margin-bottom: 2vh; border-radius: 12px; }'
);
code = code.replace(
  '.hero-sub { font-size: 0.75rem; letter-spacing: 3px; margin-top: 2vh; line-height: 1.5; margin-bottom: 6vh; }',
  '.hero-sub { font-size: 0.75rem; letter-spacing: 3px; margin-top: 2vh; line-height: 1.5; margin-bottom: 4vh; }'
);

// 4. Ensure procession is at the bottom, and we don't overlap it
code = code.replace(
  'position: relative; min-height: 100vh; overflow-x: hidden; overflow-y: auto;',
  'position: relative; min-height: 100vh; overflow-x: hidden; overflow-y: auto;'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated Hero spacing!");
