const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /\.fn-wrap\.closing \{/,
  `.menu-open .fn-wrap, @media print { .fn-wrap { display: none !important; } }\n        @media print { .fn-wrap { display: none !important; } }\n        .menu-open .fn-wrap { display: none !important; }\n        .fn-wrap.closing {`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed notification visibility');
