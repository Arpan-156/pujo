const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /\.menu-open \.fn-wrap, @media print \{ \.fn-wrap \{ display: none !important; \} \}\\n        @media print \{ \.fn-wrap \{ display: none !important; \} \}\\n        \.menu-open \.fn-wrap \{ display: none !important; \}\\n        \.fn-wrap\.closing \{/,
  `@media print { .fn-wrap { display: none !important; } }
        :global(.menu-open) .fn-wrap { display: none !important; }
        .fn-wrap.closing {`
);
// Actually, styled-jsx or standard React style block? It's just a <style> string.
// So global isn't needed.

code = code.replace(/\.menu-open \.fn-wrap, @media print \{ \.fn-wrap \{ display: none !important; \} \}\n        @media print \{ \.fn-wrap \{ display: none !important; \} \}\n        \.menu-open \.fn-wrap \{ display: none !important; \}/g, `@media print { .fn-wrap { display: none !important; } }\n        .menu-open .fn-wrap { display: none !important; }`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Cleaned up CSS');
