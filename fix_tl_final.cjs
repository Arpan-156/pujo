const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// First, fix the imports
if (!code.includes("useEffect")) {
  code = code.replace("import { useRef } from 'react';", "import { useRef, useEffect } from 'react';");
}

// Next, add the scrollRef and useEffect inside Timeline component
const target = "export function Timeline() {";
const replacement = `export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 1;
      el.style.setProperty('--hp', progress.toString());
    };
    
    update();
    window.addEventListener('resize', update);
    
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Already scrolling horizontally
      if (e.deltaY === 0) return;
      
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      
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
  }, []);
`;

// Replace export function Timeline() {
// Note: if there is already a scrollRef in there, we might double inject if we're not careful, but there isn't.
code = code.replace(target, replacement);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Fixed Timeline properly.");
