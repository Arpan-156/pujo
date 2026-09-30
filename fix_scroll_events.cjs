const fs = require('fs');
let code = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

// Fix wheel
code = code.replace(
  "const handleWheel = (e: WheelEvent) => {",
  "const handleWheel = (e: WheelEvent) => {\n      e.preventDefault();"
);
code = code.replace(
  "if (e.deltaY > 0) return; // Allow scrolling down in footer\n          if (inFooter.scrollTop > 0) return; // Allow scrolling up if not at top",
  "if (e.deltaY > 0) { e.stopPropagation(); return; }\n          if (inFooter.scrollTop > 0) { e.stopPropagation(); return; }"
);

// Fix touchmove
code = code.replace(
  "const handleTouchMove = (e: TouchEvent) => {",
  "const handleTouchMove = (e: TouchEvent) => {\n      if (!e.target || !(e.target as HTMLElement).closest('.fs-footer-wrap')) e.preventDefault();"
);
code = code.replace(
  "if (dy > 0) return; // Allow swiping up (scrolling down) in footer\n          if (inFooter.scrollTop > 0) return; // Allow swiping down if not at top",
  "if (dy > 0) { e.stopPropagation(); return; }\n          if (inFooter.scrollTop > 0) { e.stopPropagation(); return; }"
);

// Fix touch start logic so it resets properly
code = code.replace(
  "const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };",
  "const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; touchProcessed = false; };\n    let touchProcessed = false;"
);

// Fix touch dy trigger so it doesn't rapidly fire multiple times
code = code.replace(
  "if (Math.abs(dy) > 50) {",
  "if (Math.abs(dy) > 50 && !touchProcessed) {\n          touchProcessed = true;"
);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', code, 'utf8');
console.log("Fixed touch and wheel events in FeaturedShowcase.");
