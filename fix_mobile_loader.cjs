const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const subComponent = `
function ProgressIndicator({ dur }: { dur: number }) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const loop = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dur]);

  return (
    <div className="loader-bar-wrap">
      <p className="loader-pct">{pct}%</p>
      <div className="loader-bar" aria-hidden="true"><span style={{ transform: \`scaleX(\${pct / 100})\` }} /></div>
    </div>
  );
}

export function Loader({ onDone }: { onDone: () => void }) {
`;

// Extract Loader rewriting
code = code.replace(
  'export function Loader({ onDone }: { onDone: () => void }) {',
  subComponent
);

code = code.replace(
  'const [pct, setPct] = useState(0);',
  ''
);

code = code.replace(
  'setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));',
  ''
);

code = code.replace(
  /<div className="loader-bar-wrap">[\s\S]*?<\/div>\s*<\/div>/,
  '<ProgressIndicator dur={reduced ? 600 : 2600} />\n        </div>'
);

// We need to make sure React is available. The file has `import { useState, useEffect, useRef } from 'react';`
// So we can use `useState` and `useEffect` directly instead of `React.useState`.
code = code.replace(/React\.useState/g, 'useState');
code = code.replace(/React\.useEffect/g, 'useEffect');

fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log('Fixed loader');
