const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<h3 className="plist-name">\{p\.name\}<\/h3>\s*<\/div>/g;
const injectedRow = `<h3 className="plist-name" style={{ marginBottom: '8px' }}>{p.name}</h3>
                      {userState[p.slug]?.rating > 0 && (
                        <div style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{'?'.repeat(userState[p.slug].rating)}{'?'.repeat(5 - userState[p.slug].rating)}</span>
                          <span style={{ color: 'var(--mute)', letterSpacing: 'normal', fontSize: '0.75rem' }}>Your Rating</span>
                        </div>
                      )}
                    </div>`;

code = code.replace(regex, injectedRow);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("PujasPage updated with ratings.");
