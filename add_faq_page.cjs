const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const faqCode = `
export function FaqPage() {
  return (
    <>
      <PageHead lines={['FREQUENTLY', 'ASKED QUESTIONS']} bn="???????????????" lead="Got questions? We have answers." visual={{ src: '/images/about-cover.jpg', art: 'bridge', seed: 10, hue: 30, tone: 'night' }} />
      <section className="wrap" style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <Reveal delay={100}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>What is the Burdwan Puja Guide?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>The Burdwan Puja Guide is your complete digital companion for Durga Puja 2026 in Burdwan (Bardhaman). It features curated pandal lists, themes, live voting, a transit survival kit, and an interactive map.</p>
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

          <Reveal delay={400}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>How does the Top 3 Voting work?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>You can vote for your 3 favorite pandals on the <Link to="/top3" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Top 3 Voter</Link> page. Select the best pandals you explored this year to help them win community recognition!</p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>Is there an offline mode or survival guide?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>Yes! Visit our <Link to="/survival" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Survival Kit</Link> page to find emergency contacts, bus and toto stands, and helpful tips to navigate the crowds safely. It is designed to be your offline companion.</p>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>Who created this guide?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>This website is an initiative by Burdwan Capturers Official and Banglar Pujo Official to digitalize and celebrate the grandeur of Durga Puja in Bardhaman.</p>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
`;

pages += '\n' + faqCode;
fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');

console.log('Added FaqPage to Pages.tsx');
