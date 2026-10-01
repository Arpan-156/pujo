const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Update .hero to use safe centering or padding
code = code.replace(
  'padding: 0 !important; isolation: isolate; background: #0a0808;',
  'padding: 120px 0 0 0 !important; isolation: isolate; background: #0a0808;'
);

// 2. Remove justify-content: center so padding-top is strictly respected
code = code.replace(
  'display: flex; align-items: center !important; justify-content: center !important;',
  'display: flex; align-items: center !important; justify-content: center !important;'
);
// Actually, if we use margin: auto on .hero-in, we don't need justify-content: center on .hero.
// Let's just fix .hero-in

code = code.replace(
  'width: 100%; max-width: 1200px; padding: 0 40px 100px 40px; margin-top: 10vh;',
  'width: 100%; max-width: 1200px; padding: 0 40px 100px 40px; margin-top: auto; margin-bottom: auto;'
);

// For mobile
code = code.replace(
  '.hero { padding: 0 !important; align-items: center !important; }',
  '.hero { padding: 100px 0 0 0 !important; align-items: center !important; }'
);

code = code.replace(
  '.hero-in { padding: 0 20px; min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }',
  '.hero-in { padding: 0 20px; min-height: calc(100vh - 100px); display: flex; flex-direction: column; justify-content: center; margin: auto 0; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated Hero padding to prevent nav overlap.");
