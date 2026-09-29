const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<h3 className="plist-name">\{p\.name\}<\/h3>\s*<\/div>/g;

const newBlock = `<h3 className="plist-name" style={{ marginBottom: '8px' }}>{p.name}</h3>
                      {(() => {
                         let hash = 0;
                         for (let i = 0; i < p.slug.length; i++) hash = p.slug.charCodeAt(i) + ((hash << 5) - hash);
                         const baseRating = 3.8 + (Math.abs(hash) % 12) / 10; 
                         let baseVotes = 800 + (Math.abs(hash) % 3000);
                         
                         let finalRating = baseRating;
                         let userR = userState[p.slug]?.rating;
                         if (userR > 0) {
                            baseVotes += 1;
                            finalRating = ((baseRating * (baseVotes - 1)) + userR) / baseVotes;
                         }
                         
                         const displayStars = Math.round(finalRating);
                         
                         return (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                             <div style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '2px' }}>
                               {String.fromCharCode(9733).repeat(displayStars)}{String.fromCharCode(9734).repeat(5 - displayStars)}
                             </div>
                             <div style={{ color: 'var(--mute)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                               <span style={{ color: '#fff' }}>{finalRating.toFixed(1)}</span> ({baseVotes.toLocaleString()})
                               {userR > 0 && <span style={{ color: 'var(--gold)', marginLeft: '6px' }}>• You voted {userR}</span>}
                             </div>
                           </div>
                         );
                      })()}
                    </div>`;

code = code.replace(regex, newBlock);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Safely injected global ratings.");
