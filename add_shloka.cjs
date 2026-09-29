const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add import
if (!code.includes('import { DailyShloka }')) {
    code = code.replace(
        `import { PujaMap } from '../sections/PujaMap';`,
        `import { PujaMap } from '../sections/PujaMap';\nimport { DailyShloka } from '../sections/DailyShloka';`
    );
}

// Add component to Home
if (!code.includes('<DailyShloka />')) {
    code = code.replace(
        `<Countdown />\n      <Manifesto />`,
        `<Countdown />\n      <DailyShloka />\n      <Manifesto />`
    );
}

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
