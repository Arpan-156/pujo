const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const moreQuestions = `
          <Reveal delay={700}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>Can I add my club's pandal to the directory?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>Absolutely! If your Durga Puja pandal is missing, please contact the Burdwan Capturers Official or Banglar Pujo Official teams through the social links in our footer to get it listed.</p>
            </div>
          </Reveal>

          <Reveal delay={800}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'var(--f-display)', letterSpacing: '1px' }}>Is the pandal hopping route planner free to use?</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>Yes, all features of this guide, including the Route Planner, Live Maps, and Top 3 Voting, are 100% free and open for the community to enjoy a better Puja experience.</p>
            </div>
          </Reveal>
`;

code = code.replace(
  'Who created this guide?</h3>\n              <p style={{ color: \'var(--mute)\', lineHeight: 1.6, margin: 0 }}>This website is an initiative by Burdwan Capturers Official and Banglar Pujo Official to digitalize and celebrate the grandeur of Durga Puja in Bardhaman.</p>\n            </div>\n          </Reveal>',
  'Who created this guide?</h3>\n              <p style={{ color: \'var(--mute)\', lineHeight: 1.6, margin: 0 }}>This website is an initiative by Burdwan Capturers Official and Banglar Pujo Official to digitalize and celebrate the grandeur of Durga Puja in Bardhaman.</p>\n            </div>\n          </Reveal>\n' + moreQuestions
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Added more FAQ questions');
