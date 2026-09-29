const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Revert the wrong replacement
code = code.replace(
  '.surv-card {\n                opacity: 1 !important; visibility: visible !important; display: block !important;\n            background: linear-gradient',
  '.surv-card {\n            background: linear-gradient'
);

// Apply specifically to print media block
code = code.replace(
  '.surv-card {\n                  border: 1px solid #999 !important;',
  '.surv-card {\n                  opacity: 1 !important; display: flex !important; flex-direction: column !important;\n                  border: 1px solid #999 !important;'
);

// Also remove `animation: none !important;` globally which might cause issues, and target it properly.
// Wait, global `animation: none !important;` in print is actually okay IF we set `opacity: 1 !important;` explicitly on the elements that were hidden.
// But better yet, we can override `.surv-card` opacity.
code = code.replace(
    'animation: none !important;',
    'animation: none !important; opacity: 1 !important;'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
