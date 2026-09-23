const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');
c = c.replace(/<p className="footer-copy">.*?<\/p>/s, `<button className="footer-copy-btn" onClick={() => setShowCopyright(true)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--mute)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline', fontStyle: 'italic', opacity: 0.8 }}>all copyrights are reserved by Burdwan Captuers Official</button>
        {showCopyright && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20, 8, 9, 0.9)', backdropFilter: 'blur(10px)' }} onClick={() => setShowCopyright(false)}>
            <div style={{ background: 'var(--ink)', padding: '40px', borderRadius: '12px', border: '1px solid var(--gold)', maxWidth: '500px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: 'var(--gold-2)', fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'var(--f-display)' }}>Copyright Notice</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, marginBottom: '30px' }}>All content, photographs, videos, and graphics on this website are the exclusive property of <strong>Burdwan Capturers Official</strong> and <strong>Banglar Pujo Official</strong>. Unauthorized use, reproduction, or distribution without prior written permission is strictly prohibited and may result in legal action.</p>
              <button onClick={() => setShowCopyright(false)} style={{ background: 'var(--gold)', color: 'var(--ink)', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}`);
fs.writeFileSync('src/components/shared.tsx', c);

