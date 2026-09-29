const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Update CSS
code = code.replace(
  "position: absolute; bottom: 40px;",
  "position: relative; margin-top: 6vh;"
);

// Move the brand paragraph inside .hero-in
// Right now it's:
// </div>
// <p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers</span></p>
// </section>

code = code.replace(
  "      </div>\n      \n      <p className=\"hero-brand\">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers</span></p>\n      \n    </section>",
  "        <p className=\"hero-brand\">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers</span></p>\n      </div>\n    </section>"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed layout overlap on mobile.");
