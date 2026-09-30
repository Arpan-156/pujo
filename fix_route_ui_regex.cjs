const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<h2[^>]*>3\. Preferred Vibe<\/h2>[\s\S]*?<\/div>\s*<\/div>\s*(<button className="rp-btn")/m;

const match = regex.exec(code);
if (match) {
  const newBlock = `
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>4. Transportation</h2>
                  <div className="rp-radio-grid">
                    {[
                      { v: 'walk', t: 'Walking', d: 'Foot-friendly routes between close pandals.' },
                      { v: 'toto', t: 'Toto / Rickshaw', d: 'Short hops between major drops.' },
                      { v: 'car', t: 'Personal Car', d: 'Routes prioritizing parking access.' }
                    ].map(o => (
                      <label key={o.v} className="rp-label">
                        <input type="radio" name="transport" value={o.v} checked={transport === o.v} onChange={() => setTransport(o.v)} />
                        <div className="rp-card">
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                $1`;
                
  const replaced = code.replace(regex, (fullMatch, btn) => {
    return fullMatch.replace(btn, `
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>4. Transportation</h2>
                  <div className="rp-radio-grid">
                    {[
                      { v: 'walk', t: 'Walking', d: 'Foot-friendly routes between close pandals.' },
                      { v: 'toto', t: 'Toto / Rickshaw', d: 'Short hops between major drops.' },
                      { v: 'car', t: 'Personal Car', d: 'Routes prioritizing parking access.' }
                    ].map(o => (
                      <label key={o.v} className="rp-label">
                        <input type="radio" name="transport" value={o.v} checked={transport === o.v} onChange={() => setTransport(o.v)} />
                        <div className="rp-card">
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                ` + btn);
  });
  
  fs.writeFileSync('src/pages/Pages.tsx', replaced, 'utf8');
  console.log("Successfully added Transportation block!");
} else {
  console.log("Regex did not match.");
}
