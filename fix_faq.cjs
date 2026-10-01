const fs = require('fs');
let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const faqCodeOld = `
export function FaqPage() {
  return (
    <>
      <PageHead lines={['FREQUENTLY', 'ASKED QUESTIONS']} bn="\\u09B8\\u09BE\\u09A7\\u09BE\\u09B0\\u09A3 \\u09AA\\u09CD\\u09B0\\u09B6\\u09CD\\u09A8" lead="Got questions? We have answers." visual={{ src: '/images/about-cover.jpg', art: 'bridge', seed: 10, hue: 30, tone: 'night' }} />
      <section className="wrap" style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto' }}>
`;

// Just find export function FaqPage() and replace the whole thing.
let startIndex = pages.indexOf('export function FaqPage() {');
if (startIndex !== -1) {
  pages = pages.substring(0, startIndex);
}

const faqCodeNew = `
export function FaqPage() {
  const [openQ, setOpenQ] = useState<number | null>(0);

  const faqs = [
    { q: "What is the Burdwan Puja Guide?", a: "The Burdwan Puja Guide is your complete digital companion for Durga Puja 2026 in Burdwan (Bardhaman). It features curated pandal lists, themes, live voting, a transit survival kit, and an interactive map." },
    { q: "Where can I find Durga Puja pandals in Burdwan?", a: "You can explore our Pandal Directory or use the Interactive Puja Map to find precise locations and themes for all major committees across Bardhaman." },
    { q: "How can I explore the pandals efficiently?", a: "We recommend using our Route Planner to generate optimized walking or toto itineraries based on your current location and available time." },
    { q: "How does the Top 3 Voting work?", a: "You can vote for your 3 favorite pandals on the Top 3 Voter page. Select the best pandals you explored this year to help them win community recognition!" },
    { q: "Is there an offline mode or survival guide?", a: "Yes! Visit our Survival Kit page to find emergency contacts, bus and toto stands, and helpful tips to navigate the crowds safely. It is designed to be your offline companion." },
    { q: "Can I add my club's pandal to the directory?", a: "Absolutely! If your Durga Puja pandal is missing, please contact the Burdwan Capturers Official or Banglar Pujo Official teams through the social links in our footer to get it listed." },
    { q: "Is the pandal hopping route planner free to use?", a: "Yes, all features of this guide, including the Route Planner, Live Maps, and Top 3 Voting, are 100% free and open for the community to enjoy a better Puja experience." },
    { q: "Who created this guide?", a: "This website is an initiative by Burdwan Capturers Official and Banglar Pujo Official to digitalize and celebrate the grandeur of Durga Puja in Bardhaman." }
  ];

  return (
    <>
      <style>{\`
        .faq-hero {
          position: relative;
          padding: 160px 20px 80px;
          background: linear-gradient(135deg, var(--ink), #2a0810);
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(233, 181, 88, 0.2);
        }
        .faq-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(233,181,88,0.15), transparent 70%);
        }
        .faq-title {
          font-family: var(--f-display);
          font-size: clamp(3rem, 8vw, 5rem);
          background: linear-gradient(to right, #fff, #e9b558);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 20px; position: relative; z-index: 2;
        }
        .faq-subtitle {
          color: var(--gold); font-size: 1.2rem; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 40px; position: relative; z-index: 2;
        }
        .faq-container {
          max-width: 800px; margin: -40px auto 100px; position: relative; z-index: 10;
          padding: 0 20px;
        }
        .faq-item {
          background: rgba(15,5,8,0.95);
          border: 1px solid rgba(233,181,88,0.15);
          border-radius: 12px; margin-bottom: 16px;
          overflow: hidden; backdrop-filter: blur(10px);
          transition: all 0.3s var(--ease);
        }
        .faq-item.open {
          border-color: rgba(233,181,88,0.5);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transform: scale(1.02);
        }
        .faq-q {
          padding: 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          font-weight: 600; font-size: 1.1rem; color: #fff;
        }
        .faq-q svg {
          color: var(--gold); transition: transform 0.4s var(--ease);
        }
        .faq-item.open .faq-q svg { transform: rotate(180deg); }
        .faq-a {
          padding: 0 24px; max-height: 0; opacity: 0; transition: all 0.4s var(--ease);
          color: var(--mute); line-height: 1.6;
        }
        .faq-item.open .faq-a {
          padding: 0 24px 24px; max-height: 200px; opacity: 1;
        }
      \`}</style>

      <section className="faq-hero">
        <h1 className="faq-title">Got Questions?</h1>
        <p className="faq-subtitle">We have answers.</p>
        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', opacity: 0.05, zIndex: 1 }}>
          <Alpana size={600} spin />
        </div>
      </section>

      <div className="faq-container">
        {faqs.map((f, i) => (
          <div key={i} className={\`faq-item \${openQ === i ? 'open' : ''}\`}>
            <div className="faq-q" onClick={() => setOpenQ(openQ === i ? null : i)}>
              {f.q}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </>
  );
}
`;

pages += faqCodeNew;
fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Redesigned FAQ Page');
