const fs = require('fs');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

const elegantHero = `import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { useEntrance } from '../lib/entrance';
import { useFinePointer, useScrollVar } from '../lib/motion';
import { Photo } from '../components/Art';
import { Particles } from '../components/fx';
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
    // Vastly reduced parallax for comfort (0.5 multiplier instead of 2)
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 0.5 - 0.25).toFixed(3));
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 0.5 - 0.25).toFixed(3));
  };

  return (
    <section ref={ref} className={\`hero \${open ? 'go' : ''}\`} onPointerMove={move} style={{ '--mx': 0, '--my': 0 } as any}>
      <style>{\`
        .hero { 
            position: relative; min-height: 100vh; overflow: hidden; 
            display: flex; align-items: center !important; justify-content: center !important; 
            padding: 0 !important; isolation: isolate; background: #0a0808; 
        }
        
        /* Soothing, subtle background movement */
        .hero-bg { position: absolute; inset: -4%; z-index: -5; }
        .hero-cam { 
            position: absolute; inset: 0; 
            transform: translate3d(calc(var(--mx) * -15px), calc(var(--my) * -10px), 0) scale(1.05); 
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); 
        }
        .hero-cam .photo { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) contrast(1.1); animation: breathe 30s ease-in-out infinite alternate; }
        
        @keyframes breathe {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }

        /* Velvet dark shade for absolute eye comfort and text legibility */
        .hero-shade { 
            position: absolute; inset: 0; z-index: -3; 
            background: linear-gradient(180deg, rgba(10,8,8,0.2) 0%, rgba(10,8,8,0.7) 40%, rgba(10,8,8,0.95) 100%); 
        }
        
        .hero-in { 
            position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; 
            width: 100%; max-width: 1200px; padding: 0 40px; margin-top: 10vh;
        }
        
        /* Elegant Bengali Text */
        .hero-bn-wrap { margin-bottom: 4vh; overflow: hidden; }
        .hero-bn { 
            font-family: var(--f-bn); font-size: clamp(1rem, 1.8vw, 1.3rem); color: rgba(255,255,255,0.85); 
            letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            opacity: 0; transform: translateY(30px); transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .hero.go .hero-bn { opacity: 1; transform: translateY(0); transition-delay: 0.3s; }
        
        /* Sophisticated, readable typography */
        .hero-title-wrap { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 4vh; }
        
        .t-main { 
            font-family: 'Cinzel', var(--f-display); 
            font-size: clamp(3.5rem, 10vw, 8rem); 
            font-weight: 500; 
            line-height: 1.1; 
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-shadow: 0 10px 40px rgba(0,0,0,0.6);
            opacity: 0; transform: translateY(40px); filter: blur(8px);
            transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero.go .t-main { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 0.5s; }
        
        .t-main span { color: #e9b558; font-style: italic; font-weight: 400; font-family: 'Playfair Display', var(--f-display); }

        .hero-sub { 
            font-family: 'Inter', system-ui, sans-serif; font-weight: 300; font-size: clamp(1rem, 1.5vw, 1.2rem); 
            color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 6px; 
            opacity: 0; transform: translateY(20px); transition: all 1.5s ease; 
        }
        .hero.go .hero-sub { opacity: 1; transform: translateY(0); transition-delay: 0.9s; }
        
        /* Soft, elegant buttons */
        .hero-cta { 
            display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 6vh; 
            opacity: 0; transform: translateY(20px); transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .hero.go .hero-cta { opacity: 1; transform: translateY(0); transition-delay: 1.2s; }
        
        .btn.elegant-primary { 
            background: #fff; color: #000; border: 1px solid #fff; 
            padding: 16px 44px; font-size: 0.85rem; font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500; text-transform: uppercase; letter-spacing: 3px; border-radius: 100px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
        }
        .btn.elegant-primary:hover { 
            background: #e9b558; border-color: #e9b558; color: #000; 
            box-shadow: 0 15px 40px rgba(233, 181, 88, 0.3); transform: translateY(-3px); 
        }

        .btn.elegant-glass { 
            background: rgba(255,255,255,0.03); backdrop-filter: blur(15px); 
            border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.9); 
            padding: 16px 44px; font-size: 0.85rem; font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500; text-transform: uppercase; letter-spacing: 3px; border-radius: 100px;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
        }
        .btn.elegant-glass:hover { 
            background: rgba(255,255,255,0.1); border-color: #fff; color: #fff; 
            transform: translateY(-3px);
        }
        
        .hero-brand {
            position: absolute; bottom: 40px;
            font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; 
            font-weight: 400; letter-spacing: 3px; color: rgba(255,255,255,0.4); 
            text-transform: uppercase; opacity: 0; transition: all 2s ease; 
        }
        .hero.go .hero-brand { opacity: 1; transition-delay: 1.6s; }
      \`}</style>
      
      <div className="hero-bg">
          <div className="hero-cam"><Photo v={HERO} eager alt="Burdwan Durga Puja pandal 2026 at dusk" /></div>
      </div>
      
      {/* Reduced particles for comfort, very soft floating embers */}
      <Particles kind="embers" count={20} />
      <div className="hero-shade" />
      
      <div className="hero-in">
        <div className="hero-bn-wrap">
            <p className="hero-bn" lang="bn">{\`${bengaliText}\`}</p>
        </div>
        
        <div className="hero-title-wrap">
            <h1 className="t-main">Burdwan <span>Pujo 2026</span></h1>
        </div>
        
        <p className="hero-sub">Where tradition meets imagination</p>
        
        <div className="hero-cta">
          <Link to="/pujas" className="btn elegant-primary" data-cursor="Explore">Explore Puja</Link>
          <Link to="/featured" className="btn elegant-glass" data-cursor="Open">Featured Pandals</Link>
          <Link to="/map" className="btn elegant-glass" data-cursor="Open">Pandal Map</Link>
        </div>
      </div>
      
      <p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers</span></p>
      
    </section>
  );
}
`;

fs.writeFileSync('src/sections/Hero.tsx', elegantHero, 'utf8');
console.log("Applied Elegant Soft Cinematic Redesign");
