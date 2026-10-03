import { useData } from '../data/store';
import { PujaCard, Btn } from '../components/shared';
import { Reveal, RevealText, Alpana } from '../components/fx';
import { Hero } from '../sections/Hero';
import { Countdown } from '../sections/Countdown';
import { Manifesto } from '../sections/Manifesto';
import { FeaturedRail } from '../sections/FeaturedRail';
import { ThemesGrid } from '../sections/ThemesGrid';
import { Experiences } from '../sections/Experiences';
import { Timeline } from '../sections/Timeline';
import { PujaMap } from '../sections/PujaMap';
import { DailyShloka } from '../sections/DailyShloka';
import { Social } from '../sections/About';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import type { PointerEvent } from 'react';
import { useMemo } from 'react';
import { useFinePointer } from '../lib/motion';


export function Home() {

  const { pujas, landmarks } = useData();
  const fine = useFinePointer();
  const preview = useMemo(() => pujas.filter((p) => !p.featured).slice(0, 6), [pujas]);
  const move = (e: PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width).toFixed(3));
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height).toFixed(3));
  };

  return (
    <>
      <Hero />
      <Countdown />
      <Manifesto />
      <FeaturedRail />
      <section className="dir-preview" onPointerMove={move} style={{ '--px': 0.5, '--py': 0.5 } as React.CSSProperties}>
        <div className="dir-spotlight" aria-hidden="true" />
        <div className="wrap">
          <div className="dir-head">
            <div className="dir-head-text">
              <RevealText lines={['BURDWAN', 'PUJA PANDALS']} className="display" />
              <Reveal delay={200} className="lead">Explore the Puja celebrations across Bardhaman. The directory grows every week.</Reveal>
            </div>
            <div className="dir-head-art" aria-hidden="true">
              <Alpana size={400} spin />
            </div>
          </div>
          <div className="pcards">
            {preview.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 90}><PujaCard p={p} /></Reveal>)}
          </div>
          <div className="dir-more"><Btn to="/pujas" cursor="Open">See all {pujas.length} Puja</Btn></div>
        </div>
      </section>
      <div className="wrap map-head">
        <RevealText lines={['PUJA MAP']} className="display" />
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px' }}>
            <p className="lead" style={{ margin: 0, maxWidth: '40ch' }}>
              Glowing pin to see the exact location of the Pandals - Click on the " Get Directions " button to get the exact directions from where you are.
            </p>
            <Btn to="/map" cursor="Open">Open the full map</Btn>
          </div>
        </Reveal>
      </div>
      <PujaMap />
      {/* <ThemesGrid /> */}
      <Experiences />
      <Timeline />
      {/* <section className="bd-teaser">
        <div className="bd-teaser-bg" aria-hidden="true"><Photo v={landmarks[0].visual} /></div>
        <div className="bd-teaser-shade" />
        <div className="wrap bd-teaser-in">
          <RevealText lines={['A TOWN BUILT', 'FOR WALKING']} className="display" />
          <Reveal delay={200} className="lead">Curzon Gate, the railway overbridge, the river at first light and the lanes between them.</Reveal>
          <Reveal delay={300}><Btn to="/bardhaman" cursor="Explore">Explore Bardhaman</Btn></Reveal>
        </div>
      </section> */}
      
      <DailyShloka />
      
      

        
      

        
        <Social />
      <section className="surv-teaser" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', zIndex: 10, overflow: 'hidden', borderTop: '1px solid rgba(233,181,88,0.3)', borderBottom: '1px solid rgba(233,181,88,0.3)', background: '#0a0304' }}>
        <style>{`
          @keyframes slideGlow {
            0% { left: -50%; }
            100% { left: 150%; }
          }
          @keyframes pulseGold {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .surv-max-bg {
             position: absolute; inset: 0;
             background: url('/images/about-cover.jpg') center/cover fixed; /* Using an existing image */
             opacity: 0.15;
             filter: grayscale(100%) sepia(100%) hue-rotate(320deg) saturate(200%);
          }
          .surv-max-overlay {
             position: absolute; inset: 0;
             background: linear-gradient(90deg, rgba(20,5,8,1) 0%, rgba(122,18,32,0.85) 50%, rgba(20,5,8,1) 100%);
          }
          .surv-max-shimmer {
             position: absolute; top: 0; width: 300px; height: 100%; transform: skewX(-15deg);
             background: linear-gradient(90deg, transparent, rgba(233,181,88,0.15), transparent);
             animation: slideGlow 5s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          .surv-max-content {
             position: relative; max-width: 1200px; margin: 0 auto; padding: 60px 20px 120px;
             display: flex; flex-direction: column; align-items: center; justify-content: center;
             text-align: center; gap: 30px;
             z-index: 2;
          }
          @media (min-width: 900px) {
             .surv-max-content { flex-direction: row; text-align: left; justify-content: space-between; padding: 80px 40px 100px; }
          }
          .surv-max-title {
             font-family: var(--f-display); font-size: clamp(2.5rem, 5vw, 4.5rem); 
             background: linear-gradient(to right, #fff, #e9b558); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
             margin: 0 0 10px; line-height: 1.1;
          }
          .surv-max-desc {
             color: var(--mute); font-size: clamp(1rem, 1.5vw, 1.25rem); max-width: 600px; margin: 0; line-height: 1.6;
          }
          .surv-max-btn {
             position: relative; overflow: hidden;
             display: inline-flex; align-items: center; justify-content: center; gap: 12px; 
             background: linear-gradient(45deg, #e9b558, #d49a3a); color: #000; 
             padding: 20px 48px; border-radius: 4px; font-weight: 900; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 3px; 
             text-decoration: none; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); 
             box-shadow: 0 10px 30px rgba(233,181,88,0.3);
             white-space: nowrap;
          }
          .surv-max-btn::before {
             content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
             background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
             transform: translateX(-100%) skewX(-15deg); transition: transform 0.5s ease;
          }
          .surv-max-btn:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(233,181,88,0.5); }
          .surv-max-btn:hover::before { transform: translateX(200%) skewX(-15deg); }
        `}</style>
        
        <div className="surv-max-bg" />
        <div className="surv-max-overlay" />
        <div className="surv-max-shimmer" />

        <div className="surv-max-content">
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center', '@media (min-width: 900px)': { justifyContent: 'flex-start' } } as any}>
                 <span style={{ width: '40px', height: '1px', background: 'var(--gold)' }}></span>
                 <span style={{ color: 'var(--gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>Offline Companion</span>
                 <span style={{ width: '40px', height: '1px', background: 'var(--gold)' }}></span>
              </div>
              <h2 className="surv-max-title">Durga Puja Survival Kit</h2>
              <p className="surv-max-desc">Don't let the crowds overwhelm you. Download your essential offline cheat sheet for emergency contacts, <strong>bus and toto stands</strong>, and survival guides.</p>
           </div>
           
           <Link to="/survival" className="surv-max-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Get the Kit
           </Link>
        </div>
      </section>
    </>
  );
}
