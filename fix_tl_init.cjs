const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

const replacement = `
  export function Timeline() {
    const ref = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    useScrollVar(ref);
    
    // Initialize and handle resize for the progress bar
    import_useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const update = () => {
        const maxScroll = el.scrollWidth - el.clientWidth;
        const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 1; // If it fits entirely, it's 100% full!
        el.style.setProperty('--hp', progress.toString());
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);
`;

code = code.replace(
  "export function Timeline() {\n    const ref = useRef<HTMLElement>(null);\n    useScrollVar(ref);",
  "import { useEffect as import_useEffect } from 'react';\n" + replacement
);

code = code.replace(
  "<div className=\"tl-scroll\" tabIndex={0} role=\"region\"",
  "<div className=\"tl-scroll\" ref={scrollRef} tabIndex={0} role=\"region\""
);

// We also need to fix the onScroll handler to use 1 if maxScroll <= 0
code = code.replace(
  "const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;",
  "const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 1;"
);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log("Fixed Timeline progress bar init.");
