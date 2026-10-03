const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Strip out ALL media queries up to </style>
const regex = /@media \(max-width: 900px\) \{[\s\S]*?<\/style>/;

const cleanCss = `@media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; gap: 20px; padding-top: calc(var(--safe-t) + 90px) !important; }
          .pmap-new-list { height: auto !important; max-height: none !important; overflow-y: visible !important; flex: none !important; }
          /* Fixed pixel height prevents aggressive layout shifting (jumping) when mobile browser address bar hides/shows */
          .pmap-map-container { height: 420px; flex-shrink: 0; }
        }
      \`}</style>`;

code = code.replace(regex, cleanCss);
fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Cleaned up mobile css');
