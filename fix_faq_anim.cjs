const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Find the style tag in FaqPage
const oldStyleStart = pages.indexOf('<style>{`\n          .faq-hero {');
const oldStyleEnd = pages.indexOf('`}</style>', oldStyleStart) + 10;

const newStyle = `<style>{\`
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }
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
    animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .faq-subtitle {
    color: var(--gold); font-size: 1.2rem; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 40px; position: relative; z-index: 2;
    opacity: 0;
    animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
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
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .faq-item.open {
    border-color: rgba(233,181,88,0.7);
    box-shadow: 0 15px 40px rgba(0,0,0,0.6);
    transform: scale(1.03) translateY(-4px);
    background: rgba(30,10,15,0.98);
  }
  .faq-q {
    padding: 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    font-weight: 600; font-size: 1.1rem; color: #fff;
    transition: padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
  }
  .faq-item.open .faq-q {
    padding-left: 32px;
    color: var(--gold);
  }
  .faq-q svg {
    color: var(--gold); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
  }
  .faq-item.open .faq-q svg { 
    transform: rotate(135deg) scale(1.2); 
    color: #fff;
  }
  .faq-a {
    padding: 0 24px; max-height: 0; opacity: 0; 
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    color: var(--mute); line-height: 1.6;
    transform: translateX(-20px) scale(0.95);
  }
  .faq-item.open .faq-a {
    padding: 0 32px 24px; max-height: 250px; opacity: 1;
    transform: translateX(0) scale(1);
    color: rgba(255,255,255,0.85);
  }
\`}</style>`;

pages = pages.substring(0, oldStyleStart) + newStyle + pages.substring(oldStyleEnd);

// Add dynamic animation delays to the items
pages = pages.replace(
  '<div key={i} className={`faq-item ${openQ === i ? \'open\' : \'\'}`}>',
  '<div key={i} className={`faq-item ${openQ === i ? \'open\' : \'\'}`} style={{ animationDelay: `${0.3 + (i * 0.1)}s` }}>'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Added totally new FAQ animations');
