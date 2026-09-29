const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

// Change scroll-snap-align to center so cards are always centered in the viewport
code = code.replace(
  ".tl-item { position: relative; padding-top: 34px; scroll-snap-align: start; }",
  ".tl-item { position: relative; padding-top: 34px; scroll-snap-align: center; }"
);

// Add scroll-padding just in case
code = code.replace(
  ".tl-scroll { margin-top: clamp(40px, 8vh, 80px); margin-top: clamp(40px, 8svh, 80px); overflow-x: auto; padding: 0 var(--gut) 40px; scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x mandatory; }",
  ".tl-scroll { margin-top: clamp(40px, 8vh, 80px); margin-top: clamp(40px, 8svh, 80px); overflow-x: auto; padding: 0 var(--gut) 40px; scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x mandatory; scroll-padding-inline: var(--gut); }"
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed Timeline scroll snapping.");
