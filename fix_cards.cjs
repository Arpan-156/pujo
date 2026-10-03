const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(300px, 1fr\)\)', gap: '24px', marginBottom: '24px' \}\}>\s*\{\/\* About Pandal \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m;

const replacement = `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* About Pandal - Glassmorphism Glow */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', padding: '32px', background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '99px', color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              About The Pandal
            </div>

            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>{p.theme || 'Cultural Heritage & Theme'}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px' }}>
              {p.story || \`\${p.name} represents a unique cultural heritage. Celebrating Durga Puja with grand festivities and devotion. The committee has spent months on the design, with the pandal taking shape in the last three weeks before Shashthi.\`}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="#9ca3af" />
              </div>
              <div>
                <div style={{ color: 'var(--mute)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Geographic Coordinates</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'monospace' }}>{p.map?.lat?.toFixed(5) || 'N/A'}&deg; N, {p.map?.lng?.toFixed(5) || 'N/A'}&deg; E</div>
              </div>
            </div>
          </div>

          {/* Visiting Rec - Glossy Gold */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', padding: '32px', background: 'linear-gradient(145deg, rgba(30, 25, 10, 0.8) 0%, rgba(15, 12, 5, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(233, 181, 88, 0.1)' }}>
            <div style={{ position: 'absolute', bottom: '-50%', right: '-20%', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(233, 181, 88, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(233, 181, 88, 0.1)', border: '1px solid rgba(233, 181, 88, 0.3)', borderRadius: '99px', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Visiting Recommendation
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>Best Time to Visit</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(90deg, #d97757, #e9b558)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, fontSize: '1.2rem' }}>
                Evening
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Crowds peak between 8 PM and 1 AM. Early morning offers peaceful rituals and beautiful photography without the long queues.
            </p>

            <div style={{ position: 'relative', overflow: 'hidden', padding: '20px', background: 'rgba(233, 181, 88, 0.08)', borderRadius: '16px', border: '1px solid rgba(233, 181, 88, 0.2)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }}></div>
              <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Lightbulb size={16} /> Insider Tip
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {p.attractions[0] || 'Plan to walk the final stretch as local police often restrict vehicle access near the pandal after 4 PM.'}
              </p>
            </div>
          </div>
        </div>`;

if (code.match(regex)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log('Successfully replaced cards!');
} else {
  console.log('Regex failed to match');
}
