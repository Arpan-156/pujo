const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const progressIndicator = `
function ProgressIndicator({ dur }: { dur: number }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
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

code = code.replace(
  'export function Loader({ onDone }: { onDone: () => void }) {',
  progressIndicator
);

code = code.replace(
  'const [pct, setPct] = useState(0);',
  ''
);

code = code.replace(
  'setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));',
  ''
);

const barWrapRegex = /<div className="loader-bar-wrap">\s*<p className="loader-pct">\{pct\}%<\/p>\s*<div className="loader-bar" aria-hidden="true"><span style=\{\{ transform: `scaleX\(\$\{pct \/ 100\}\)` \}\} \/><\/div>\s*<\/div>/;

code = code.replace(
  barWrapRegex,
  '<ProgressIndicator dur={reduced ? 600 : 2600} />'
);

fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log('Fixed Loader performance');
