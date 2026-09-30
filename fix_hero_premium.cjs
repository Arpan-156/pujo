const fs = require('fs');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

const premiumHero = `import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { useEntrance } from '../lib/entrance';
import { useFinePointer, useScrollVar } from '../lib/motion';
import { Photo, Procession } from '../components/Art';
import { Particles, Rays, RevealText } from '../components/fx';
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
        .hero { position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden; display: flex; align-items: center !important; justify-content: center !important; padding: 0 !important; isolation: isolate; background: #000; }
        
        .hero-bg { position: absolute; inset: -4%; z-index: -3; }
        .hero-cam { position: absolute; inset: 0; transform: translate3d(calc(var(--mx, 0) * -15px), calc(var(--my, 0) * -15px), 0) scale(1.05); transition: transform 0.1s linear; }
        .hero-cam .photo { width: 100%; height: 100%; object-fit: cover; animation: kenburns 40s ease-out infinite alternate; opacity: 0.85; filter: contrast(1.1) brightness(0.9); }
        
        /* Ultra-smooth premium gradient */
        .hero-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 100%); }
        
        .hero-in { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; max-width: 1400px; padding: 0 40px; margin-top: 10vh; }
        
        /* Floating Bengali Pill */
        .hero-bn-wrap { overflow: hidden; margin-bottom: 4vh; border-radius: 100px; }
        .hero-bn { font-family: var(--f-bn); font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: rgba(255,255,255,0.9); letter-spacing: 1px; padding: 12px 32px; background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; opacity: 0; transform: translateY(100%); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero.go .hero-bn { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        
        /* Editorial Typography */
        .hero-title-wrap { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 2vh; }
        
        .hero-t1 { 
            font-family: 'Inter', system-ui, sans-serif;
            font-size: clamp(3rem, 9vw, 9rem); 
            font-weight: 300; 
            line-height: 0.9; 
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-right: -0.15em; /* Offset tracking */
            opacity: 0; filter: blur(10px); transform: translateY(40px);
            transition: all 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-t1 { opacity: 1; filter: blur(0px); transform: translateY(0); transition-delay: 0.4s; }
        
        .hero-t2 { 
            font-family: 'Playfair Display', var(--f-display);
            font-size: clamp(4.5rem, 12vw, 12rem); 
            font-style: italic;
            font-weight: 400; 
            line-height: 0.9; 
            color: #e9b558; /* Premium subtle gold */
            margin-top: -0.15em;
            opacity: 0; filter: blur(10px); transform: translateY(40px);
            transition: all 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .hero-t2 { opacity: 1; filter: blur(0px); transform: translateY(0); transition-delay: 0.6s; }
        
        .hero-sub { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; font-size: clamp(1rem, 1.5vw, 1.2rem); color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 4px; margin-top: 4vh; opacity: 0; transition: all 1.5s ease; }
        .hero.go .hero-sub { opacity: 1; transition-delay: 1.1s; }
        
        .hero-cta { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 6vh; opacity: 0; transform: translateY(20px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero.go .hero-cta { opacity: 1; transform: translateY(0); transition-delay: 1.4s; }
        
        /* Refined Editorial Buttons */
        .btn.premium-primary { 
            background: #fff; 
            color: #000; 
            border: 1px solid #fff; 
            padding: 16px 40px; 
            font-size: 0.85rem;
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 100px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            text-decoration: none;
        }
        .btn.premium-primary:hover {
            background: transparent;
            color: #fff;
            transform: translateY(-2px);
        }

        .btn.premium-glass { 
            background: rgba(255,255,255,0.02); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255,255,255,0.15); 
            color: #fff; 
            padding: 16px 40px; 
            font-size: 0.85rem; 
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 100px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
            text-decoration: none;
        }
        .btn.premium-glass:hover { 
            background: rgba(255,255,255,0.1); 
            border-color: rgba(255,255,255,0.4); 
            transform: translateY(-2px);
        }
        
        .hero-brand {
            position: absolute;
            bottom: clamp(20px, 4vh, 40px);
            left: clamp(20px, 4vw, 40px);
            font-family: 'Inter', system-ui, sans-serif; 
            font-size: 0.7rem; 
            font-weight: 400; 
            letter-spacing: 2px; 
            color: rgba(255,255,255,0.4); 
            text-transform: uppercase; 
            opacity: 0; 
            transition: all 1.5s ease; 
        }
        .hero.go .hero-brand { opacity: 1; transition-delay: 1.8s; }
      \`}</style>
      
      <div className="hero-bg"><div className="hero-cam"><Photo v={HERO} eager alt="Burdwan Durga Puja pandal 2026 at dusk" /></div></div>
      <Rays />
      <Particles kind="embers" count={25} />
      <div className="hero-shade" />
      
      <div className="hero-in">
        <div className="hero-bn-wrap">
            <p className="hero-bn" lang="bn">{\`${bengaliText}\`}</p>
        </div>
        
        <div className="hero-title-wrap">
            <h1 className="hero-t1">Burdwan</h1>
            <div className="hero-t2">Pujo 2026</div>
        </div>
        
        <p className="hero-sub">Where tradition meets imagination.</p>
        
        <div className="hero-cta">
          <Link to="/pujas" className="btn premium-primary" data-cursor="Explore">Explore Puja</Link>
          <Link to="/featured" className="btn premium-glass" data-cursor="Open">Featured Pandals</Link>
          <Link to="/map" className="btn premium-glass" data-cursor="Open">Pandal Map</Link>
        </div>
      </div>
      
      <p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>
      
    </section>
  );
}
`;

fs.writeFileSync('src/sections/Hero.tsx', premiumHero, 'utf8');
console.log("Applied Best In Class Premium Editorial Redesign");
