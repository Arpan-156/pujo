const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

const targetStr = `<p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>`;

// Remove ALL instances of hero-brand
code = code.split(targetStr).join('');

// Re-inject it properly inside hero-in
const insertionPoint = `          </div>\n        </div>`;
code = code.replace(
  `          </div>\n        </div>\n        \n        </section>`,
  `          </div>\n          ${targetStr}\n        </div>\n        \n      </section>`
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Moved hero-brand successfully!");
