const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /@media \(max-width: 900px\) \{[\s\S]*?\}/;
const newMedia = `@media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column; gap: 20px; padding-top: calc(var(--safe-t) + 80px) !important; }
          .pmap-new-list { height: auto !important; max-height: 45vh !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch; flex: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
          .pmap-map-container { height: 50vh; min-height: 400px; flex-shrink: 0; }
        }`;

code = code.replace(regex, newMedia);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile map layout');
