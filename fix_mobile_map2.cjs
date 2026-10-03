const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /@media \(max-width: 900px\) \{[\s\S]*?\}/;
const newMedia = `@media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; gap: 20px; padding-top: calc(var(--safe-t) + 90px) !important; }
          .pmap-new-list { height: auto !important; max-height: none !important; overflow-y: visible !important; flex: none !important; }
          .pmap-map-container { height: 50vh; min-height: 380px; flex-shrink: 0; }
        }`;

code = code.replace(regex, newMedia);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile map layout correctly');
