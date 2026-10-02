const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');

code = code.replace(
  /@keyframes puja-flicker \{[\s\S]*?\}/,
  `@keyframes puja-flicker {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1) translateY(-1px); opacity: 0.8; }
          }`
);

fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
console.log('Fixed drop-shadow lag');
