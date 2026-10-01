const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const faqComponent = `
function HomeFAQ() {
  return (
    <section className="wrap" style={{ padding: '80px 20px', borderTop: '1px solid rgba(233,181,88,0.2)', marginTop: '40px' }}>
      <RevealText lines={['FREQUENTLY', 'ASKED QUESTIONS']} className="display" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '40px', maxWidth: '800px' }}>
        
        <Reveal delay={100}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>What is the Bardwan Puja Guide?</h3>
            <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>The Bardwan Puja Guide is your complete digital companion for Durga Puja 2026 in Burdwan (Bardhaman). It features curated pandal lists, themes, live voting, a transit survival kit, and an interactive map.</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>Where can I find Durga Puja pandals in Burdwan?</h3>
            <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>You can explore our <Link to="/pujas" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Pandal Directory</Link> or use the <Link to="/map" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Interactive Puja Map</Link> to find precise locations and themes for all major committees across Bardhaman.</p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>How can I explore the pandals efficiently?</h3>
            <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>We recommend using our <Link to="/planner" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Route Planner</Link> to generate optimized walking or toto itineraries based on your current location and available time.</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export function Home() {
`;

if (!code.includes('function HomeFAQ()')) {
  code = code.replace('export function Home() {', faqComponent);
  code = code.replace('<Social />', '<HomeFAQ />\n        <Social />');
  fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
  console.log('Injected FAQ into Home.tsx');
}
