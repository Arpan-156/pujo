const fs = require('fs');
let code = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

const regex = /<Link to=\{\`\/puja\/\$\{f\.slug\}\`\} className="fs-link">[\s\S]*?Explore Pandal <ArrowRight size=\{20\} \/>[\s\S]*?<\/Link>/;

const newLinks = `<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <Link to={\`/puja/\${f.slug}\`} className="fs-link" style={{ margin: 0 }}>
                      Explore Pandal <ArrowRight size={20} />
                    </Link>
                    {f.puja.map?.lat && f.puja.map?.lng && (
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${f.puja.map.lat},\${f.puja.map.lng}\`, '_blank', 'noopener,noreferrer'); }} className="fs-link" style={{ margin: 0, background: 'rgba(0,0,0,0.5)', borderColor: 'var(--gold)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        Get Directions
                      </button>
                    )}
                  </div>`;

code = code.replace(regex, newLinks);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', code, 'utf8');
console.log('Added Get Directions to FeaturedShowcase');
