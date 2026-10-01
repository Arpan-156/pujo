const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Desktop: Reset Hero
code = code.replace(
  '.hero { \n            position: relative; min-height: 100vh; overflow-x: hidden; \n            display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column; \n            padding: 100px 0 80px 0 !important; isolation: isolate; background: #0a0808; \n        }',
  '.hero { \n            position: relative; min-height: 100vh; overflow-x: hidden; \n            display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column; \n            padding: 100px 0 80px 0 !important; isolation: isolate; background: #0a0808; \n        }\n        .hero::before, .hero::after { content: ""; flex-grow: 1; }'
);

code = code.replace(
  'width: 100%; max-width: 1200px; padding: 0 40px; margin: auto 0;',
  'width: 100%; max-width: 1200px; padding: 0 40px; margin: 0 auto; flex-shrink: 0;' // Prevent shrink, no vertical auto margin
);

// 2. Mobile: Reset Hero
code = code.replace(
  '.hero { padding: 100px 0 80px 0 !important; align-items: center !important; }',
  '.hero { padding: 100px 0 80px 0 !important; align-items: center !important; justify-content: flex-start !important; }'
);

code = code.replace(
  '.hero-in { padding: 0 20px; display: flex; flex-direction: column; justify-content: center; margin: auto 0; }',
  '.hero-in { padding: 0 20px; display: flex; flex-direction: column; justify-content: flex-start; margin: 0 auto; flex-shrink: 0; width: 100%; }'
);

code = code.replace(
  '.hero-brand { margin-top: 6vh; margin-bottom: 0; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }',
  '.hero-brand { margin-top: 6vh; margin-bottom: 40px; font-size: 0.65rem; text-align: center; padding-bottom: 0; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Implemented true safe-centering!");
