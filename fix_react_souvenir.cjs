const fs = require('fs');
let code = fs.readFileSync('src/pages/SouvenirPage.tsx', 'utf8');

// The new cinematic styles
const newStyles = `
        .souvenir-page { min-height: 100vh; position: relative; padding: clamp(80px, 15vh, 120px) 20px; overflow-x: hidden; color: #fff; background-color: #050203; }
        .marigold-canvas { position: fixed; inset: 0; z-index: -1; pointer-events: none; }
        .souvenir-wrap { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 60px; align-items: center; position: relative; z-index: 10; }
        @media (min-width: 1024px) { .souvenir-wrap { flex-direction: row; align-items: flex-start; } }
        
        .souv-controls { width: 100%; max-width: 400px; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .souv-title { font-family: 'Cinzel', var(--f-display); font-size: 2.2rem; background: linear-gradient(135deg, #f2c94c, #f2994a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; font-weight: bold; }
        .souv-desc { color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-bottom: 32px; font-weight: 300; }
        
        .souv-label { display: block; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 8px; }
        .souv-input, .souv-select { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; color: #fff; margin-bottom: 24px; outline: none; transition: border-color 0.3s; }
        .souv-input:focus, .souv-select:focus { border-color: var(--gold); }
        .souv-select option { background: #050203; }
        
        .souv-btn { width: 100%; padding: 16px; background: linear-gradient(90deg, #f2c94c, #f2994a); color: #000; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
        .souv-btn:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(242,201,76,0.3); }
        
        .souv-card-section { width: 100%; display: flex; flex-direction: column; align-items: center; }
        
        .souvenir-card {
            background-image: url('https://images.unsplash.com/photo-1601633519890-48ee7fcb51cb?q=80&w=800&auto=format&fit=crop');
            background-size: cover; background-position: center; border-radius: 16px;
            box-shadow: 0 40px 80px rgba(0,0,0,0.9), inset 0 0 100px rgba(0,0,0,0.8);
            position: relative; overflow: hidden; width: 100%; max-width: 450px; aspect-ratio: 3/4;
            transform: translateY(50px); opacity: 0; transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .souvenir-card.revealed { transform: translateY(0); opacity: 1; }
        
        .glass-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%); backdrop-filter: blur(4px); z-index: 1; }
        .card-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 32px; text-align: center; }
        
        .souv-card-sup { color: rgba(255,255,255,0.8); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.4em; font-weight: 300; margin-bottom: 8px; }
        .souv-card-title { font-family: 'Cinzel', var(--f-display); font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: bold; color: #fff; letter-spacing: 0.1em; margin-bottom: 16px; }
        .souv-card-line { width: 40px; height: 1px; background: rgba(255,255,255,0.3); margin: 0 auto; }
        
        .card-mid { margin-top: auto; margin-bottom: 48px; }
        .souv-card-pre { color: #f2c94c; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; font-weight: bold; }
        .souv-card-name { font-family: var(--f-serif); font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #fff; drop-shadow: 0 4px 10px rgba(0,0,0,0.8); margin-bottom: 24px; min-height: 50px; line-height: 1.1; }
        .souv-card-msg { color: rgba(255,255,255,0.6); font-size: 0.85rem; line-height: 1.6; font-weight: 300; max-width: 280px; margin: 0 auto; }
        
        .cyber-token { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-left: 3px solid #f2c94c; border-right: 1px solid rgba(255,255,255,0.1); border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 16px 24px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; }
        .badge-sup { font-size: 0.6rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; opacity: 0.5; margin-bottom: 4px; }
        .badge-serial { font-family: monospace; font-size: 1rem; color: #f2c94c; font-weight: bold; letter-spacing: 0.15em; }
        
        .dl-btn { margin-top: 32px; padding: 12px 32px; border: 1px solid rgba(255,255,255,0.3); color: #fff; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 50px; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); cursor: pointer; transition: all 0.3s; opacity: 0; pointer-events: none; }
        .dl-btn.revealed { opacity: 1; pointer-events: auto; }
        .dl-btn:hover { background: #fff; color: #000; }
`;

// Extract everything from <style> to </style>
const styleRegex = /<style>\{`[\s\S]*?`\}<\/style>/;
code = code.replace(styleRegex, `<style>{\`${newStyles}\`}</style>`);

// Extract everything from <div className="souv-controls"> down to </button>
const jsxRegex = /<div className="souv-controls">[\s\S]*?<\/button>\s*<\/div>/;
const newJSX = `<div className="souv-controls">
            <h1 className="souv-title">Cinematic Pass</h1>
            <p className="souv-desc">Generate your premium atmospheric digital souvenir.</p>
            
            <label className="souv-label">Your Full Name</label>
            <input type="text" className="souv-input" placeholder="Enter your name..." value={name} onChange={(e) => setName(e.target.value)} />
            
            <label className="souv-label">Favorite Pandal</label>
            <select className="souv-select" value={pandal} onChange={(e) => setPandal(e.target.value)}>
                <option value="Bardhaman Town Hall Area">Bardhaman Town Hall Area</option>
                <option value="Nutanganj / Borehat Clubs">Nutanganj / Borehat Clubs</option>
                <option value="Sarvamangala Bari Heritage">Sarvamangala Bari Heritage</option>
                <option value="Burdwan Station Road">Burdwan Station Road Mega Pandals</option>
                <option value="Alamganj Barowari">Alamganj Barowari</option>
            </select>
            
            <button className="souv-btn" onClick={handleGenerate}>Generate VIP Pass</button>
          </div>
          
          <div className="souv-card-section">
            <div ref={cardRef} className={\`souvenir-card \${revealed ? 'revealed' : ''}\`} crossOrigin="anonymous">
              <div className="glass-overlay" />
              <div className="card-content">
                <div>
                  <p className="souv-card-sup">Official Visitor Souvenir</p>
                  <h2 className="souv-card-title">BURDWAN PUJA</h2>
                  <div className="souv-card-line" />
                </div>
                
                <div className="card-mid">
                  <p className="souv-card-pre">VIP Guest</p>
                  <h3 className="souv-card-name">{revealed ? name : ''}</h3>
                  <p className="souv-card-msg">Thank you for exploring the rich heritage, spectacular lighting, and magnificent pandals of Bardhaman.</p>
                </div>
                
                <div className="cyber-token">
                  <div className="badge-sup">Authentic Digital Serial</div>
                  <div className="badge-serial">{serial}</div>
                </div>
              </div>
            </div>
            
            <button className={\`dl-btn \${revealed ? 'revealed' : ''}\`} onClick={handleDownload}>Download High-Def Pass</button>
          </div>`;

code = code.replace(jsxRegex, newJSX);
fs.writeFileSync('src/pages/SouvenirPage.tsx', code, 'utf8');
console.log("React Souvenir Page updated to Cinematic Pass.");
