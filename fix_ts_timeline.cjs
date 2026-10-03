const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

code = code.replace(/e: WheelEvent<HTMLDivElement>/g, 'e: any');

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log('Fixed TS error');
