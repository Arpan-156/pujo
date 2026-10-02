const fs = require('fs');
let code = fs.readFileSync('src/components/shared.tsx', 'utf8');

// I will refactor the footer-grid div
code = code.replace(
  /<div className="footer-grid">[\s\S]*?<p className="footer-love">/,
  `<div className="footer-grid">
            <div className="fg-col">
              <p className="footer-h">Explore</p>
              <ul>{NAV.map((n) => <li key={n.to}><Link to={n.to} data-cursor="Open">{n.label}</Link></li>)}
                <li><Link to="/map" data-cursor="Open">Puja Map</Link></li><li><Link to="/timeline" data-cursor="Open">The Five Days</Link></li></ul>
            </div>
            
            <div className="fg-col">
              <p className="footer-h">Burdwan Capturers</p>
              <div className="footer-soc">{SOCIALS.map(({ key, Icon, label }) => <a key={key} href={BRANDS.capturers.socials[key]} aria-label={\`Burdwan Capturers on \${label}\`} data-cursor="Follow"><Icon size={20} /></a>)}</div>
              
              <p className="footer-h" style={{ marginTop: 32 }}>Banglar Pujo</p>
              <div className="footer-soc">{SOCIALS.map(({ key, Icon, label }) => <a key={key} href={BRANDS.pujo.socials[key]} aria-label={\`Banglar Pujo on \${label}\`} data-cursor="Follow"><Icon size={20} /></a>)}</div>
            </div>
            
            <div className="fg-col">
              <p className="footer-h">Contact Us</p>
              <div className="footer-contact">
                <a href="mailto:bwncapturers2019@gmail.com" className="fc-btn" data-cursor="Mail">
                  <span className="fc-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <div className="fc-text">
                    <span className="fc-label">Drop us a line</span>
                    <span className="fc-email">bwncapturers2019@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="fg-col footer-eggs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', borderLeft: '1px solid rgba(233,181,88,0.1)', paddingLeft: '40px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <DurgaEye />
                <DhakIcon size={40} />
              </div>
              <p className="bn" style={{ margin: 0, fontSize: '2rem', color: 'var(--gold)' }}>\u09AE\u09BE \u0986\u09B8\u099B\u09C7\u09A8</p>
            </div>
          </div>
          <p className="footer-love">`
);

fs.writeFileSync('src/components/shared.tsx', code, 'utf8');
console.log('Fixed footer layout in shared.tsx');
