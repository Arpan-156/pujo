const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');
c = c.replace(/<\/div>\s*<\/div>\s*\);\s*\}/s, `
        {/* Footer Slide */}
        <div className={\`fs-slide \${active === total - 1 ? 'fs-active' : ''}\`} style={{ background: 'var(--ink)' }}>
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}`);
fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

