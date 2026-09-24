const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

c = c.replace(
`                  <Link to={\`/pujo/\${f.slug}\`} className="fs-link">
                    Explore Pandal <ArrowRight size={20} />
                  </Link>
                </div>
              
        {/* Footer Slide */}
        <div className={\`fs-slide \${active === total - 1 ? 'fs-active' : ''}\`} style={{ background: 'var(--ink)' }}>
          <div className="fs-footer-wrap" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
}`,
`                  <Link to={\`/pujo/\${f.slug}\`} className="fs-link">
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
}`
);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

