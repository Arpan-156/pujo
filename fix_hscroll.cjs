const fs = require('fs');
let code = fs.readFileSync('src/sections/HScroll.tsx', 'utf8');

code = `import type { ReactNode } from 'react';

/**
 * Pure CSS native horizontal scroller.
 * Removed legacy scroll-jacking to fix accessibility and jumping bugs.
 */
export function HScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={\`hs native \${className}\`}>
      <div className="hs-sticky" style={{ display: 'block', position: 'relative', height: 'auto' }}>
        <div className="hs-track" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x proximity', paddingBottom: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/sections/HScroll.tsx', code, 'utf8');
console.log('Fixed HScroll to Native');
