const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

// Find the start of the return statement
const mapStart = c.indexOf('{/* Slides 1 to N: Pandals */}');

const newBottom = `{/* Slides 1 to N: Pandals */}
        {featuredPujas.map((f, i) => {
          const slideIndex = i + 1;
          const isActive = active === slideIndex;
          return (
            <div key={f.slug} className={\`fs-slide \${isActive ? 'fs-active' : ''}\`}>
              <div className="fs-bg">
                <Photo v={f.puja.heroImage} alt={f.puja.name} />
                <div className="fs-overlay" />
              </div>
              <div className="fs-content">
                <div className="fs-glass">
                  <div className="fs-num">{pad2(i + 1)}</div>
                  <h2 className="fs-name">{f.puja.name}</h2>
                  <p className="fs-theme">{f.puja.theme}</p>
                  <p className="fs-tag">"{f.tagline}"</p>
                  <p className="fs-note">{f.note}</p>
                  <Link to={\`/pujo/\${f.slug}\`} className="fs-link">
                    Explore Pandal <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Slide */}
        <div className={\`fs-slide \${active === total - 1 ? 'fs-active' : ''}\`} style={{ background: 'var(--ink)' }}>
          <div className="fs-footer-wrap" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

c = c.substring(0, mapStart) + newBottom;
fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

