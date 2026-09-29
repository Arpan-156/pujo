const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

code = code.replace(
  ".tl-item { position: relative; padding-top: 34px; scroll-snap-align: center; }",
  ".tl-item { position: relative; padding-top: 34px; scroll-snap-align: start; scroll-margin-inline-start: 40px; }"
);

// I will add scroll-margin-inline-start: 40px to .tl-item. This explicitly tells the browser: "When you snap this item to the start of the scroll container, leave 40px of space!"
fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed Timeline scroll snapping to start with safe margin.");
