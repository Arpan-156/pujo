const fs = require('fs');
let code = `import { useRef } from 'react';
import type { ReactNode, WheelEvent } from 'react';

/**
 * Pure CSS native horizontal scroller.
 * Fixes desktop mouse wheel accessibility.
 */
export function HScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (trackRef.current) {
      // If the user is scrolling vertically (mouse wheel), translate to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <div className={\`hs native \${className}\`}>
      <div className="hs-sticky" style={{ display: 'block', position: 'relative', height: 'auto' }}>
        <div 
          ref={trackRef}
          onWheel={handleWheel}
          className="hs-track" 
          style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x proximity', paddingBottom: '20px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/sections/HScroll.tsx', code, 'utf8');
console.log('Fixed HScroll wheel');
