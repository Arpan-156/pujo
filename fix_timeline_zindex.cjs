const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

code = code.replace(
  "<div className=\"wrap\">",
  "<div className=\"wrap\" style={{ position: 'relative', zIndex: 1 }}>"
);

code = code.replace(
  "<div className=\"tl-scroll\" tabIndex={0} role=\"region\" aria-label=\"Festival timeline, scroll sideways\">",
  "<div className=\"tl-scroll\" tabIndex={0} role=\"region\" aria-label=\"Festival timeline, scroll sideways\" style={{ position: 'relative', zIndex: 2 }}>"
);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Fixed Timeline z-index for particles.");
