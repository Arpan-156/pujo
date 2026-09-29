const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// 1. Remove the particles
code = code.replace(
  /<Particles kind="petals" count=\{50\} className="tl-particles" \/>\s*/g,
  ""
);

// 2. Ensure the top bar is perfectly styled.
// The onScroll handler is already there from my previous fix. Let's make sure it's correct.
// We'll also add an inline style to tl-list to ensure the first and last items have safe spacing.
code = code.replace(
  "<ol className=\"tl-list\">",
  "<ol className=\"tl-list\" style={{ padding: '0 20px' }}>"
);

code = code.replace(
  "<div className=\"tl-line\" aria-hidden=\"true\"><span /></div>",
  "<div className=\"tl-line\" aria-hidden=\"true\" style={{ left: '30px', right: '30px' }}><span /></div>"
);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Timeline React fixed.");
