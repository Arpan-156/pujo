const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// I will wrap the entire bottom section in `{!isHome && (`
code = code.replace(
  /<div className="wrap" style=\{\{ marginTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 10 \}\}>/,
  `{!isHome && (
          <div className="wrap" style={{ marginTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 10 }}>`
);

// Close the wrapper at the very end of the section (just before `</section>`)
code = code.replace(
  /<\/div>\s*<\/section>/,
  `</div>\n          )}
      </section>`
);

// Now I also need to remove the internal `{!isHome && (` that wraps the Essential Services and Helplines, since the outer wrapper handles it.
code = code.replace(
  /\{!isHome && \(\s*<>\s*<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(30, 20, 20, 0\.8\)/,
  `<div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8)`
);

code = code.replace(
  /<\/ul>\s*<\/div>\s*<\/>\s*\)\}/,
  `</ul>\n                  </div>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Moved all dashboard cards exclusively to Map page');
