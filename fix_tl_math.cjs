const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// The progress should represent the right edge of the viewport relative to the track!
// At scrollLeft = 0, the right edge is at `clientWidth`.
// So progress = (scrollLeft + clientWidth) / scrollWidth.
// This way, the line is drawn exactly up to the right edge of the screen!
// But wait, we want the line to only fill up to the items we've seen.
// So progress = (el.scrollLeft + el.clientWidth) / el.scrollWidth;

const newUpdate = `
    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      let progress = 1;
      if (maxScroll > 0) {
        // We want the line to fill up to the current right edge of the viewport
        progress = (el.scrollLeft + el.clientWidth) / el.scrollWidth;
      }
      el.style.setProperty('--hp', progress.toString());
    };
`;

code = code.replace(
  /const update = \(\) => \{[\s\S]*?el\.style\.setProperty\('--hp', progress\.toString\(\)\);\n    \};/,
  newUpdate.trim()
);

// We also need to fix the onScroll handler
const newOnScroll = `
        const maxScroll = el.scrollWidth - el.clientWidth;
        let progress = 1;
        if (maxScroll > 0) {
          progress = (el.scrollLeft + el.clientWidth) / el.scrollWidth;
        }
        el.style.setProperty('--hp', progress.toString());
`;

code = code.replace(
  /const maxScroll = el\.scrollWidth - el\.clientWidth;\n\s*const progress = maxScroll > 0 \? el\.scrollLeft \/ maxScroll : 1;\n\s*el\.style\.setProperty\('--hp', progress\.toString\(\)\);/,
  newOnScroll.trim()
);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Fixed timeline math.");
