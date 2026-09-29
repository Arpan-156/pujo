const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// Add an onScroll handler to tl-scroll to calculate horizontal scroll progress
const oldScrollDiv = /<div className="tl-scroll" tabIndex=\{0\} role="region" aria-label="Festival timeline, scroll sideways" style=\{\{ position: 'relative', zIndex: 2 \}\}>/;

const newScrollDiv = `<div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways" style={{ position: 'relative', zIndex: 2 }} onScroll={(e) => {
        const el = e.currentTarget;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
        el.style.setProperty('--hp', progress.toString());
      }}>`;

code = code.replace(oldScrollDiv, newScrollDiv);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Fixed Timeline horizontal scroll progress.");
