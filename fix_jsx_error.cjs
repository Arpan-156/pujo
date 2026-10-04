const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// I'll manually replace the broken block
code = code.replace(
  /\{geo\.status === 'loading' \? 'Locating\.\.\.' : 'Use My Location'\}\s*<\/button>\s*<\/>\)\}\s*<\/div>/,
  `{geo.status === 'loading' ? 'Locating...' : 'Use My Location'}
                  </button>
                )}
            </div>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed broken JSX');
