const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

const wheelCode = `
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Already scrolling horizontally
        if (e.deltaY === 0) return;
        
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return; // No need to scroll
        
        // If we are at the edges, let the page scroll naturally
        if (e.deltaY < 0 && el.scrollLeft <= 0) return;
        if (e.deltaY > 0 && el.scrollLeft >= maxScroll) return;
        
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => {
        window.removeEventListener('resize', update);
        el.removeEventListener('wheel', onWheel);
      };
`;

code = code.replace(
  "return () => window.removeEventListener('resize', update);",
  wheelCode
);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Added mouse wheel horizontal scroll to Timeline.");
