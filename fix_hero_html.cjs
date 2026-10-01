const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '          </div>\n        <p className="hero-brand">Presented by <span style={{ color: \'#fff\' }}>Burdwan Capturers Official</span></p>\n        </div>\n        \n      </section>',
  '          </div>\n        </div>\n        <p className="hero-brand">Presented by <span style={{ color: \'#fff\' }}>Burdwan Capturers Official</span></p>\n        \n      </section>'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Moved hero-brand outside hero-in");
