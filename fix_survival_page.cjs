const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Rename Transit Hubs to Bus & Toto Stands
code = code.replace(
  'title: "Major Transit Hubs"',
  'title: "Bus & Toto Stands"'
);

// 2. Add jaw dropping animation to Survival Kit page cards
code = code.replace(
  '.surv-grid { display: grid !important;',
  `.surv-grid { display: grid !important;`
);

// We need to inject an animation class for the surviving cards
if (!code.includes('animate-surv-card')) {
  code = code.replace(
    '.surv-card {',
    `
    @keyframes jawDrop {
      0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    .animate-surv-card {
      animation: jawDrop 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }
    .surv-card {`
  );
  
  // Apply the animation class with staggered delay
  code = code.replace(
    'className="surv-card"',
    'className="surv-card animate-surv-card" style={{ animationDelay: `${idx * 0.2}s` }}'
  );
}

// 3. Add the teaser to BardhamanPage
const teaser = `
      <section className="surv-teaser" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center', background: 'var(--ink)' }}>
        <style>{\`
          @keyframes glowPulse {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0.5; }
          }
          .surv-t-card {
             width: 100%; max-width: 1000px;
             background: linear-gradient(135deg, rgba(20,5,8,0.9), rgba(122,18,32,0.6));
             border-radius: 20px; padding: 40px; text-align: center;
             border: 1px solid rgba(233,181,88,0.3);
             box-shadow: 0 20px 50px rgba(0,0,0,0.5);
             position: relative; overflow: hidden;
          }
          .surv-t-glow { 
             position: absolute; inset: -50%; background: radial-gradient(circle at center, rgba(233,181,88,0.2), transparent 60%); 
             pointer-events: none; animation: glowPulse 4s ease-in-out infinite; 
          }
          .surv-t-title { font-family: var(--f-display); font-size: clamp(2.5rem, 6vw, 4rem); color: var(--gold); margin: 0 0 16px; line-height: 1.1; text-shadow: 0 5px 20px rgba(233,181,88,0.5); }
          .surv-t-desc { color: var(--shankha); font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; margin: 0 auto 30px; max-width: 600px; line-height: 1.6; }
          .surv-t-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(90deg, var(--gold), #ffde82); color: #000; padding: 18px 40px; border-radius: 50px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 10px 30px rgba(233,181,88,0.4); }
          .surv-t-btn:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 40px rgba(233,181,88,0.6); }
        \`}</style>
        <div className="surv-t-card" style={{ animation: 'jawDrop 1s ease-out forwards' }}>
          <div className="surv-t-glow" />
          <h2 className="surv-t-title">Durga Puja Survival Kit</h2>
          <p className="surv-t-desc">Don't let the crowds overwhelm you. Download your essential offline cheat sheet for emergency contacts, <strong>bus and toto stands</strong>, and survival guides.</p>
          <Link to="/survival" className="surv-t-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Get the Kit
          </Link>
        </div>
      </section>
`;

if (!code.includes('<section className="surv-teaser" style={{ padding: \'80px 20px\', display: \'flex\', justifyContent: \'center\', background: \'var(--ink)\' }}>')) {
    code = code.replace(
      '<Btn to="/map" cursor="Open">Open the Puja Map</Btn></div></section>',
      '<Btn to="/map" cursor="Open">Open the Puja Map</Btn></div></section>\n' + teaser
    );
}

// 4. Update the card render loop to include the style animation Delay
code = code.replace(
    'className="surv-card animate-surv-card" style={section.type === \'guide\' ? { gridColumn: \'1 / -1\' } : {}}',
    'className="surv-card animate-surv-card" style={{ ...(section.type === \'guide\' ? { gridColumn: \'1 / -1\' } : {}), animationDelay: `${idx * 0.2}s` }}'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
