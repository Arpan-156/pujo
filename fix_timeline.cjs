const fs = require('fs');
let code = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

// Add WheelEvent import
code = code.replace(/import \{ Reveal, RevealText \} from '\.\.\/components\/fx';/, `import { Reveal, RevealText } from '../components/fx';\nimport type { WheelEvent } from 'react';`);

// Add onWheel handler to tl-scroll
code = code.replace(/<div className="tl-scroll"/, `<div className="tl-scroll" onWheel={(e: WheelEvent<HTMLDivElement>) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }
      }}`);

fs.writeFileSync('src/sections/Timeline.tsx', code, 'utf8');
console.log('Fixed Timeline scroll');
