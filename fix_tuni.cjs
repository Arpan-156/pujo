const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');

// Replace the tuni-flash animation and drop-shadows to be much more performant
const oldTuniStyle = /<style>\{`[\s\S]*?`\}<\/style>/;
const newTuniStyle = `<style>{\`
          .tuni-wrapper svg { max-width: none !important; }
          .tuni-bulb-svg {
            animation: tuni-flash 1.5s infinite alternate ease-in-out;
            will-change: opacity;
          }
          .tuni-c0 { fill: #ff3b3b; }
          .tuni-c1 { fill: #3b82f6; }
          .tuni-c2 { fill: #10b981; }
          .tuni-c3 { fill: #f59e0b; }
          .tuni-c4 { fill: #ec4899; }
          
          /* Performant pulsing using only opacity */
          @keyframes tuni-flash {
            0%, 20% { opacity: 0.2; }
            80%, 100% { opacity: 1; }
          }
          
          @media (max-width: 768px) {
            .tuni-wrapper svg {
              max-width: none !important;
              transform: translateX(-50%) scale(0.6) !important;
              transform-origin: center top !important;
            }
          }
        \`}</style>`;

code = code.replace(oldTuniStyle, newTuniStyle);

fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
console.log("Optimized TuniLights performance.");
