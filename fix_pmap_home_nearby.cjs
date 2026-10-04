const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// The code looks like this:
// {!isHome && (
//   <div className="wrap" style={{ marginTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 10 }}>
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
// ...
//     </div>
//   )}
// </section>

// I will just replace the `{!isHome && (` at the start of that wrap with nothing,
// and instead wrap the elements *after* the first grid item (Nearby Pandals) with `{!isHome && (`.

code = code.replace(
  /\{!isHome && \(\s*<div className="wrap" style=\{\{ marginTop: '40px'/,
  `<div className="wrap" style={{ marginTop: '40px'`
);

// Add the inner wrapper after the "Nearby Pandals" block.
// The Nearby Pandals block ends with: `</div>\n\n                  <div style={{ background: 'linear-gradient(145deg, rgba(20, 30, 20, 0.8) 0%, rgba(10, 15, 10, 0.9) 100%)'` (This is the start of Visiting Spots)
// I will just look for `Visiting Spots` and inject `{!isHome && (<>` right before its parent div.

const visitingSpotsMarker = `<div style={{ background: 'linear-gradient(145deg, rgba(20, 30, 20, 0.8) 0%, rgba(10, 15, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ color: '#10B981', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                       Visiting Spots`;

code = code.replace(visitingSpotsMarker, "{!isHome && (<>\n                  " + visitingSpotsMarker);

// And close it at the end
code = code.replace(
  /<\/ul>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/section>/,
  "</ul>\n                  </div>\n                  </>)}\n            </div>\n          </div>\n      </section>"
);


fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Restored Nearby Pandals to Home page');
