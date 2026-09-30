const fs = require('fs');

let code = fs.readFileSync('src/data/content.ts', 'utf8');

// Replace curzon visual
code = code.replace(
  /visual: \{ art: 'gate', seed: 401, tone: 'dusk', hue: 14 \}/,
  "visual: { art: 'gate', seed: 0, src: '/photos/curzon.jpg' }"
);

// Replace overbridge visual
code = code.replace(
  /visual: \{ art: 'bridge', seed: 403, tone: 'night', hue: 18 \}/,
  "visual: { art: 'bridge', seed: 0, src: '/photos/overbridge.jpg' }"
);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Updated landmarks in content.ts");
