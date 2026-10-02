const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

code = code.replace(/const loop = \(now\) => \{/, 'const loop = (now: number) => {');
code = code.replace(/<ProgressIndicator dur=\{reduced \? 600 : 2600\} \/>/g, '<ProgressIndicator dur={2600} />');

fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
