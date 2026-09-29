const fs = require('fs');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

const sabekiHero = `import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { useEntrance } from '../lib/entrance';
import { useFinePointer, useScrollVar } from '../lib/motion';
import { Photo, Procession } from '../components/Art';
import { LaalPaar, Particles, Rays, RevealText, Smoke, Alpana, TuniLights, DurgaEye } from '../components/fx';
import { Link } from '../lib/router';

const HERO: Visual = { art: 'pandal', seed: 7, hue: 10, tone: 'dusk', src: '/cover.jpg' };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { open } = useEntrance();
  useScrollVar(ref);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section ref={ref} className={\`hero \${open ? 'go' : ''}\`} onPointerMove={move}>
      <style>{\`
        .hero { position: relative; min-height: 100vh; overflow: hidden; display: flex; align-items: center !important; justify-content: center !important; padding: 0 !important; isolation: isolate; background: #380b0f; }
        
        .hero-bg { position: absolute; inset: -5%; z-index: -3; }
        .hero-cam { position: absolute; inset: 0; transform: translate3d(calc(var(--mx, 0) * -25px), calc(var(--my, 0) * -20px), 0) scale(1.1); transition: transform 0.2s linear; }
        .hero-cam .photo { width: 100%; height: 100%; object-fit: cover; animation: kenburns 30s ease-in-out infinite alternate; opacity: 0.6; filter: sepia(0.4) saturate(1.2); }
        
        /* Sabeki Vermilion Overlay */
        .hero-shade { position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at center, rgba(82, 11, 15, 0.4) 0%, rgba(31, 3, 5, 0.95) 100%), linear-gradient(180deg, rgba(140,28,19,0.3) 0%, rgba(20, 2, 3, 0.95) 100%); }
        
        /* Ornamental Decor */
        .sabeki-corner { position: absolute; top: 0; width: clamp(200px, 30vw, 400px); height: clamp(200px, 30vw, 400px); pointer-events: none; z-index: 1; opacity: 0.15; color: #f9d77e; }
        .sabeki-corner.left { left: -10%; top: -10%; }
        .sabeki-corner.right { right: -10%; top: -10%; }
        
        .hero-in { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; max-width: 1000px; padding: 0 20px; }
        
        .hero-bn { font-family: var(--f-bn); font-size: clamp(1.1rem, 2.5vw, 1.8rem); color: #f9d77e; letter-spacing: 2px; margin-bottom: 24px; opacity: 0; transform: translateY(-20px); transition: all 1.2s var(--ease); text-shadow: 0 4px 15px rgba(0,0,0,0.8); }
        .hero.go .hero-bn { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        
        .hero-title-wrap { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 30px; border-top: 1px solid rgba(249,215,126,0.3); border-bottom: 1px solid rgba(249,215,126,0.3); padding: 40px 0; }
        .hero-title-wrap::before, .hero-title-wrap::after { content: ''; position: absolute; width: 8px; height: 8px; background: #f9d77e; transform: rotate(45deg); }
        .hero-title-wrap::before { top: -4px; }
        .hero-title-wrap::after { bottom: -4px; }
        
        .hero-main-title { 
            font-family: 'Cinzel', var(--f-display); 
            font-size: clamp(3rem, 10vw, 8rem); 
            font-weight: 700; 
            line-height: 1.1; 
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            text-shadow: 0 10px 30px rgba(0,0,0,0.8);
            opacity: 0; transform: scale(0.95); filter: blur(5px);
            transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-main-title { opacity: 1; transform: scale(1); filter: blur(0px); transition-delay: 0.5s; }
        .hero-main-title span { color: #f9d77e; }
        
        .hero-year { 
            font-family: var(--f-display); 
            font-size: clamp(1.5rem, 4vw, 2.5rem); 
            font-weight: 400; 
            color: #f9d77e; 
            letter-spacing: 0.4em;
            margin-top: 10px;
            opacity: 0;
            transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-year { opacity: 1; transition-delay: 0.8s; }
        
        .hero-sub { font-family: var(--f-display); font-style: italic; font-size: clamp(1.2rem, 2.5vw, 2rem); color: rgba(255,255,255,0.9); margin-top: 30px; opacity: 0; transform: translateY(20px); transition: all 1s var(--ease); font-weight: 300; }
        .hero.go .hero-sub { opacity: 1; transform: translateY(0); transition-delay: 1.1s; }
        
        .hero-brand { font-family: var(--f-body); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.25em; color: #f9d77e; text-transform: uppercase; margin-top: 40px; opacity: 0; transition: all 1s var(--ease); background: rgba(56, 11, 15, 0.6); padding: 10px 24px; border-radius: 4px; border: 1px solid rgba(249,215,126,0.3); backdrop-filter: blur(8px); }
        .hero.go .hero-brand { opacity: 1; transition-delay: 1.4s; }
        
        .hero-cta { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 50px; opacity: 0; transform: translateY(20px); transition: all 1s var(--ease); }
        .hero.go .hero-cta { opacity: 1; transform: translateY(0); transition-delay: 1.6s; }
        
        .btn.sabeki-primary { 
            background: #f9d77e; 
            color: #380b0f; 
            border: none; 
            padding: 16px 36px; 
            font-size: 0.9rem;
            font-family: 'Cinzel', var(--f-display);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
            text-decoration: none;
            border-radius: 2px;
        }
        .btn.sabeki-primary:hover {
            background: #fff;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(249,215,126,0.4);
        }

        .btn.sabeki-glass { 
            background: rgba(249,215,126,0.05); 
            backdrop-filter: blur(8px); 
            border: 1px solid rgba(249,215,126,0.4); 
            color: #f9d77e; 
            padding: 16px 36px; 
            font-size: 0.9rem; 
            font-family: 'Cinzel', var(--f-display);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s; 
            text-decoration: none;
            border-radius: 2px;
        }
        .btn.sabeki-glass:hover { 
            background: rgba(249,215,126,0.15); 
            color: #fff; 
            transform: translateY(-3px);
        }
      \`}</style>
      
      <div className="hero-bg"><div className="hero-cam"><Photo v={HERO} eager alt="Burdwan Durga Puja pandal 2026 at dusk" /></div></div>
      <Rays />
      <Smoke className="hero-smoke" />
      <Particles kind="petals" count={35} />
      <div className="hero-shade" />
      
      {/* Sabekiana Ornamental Decor */}
      <TuniLights style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0.6 }} />
      <div className="sabeki-corner left"><Alpana spin={true} size={400} /></div>
      <div className="sabeki-corner right"><Alpana spin={true} size={400} /></div>
      
      <div className="hero-in">
        <p className="hero-bn" lang="bn">{\`${bengaliText}\`}</p>
        
        <div className="hero-title-wrap">
            <h1 className="hero-main-title">BURDWAN <span>PUJO</span></h1>
            <div className="hero-year"><DurgaEye /> 2026 <DurgaEye /></div>
        </div>
        
        <p className="hero-sub">Where tradition meets imagination.</p>
        
        <p className="hero-brand">
          Presented by <b style={{ color: '#fff', fontWeight: 700 }}>Burdwan Capturers</b>
        </p>
        
        <div className="hero-cta">
          <Link to="/pujas" className="btn sabeki-primary" data-cursor="Explore">Explore Puja</Link>
          <Link to="/featured" className="btn sabeki-glass" data-cursor="Open">Featured Pandals</Link>
          <Link to="/map" className="btn sabeki-glass" data-cursor="Open">Pandal Map</Link>
        </div>
      </div>
      
      <Procession />
      <LaalPaar className="hero-paar" />
    </section>
  );
}
`;

fs.writeFileSync('src/sections/Hero.tsx', sabekiHero, 'utf8');
console.log("Applied Sabekiana Style Redesign");
