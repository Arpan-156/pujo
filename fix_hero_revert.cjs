const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Restore .hero-brand CSS
code = code.replace(
  ".hero-brand {\n            position: absolute; bottom: 85px; left: 0; right: 0; margin: 0; padding: 0; text-align: center;",
  ".hero-brand {\n            position: relative; margin-top: 6vh; margin-bottom: 60px;"
);

// 2. Restore Mobile CSS
code = code.replace(
  ".hero-brand { bottom: 85px; margin: 0; padding: 0; font-size: 0.65rem; text-align: center; }",
  ".hero-brand { margin-top: 6vh; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }"
);

// 3. Move <p className="hero-brand"> back inside <div className="hero-in">
const brandHTML = `<p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>`;

// First, remove it from the end
code = code.replace(`\n      ${brandHTML}\n        </section>`, `\n        </section>`);

// Next, inject it back after hero-cta
code = code.replace(
  `          </div>\n          \n        </div>\n        \n        </section>`,
  `          </div>\n          <p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>\n        </div>\n        \n      </section>`
);

// 4. To prevent overlap, we give .hero-in a padding-bottom
code = code.replace(
  `.hero-in { \n            position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; \n            width: 100%; max-width: 1200px; padding: 0 40px; margin-top: 10vh;\n        }`,
  `.hero-in { \n            position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; \n            width: 100%; max-width: 1200px; padding: 0 40px 100px 40px; margin-top: 10vh;\n        }`
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Reverted hero-brand and applied padding instead.");
