const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Add imports back
code = code.replace(
  "import { Photo } from '../components/Art';",
  "import { Photo, Procession } from '../components/Art';"
);
code = code.replace(
  "import { Particles } from '../components/fx';",
  "import { Particles, LaalPaar } from '../components/fx';"
);

// Add components at the bottom
code = code.replace(
  "      </div>\n    </section>",
  "      </div>\n      <Procession />\n      <LaalPaar className=\"hero-paar\" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 5 }} />\n    </section>"
);

// Fix the CSS to spread things out better on mobile
code = code.replace(
  ".hero-brand { margin-top: 4vh; padding-bottom: 80px; font-size: 0.65rem; }",
  ".hero-brand { margin-top: auto; padding-top: 8vh; padding-bottom: 40px; font-size: 0.65rem; }"
);

// Make hero-in min-height on mobile so margin-top: auto works
code = code.replace(
  ".hero-in { padding: 0 20px; margin-top: 5vh; }",
  ".hero-in { padding: 0 20px; margin-top: 5vh; min-height: 80vh; display: flex; flex-direction: column; justify-content: flex-start; }"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Filled blank space with Procession and LaalPaar.");
