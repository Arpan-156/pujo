const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const essentialStart = `<div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>`;

const helplinesEnd = `</a>
                  </div>
                </li>
              </ul>
            </div>`;

// If we haven't wrapped it yet:
if (!code.includes('{!isHome && (<>')) {
  // Replace essentialStart with `{!isHome && (<>\n` + essentialStart
  code = code.replace(essentialStart, "{!isHome && (<>\n              " + essentialStart);
  
  // Replace helplinesEnd with helplinesEnd + `\n            </>)}`
  code = code.replace(helplinesEnd, helplinesEnd + "\n            </>)}");
}

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Wrapped blocks with !isHome properly');
