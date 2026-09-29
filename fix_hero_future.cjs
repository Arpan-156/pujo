const fs = require('fs');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

const newHero = `import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { useEntrance } from '../lib/entrance';
import { useFinePointer, useScrollVar } from '../lib/motion';
import { Photo, Procession } from '../components/Art';
import { LaalPaar, Particles, Rays, RevealText, Smoke } from '../components/fx';
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
        .hero { position: relative; min-height: 100vh; overflow: hidden; display: flex; align-items: center !important; justify-content: center !important; padding: 0 !important; isolation: isolate; background: #050205; }
        
        .hero-bg { position: absolute; inset: -5%; z-index: -3; }
        .hero-cam { position: absolute; inset: 0; transform: translate3d(calc(var(--mx, 0) * -25px), calc(var(--my, 0) * -20px), 0) scale(1.1); transition: transform 0.2s linear; }
        .hero-cam .photo { width: 100%; height: 100%; object-fit: cover; animation: kenburns 30s ease-in-out infinite alternate; filter: contrast(1.2) saturate(1.5); }
        
        .hero-shade { position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at center, rgba(5,2,5,0.2) 0%, rgba(5,2,5,0.95) 100%), linear-gradient(180deg, rgba(255,77,0,0.1) 0%, rgba(5,2,5,0.9) 100%); }
        
        .hero-in { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; max-width: 1200px; padding: 0 20px; }
        
        .hero-bn { font-family: var(--f-bn); font-size: clamp(1rem, 1.8vw, 1.4rem); color: #ffd500; letter-spacing: 2px; margin-bottom: 30px; opacity: 0; transform: translateY(-20px); transition: all 1.2s var(--ease); text-shadow: 0 0 10px rgba(255,213,0,0.5); }
        .hero.go .hero-bn { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        
        .hero-title-wrap { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 24px; min-height: 250px; }
        
        .hero-main-title { 
            font-family: 'Inter', system-ui, sans-serif; 
            font-size: clamp(3.5rem, 11vw, 10rem); 
            font-weight: 900; 
            line-height: 0.9; 
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-shadow: 0 0 30px rgba(255, 77, 0, 0.8), 0 0 60px rgba(255, 213, 0, 0.4);
            position: relative;
            z-index: 2;
            opacity: 0; transform: scale(1.1); filter: blur(10px);
            transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-main-title { opacity: 1; transform: scale(1); filter: blur(0px); transition-delay: 0.4s; }
        
        .hero-year { 
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            font-family: 'Inter', system-ui, sans-serif;
            font-size: clamp(8rem, 28vw, 25rem);
            font-weight: 900;
            color: transparent;
            -webkit-text-stroke: 2px rgba(255, 77, 0, 0.4);
            z-index: 1;
            pointer-events: none;
            letter-spacing: -0.05em;
            opacity: 0;
            transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-year { opacity: 1; transform: translate(-50%, -50%) scale(1); transition-delay: 0.6s; }
        
        .hero-sub { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; font-size: clamp(1rem, 2vw, 1.5rem); color: #ffd500; text-transform: uppercase; letter-spacing: 6px; margin-top: 20px; opacity: 0; transform: translateY(20px); transition: all 1s var(--ease); text-shadow: 0 0 10px rgba(255,213,0,0.5); }
        .hero.go .hero-sub { opacity: 1; transform: translateY(0); transition-delay: 1.1s; }
        
        .hero-brand { font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.3em; color: #ff4d00; text-transform: uppercase; margin-top: 40px; opacity: 0; transition: all 1s var(--ease); background: rgba(255,77,0,0.1); padding: 10px 24px; border: 1px solid rgba(255,77,0,0.3); backdrop-filter: blur(8px); clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
        .hero.go .hero-brand { opacity: 1; transition-delay: 1.4s; }
        
        .hero-cta { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 50px; opacity: 0; transform: translateY(20px); transition: all 1s var(--ease); }
        .hero.go .hero-cta { opacity: 1; transform: translateY(0); transition-delay: 1.6s; }
        
        .btn.cyber-primary { 
            background: #ff4d00; 
            color: #fff; 
            border: none; 
            padding: 16px 36px; 
            font-size: 0.9rem;
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 3px;
            clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
            box-shadow: 0 0 20px rgba(255,77,0,0.4);
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .btn.cyber-primary:hover {
            background: #ffd500;
            color: #000;
            box-shadow: 0 0 40px rgba(255,213,0,0.8);
            transform: scale(1.05);
        }

        .btn.cyber-glass { 
            background: rgba(255, 77, 0, 0.05); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(255, 77, 0, 0.4); 
            color: #ffd500; 
            padding: 16px 36px; 
            font-size: 0.9rem; 
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 3px;
            clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
            transition: all 0.3s; 
            text-decoration: none;
        }
        .btn.cyber-glass:hover { 
            background: rgba(255, 77, 0, 0.3); 
            border-color: #ffd500; 
            color: #fff; 
            box-shadow: 0 0 20px rgba(255,77,0,0.6);
            transform: translateY(-3px);
        }
      \`}</style>
      
      <div className="hero-bg"><div className="hero-cam"><Photo v={HERO} eager alt="Burdwan Durga Puja pandal 2026 at dusk" /></div></div>
      <Rays />
      <Smoke className="hero-smoke" />
      <Particles kind="petals" count={40} />
      <Particles kind="embers" count={60} />
      <div className="hero-shade" />
      
      <div className="hero-in">
        <p className="hero-bn" lang="bn">{\`${bengaliText}\`}</p>
        
        <div className="hero-title-wrap">
            <div className="hero-year">2026</div>
            <h1 className="hero-main-title">BURDWAN<br/>PUJO</h1>
        </div>
        
        <p className="hero-sub">Tradition meets Imagination</p>
        
        <p className="hero-brand">
          Presented by <b style={{ color: '#fff', fontWeight: 800 }}>Burdwan Capturers</b>
        </p>
        
        <div className="hero-cta">
          <Link to="/pujas" className="btn cyber-primary" data-cursor="Explore">Explore Puja</Link>
          <Link to="/featured" className="btn cyber-glass" data-cursor="Open">Featured Pandals</Link>
          <Link to="/map" className="btn cyber-glass" data-cursor="Open">Pandal Map</Link>
        </div>
      </div>
      
      <Procession />
      <LaalPaar className="hero-paar" />
    </section>
  );
}
`;

fs.writeFileSync('src/sections/Hero.tsx', newHero, 'utf8');
console.log("Applied Futuristic Durga Puja Redesign");
