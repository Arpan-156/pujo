const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(300px, 1fr\)\)', gap: '24px', marginBottom: '24px' \}\}>[\s\S]*?\{ p\.feat && \(/;

const stunningCards = `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Jaw-Dropping About Pandal Card */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            padding: '32px',
            background: 'linear-gradient(145deg, rgba(30,10,12,0.8) 0%, rgba(15,5,5,0.9) 100%)',
            border: '1px solid rgba(233,181,88,0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(233,181,88,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            
            <div>
              <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '1px', background: '#ef4444' }} />
                About The Pandal
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 20px 0', fontFamily: 'var(--f-display)', lineHeight: 1.2 }}>Cultural Heritage & <span style={{ color: 'var(--gold)' }}>Theme Concept</span></h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px', position: 'relative', zIndex: 1 }}>{p.story || p.name + ' represents a unique cultural heritage...'}</p>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }}>
              <Pin size={14} /> Geographic Coordinates: {p.map?.lat?.toFixed(4) || 'N/A'}&deg; N, {p.map?.lng?.toFixed(4) || 'N/A'}&deg; E
            </div>
          </div>

          {/* Jaw-Dropping Visiting Rec Card */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            padding: '32px',
            background: 'linear-gradient(145deg, rgba(20,15,5,0.8) 0%, rgba(10,5,5,0.9) 100%)',
            border: '1px solid rgba(233,181,88,0.25)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(233,181,88,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
            
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
                Visiting Recommendation
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(233,181,88,0.1)', border: '1px solid rgba(233,181,88,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0, boxShadow: '0 0 20px rgba(233,181,88,0.1)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 4px 0', fontFamily: 'var(--f-display)' }}>Best Time to Visit</h3>
                  <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Late Evening (8 PM - 1 AM)</div>
                </div>
              </div>
              
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                Crowds peak between 8 PM and 1 AM. Early morning offers peaceful rituals and photography without long queues.
              </p>
            </div>
            
            <div style={{ background: 'rgba(233,181,88,0.05)', border: '1px solid rgba(233,181,88,0.2)', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--gold)', marginTop: '2px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
              <div>
                <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>PANDAL INSIDER TIP</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>Use the northern entry gate for faster access during peak crowd hours.</div>
              </div>
            </div>
          </div>
        </div>

        { p.feat && (`;

code = code.replace(regex, stunningCards);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Cards redesigned');
