const fs = require('fs');
let tsx = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// Remove onScroll
tsx = tsx.replace(
  /<div className="tl-scroll".*?onScroll=\{\(e\) => \{[\s\S]*?\}\}>/,
  `<div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways" style={{ position: 'relative', zIndex: 2 }}>`
);

fs.writeFileSync('src/sections/Timeline.tsx', tsx, 'utf8');

let css = fs.readFileSync('src/styles/sections.css', 'utf8');
css = css.replace(
  /transform: scaleX\(var\(--hp, 0\)\);/,
  `transform: scaleX(min(1, max(0, calc(var(--p, 0) * 1.9 - 0.3))));`
);

fs.writeFileSync('src/styles/sections.css', css, 'utf8');
console.log("Restored Timeline vertical reveal.");
