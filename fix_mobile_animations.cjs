const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /import \{ Particles, Alpana, PujaScenario \} from '\.\.\/components\/fx';/,
  "import { Particles, Alpana, PujaScenario } from '../components/fx';\nimport { useIsMobile } from '../lib/motion';"
);

code = code.replace(
  /export function PujaMap\(\{ className = '' \}: \{ className\?: string \}\) \{/,
  "export function PujaMap({ className = '' }: { className?: string }) {\n  const mobile = useIsMobile();"
);

code = code.replace(
  /<Particles kind="embers" count=\{45\} \/>\s*<div style=\{\{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0\.15, pointerEvents: 'none' \}\}>.*<\/div>\s*<PujaScenario \/>/,
  `{!mobile && (
          <>
            <Particles kind="embers" count={45} />
            <div style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }}><Alpana size={800} spin /></div>
            <PujaScenario />
          </>
        )}`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile animations');
