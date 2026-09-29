const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const survivalBanner = `
      <section className="surv-teaser" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
        <style>{\`
          .surv-t-card {
             width: 100%; max-width: 1000px;
             background: linear-gradient(135deg, rgba(20,5,8,0.9), rgba(122,18,32,0.6));
             border-radius: 20px; padding: 40px; text-align: center;
             border: 1px solid rgba(233,181,88,0.3);
             box-shadow: 0 20px 50px rgba(0,0,0,0.5);
             position: relative; overflow: hidden;
          }
          .surv-t-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% -20%, rgba(233,181,88,0.2), transparent 70%); pointer-events: none; }
          .surv-t-title { font-family: var(--f-display); font-size: clamp(2rem, 5vw, 3.5rem); color: var(--gold); margin: 0 0 16px; line-height: 1.1; }
          .surv-t-desc { color: var(--shankha); font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; margin: 0 auto 30px; max-width: 600px; line-height: 1.6; }
          .surv-t-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--gold); color: #000; padding: 16px 32px; border-radius: 50px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; transition: transform 0.2s; }
          .surv-t-btn:hover { transform: scale(1.05); }
        \`}</style>
        <Reveal className="surv-t-card">
          <div className="surv-t-glow" />
          <h2 className="surv-t-title">Durga Puja Survival Kit</h2>
          <p className="surv-t-desc">Don't let the crowds overwhelm you. Download your essential offline cheat sheet for emergency contacts, transit hubs, and survival guides.</p>
          <Link href="/survival" className="surv-t-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Get the Kit
          </Link>
        </Reveal>
      </section>
`;

if (!code.includes('surv-teaser')) {
    code = code.replace('<Social />', survivalBanner + '\n        <Social />');
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
}
