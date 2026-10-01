const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

const replacement = `        <div className="hero-cta">
          <Link to="/pujas" className="btn elegant-primary" data-cursor="Explore">Pandals & Themes <span className="arrow">&rarr;</span></Link>
          <Link to="/featured" className="btn elegant-glass" data-cursor="Open">Featured Pandals <span className="arrow">&rarr;</span></Link>
          <Link to="/map" className="btn elegant-glass" data-cursor="Open">Pandal Map <span className="arrow">&rarr;</span></Link>
        </div>
        <p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>
      </div>`;

code = code.replace(/<div className="hero-cta">[\s\S]*?<\/div>\s*<\/div>/, replacement);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Added hero-brand back successfully!");
