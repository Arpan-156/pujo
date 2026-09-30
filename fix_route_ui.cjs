const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Add state
code = code.replace(
  /const \[vibe, setVibe\] = useState\('accessible'\);/,
  "const [vibe, setVibe] = useState('accessible');\n  const [transport, setTransport] = useState('toto');"
);

// 2. Add to transit logic
const oldTransitLogic = `    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 10 mins';
      if (i === finalPandals.length - 1) transit = 'End of route';
      else if (Math.random() > 0.5) transit = 'Toto ride (10 mins)';`;
      
const newTransitLogic = `    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 10 mins';
      if (i === finalPandals.length - 1) transit = 'End of route';
      else if (transport === 'walk') transit = 'Walk (10-15 mins)';
      else if (transport === 'car') transit = 'Drive / Park (15 mins)';
      else transit = 'Toto ride (10 mins)';`;

code = code.replace(oldTransitLogic, newTransitLogic);

// 3. Add to UI
const oldVibeBlock = `                      </label>
                    ))}
                  </div>
                </div>

                <button type="button" className="rp-btn" onClick={generate}>Generate Route</button>`;

const newVibeBlock = `                      </label>
                    ))}
                  </div>
                </div>

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

                <button type="button" className="rp-btn" onClick={generate}>Generate Route</button>`;

code = code.replace(oldVibeBlock, newVibeBlock);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Added Transport options to Route Planner.");
