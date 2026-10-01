const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Desktop Layout Fixes
code = code.replace(
  '.hero { padding: 120px 0 0 0 !important; align-items: center !important; }',
  '.hero { padding: 80px 0 0 0 !important; align-items: center !important; }'
);
code = code.replace(
  'padding: 120px 0 0 0 !important; isolation: isolate; background: #0a0808;',
  'padding: 0 !important; isolation: isolate; background: #0a0808;' // Remove fixed padding on desktop, rely on flex
);
code = code.replace(
  'display: flex; align-items: center !important; justify-content: flex-start !important; flex-direction: column;',
  'display: flex; align-items: center !important; justify-content: center !important; flex-direction: column;'
);
code = code.replace(
  'width: 100%; max-width: 1200px; padding: 0 40px 100px 40px; margin-top: auto; margin-bottom: auto;',
  'width: 100%; max-width: 1200px; padding: 0 40px; margin: auto 0;'
);
code = code.replace(
  '.hero-brand {\n            position: relative; margin-top: 6vh; margin-bottom: 60px;',
  '.hero-brand {\n            position: relative; margin-top: 4vh; margin-bottom: 80px;'
);

// 2. Mobile Layout Fixes
code = code.replace(
  '.hero { padding: 100px 0 0 0 !important; align-items: center !important; }',
  '.hero { padding: 0 !important; align-items: center !important; }'
);
code = code.replace(
  '.hero-in { padding: 0 20px; min-height: calc(100vh - 100px); display: flex; flex-direction: column; justify-content: center; margin: auto 0; }',
  '.hero-in { padding: 80px 20px 20px 20px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }'
);
code = code.replace(
  '.hero-brand { margin-top: 6vh; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }',
  '.hero-brand { margin-top: 4vh; margin-bottom: 80px; padding-bottom: 0; font-size: 0.65rem; text-align: center; }'
);

// 3. Image Height constraint so it never breaks the layout
code = code.replace(
  'style={{ width: "100%", maxWidth: "800px", minWidth: "280px", height: "auto", objectFit: "contain", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}',
  'style={{ width: "100%", maxWidth: "800px", height: "auto", maxHeight: "35vh", objectFit: "contain", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}'
);

// 4. Ensure .hero has overflow-y: auto so nothing is ever permanently hidden!
code = code.replace(
  'position: relative; min-height: 100vh; overflow: hidden;',
  'position: relative; min-height: 100vh; overflow-x: hidden; overflow-y: auto;'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated Hero layout to fit all screens!");
