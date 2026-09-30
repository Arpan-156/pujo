const fs = require('fs');

// Fix sections.css
let css = fs.readFileSync('src/styles/sections.css', 'utf8');
css = css.replace(
  /\.tl-line \{.*?\}/,
  ".tl-line { position: absolute; left: 0; right: 0; top: 19px; height: 2px; background: rgba(233, 181, 88, 0.18); z-index: 1; }"
);
css = css.replace(
  /\.tl-line span \{.*?\}/,
  ".tl-line span { display: block; height: 100%; background: linear-gradient(90deg, var(--gold), var(--sindoor)); transform-origin: left; transform: scaleX(min(1, max(0, calc(var(--p, 0) * 1.9 - 0.3)))); box-shadow: 0 0 10px var(--gold); }"
);
fs.writeFileSync('src/styles/sections.css', css, 'utf8');

// Fix Timeline.tsx
let tsx = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

const targetTsx = `export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      let progress = 1;
      if (maxScroll > 0) {
        progress = (el.scrollLeft + el.clientWidth) / el.scrollWidth;
      }
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
  }, []);`;

tsx = tsx.replace(targetTsx, `export function Timeline() {\n  const ref = useRef<HTMLElement>(null);\n  useScrollVar(ref);`);

// Need to also clean up the div onScroll
tsx = tsx.replace(/<div className="tl-scroll" ref=\{scrollRef\} tabIndex=\{0\} role="region" aria-label="Festival timeline, scroll sideways" style=\{\{ position: 'relative', zIndex: 2 \}\} onScroll=\{\(e\) => \{[\s\S]*?el\.style\.setProperty\('--hp', progress\.toString\(\)\);\n\s*\}\}>/, 
  `<div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways" style={{ position: 'relative', zIndex: 2 }}>`
);
tsx = tsx.replace(/<div className="tl-line" aria-hidden="true" style=\{\{ left: '30px', right: '30px' \}\}><span \/><\/div>/, 
  `<div className="tl-line" aria-hidden="true"><span /></div>`
);

fs.writeFileSync('src/sections/Timeline.tsx', tsx, 'utf8');
console.log("Reverted timeline.");
