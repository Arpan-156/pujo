const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /\.pmap-map-container \{ width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var\(--line\); background: #eee; z-index: 1; display: flex; flex-direction: column; \}/;

const replacement = `.pmap-map-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #eee; z-index: 1; display: flex; flex-direction: column; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0); } /* Added hardware acceleration for iOS */`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed iOS map performance');
