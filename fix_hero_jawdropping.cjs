const fs = require('fs');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

const jawDroppingHero = `import { useRef } from 'react';
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
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section ref={ref} className={\`hero \${open ? 'go' : ''}\`} onPointerMove={move} style={{ '--mx': 0, '--my': 0 } as any}>
      <style>{\`
        .hero { 
            position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden; 
            display: flex; align-items: center !important; justify-content: center !important; 
            padding: 0 !important; isolation: isolate; background: #000; perspective: 1000px;
        }
        
        /* Layer 1: Background (Moves opposite to mouse) */
        .hero-bg { position: absolute; inset: -10%; z-index: -5; }
        .hero-cam { 
            position: absolute; inset: 0; 
            transform: translate3d(calc(var(--mx) * -30px), calc(var(--my) * -30px), 0) scale(1.1); 
            transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67); 
        }
        .hero-cam .photo { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) contrast(1.2); }
        
        /* Layer 2: Glowing Animated Orbs */
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6; z-index: -4; animation: float 10s infinite alternate ease-in-out; }
        .orb-1 { top: 10%; left: 15%; width: 500px; height: 500px; background: #ff3300; transform: translate3d(calc(var(--mx) * -60px), calc(var(--my) * -60px), 0); }
        .orb-2 { bottom: 10%; right: 10%; width: 600px; height: 600px; background: #ffaa00; animation-delay: -5s; transform: translate3d(calc(var(--mx) * -40px), calc(var(--my) * -40px), 0); }
        
        @keyframes float {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(100px) scale(1.2); }
        }

        /* Cinematic Vignette */
        .hero-shade { position: absolute; inset: 0; z-index: -3; background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.8) 100%); }
        
        /* Main Container */
        .hero-in { 
            position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; 
            width: 100%; max-width: 1600px; padding: 0 40px; transform-style: preserve-3d;
        }
        
        /* Layer 3: Kinetic Typography */
        .hero-title-wrap { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 3vh; transform-style: preserve-3d; }
        
        .jaw-drop-text {
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 900;
            text-transform: uppercase;
            line-height: 0.85;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.2);
            background: linear-gradient(180deg, #fff 0%, #aaa 100%);
            -webkit-background-clip: text;
            background-clip: text;
            position: relative;
        }

        .t-burdwan { 
            font-size: clamp(4rem, 15vw, 15rem); 
            letter-spacing: -0.02em;
            transform: translate3d(calc(var(--mx) * 40px), calc(var(--my) * 40px), 50px);
            transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            /* Entrance Animation */
            opacity: 0; clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        }
        .hero.go .t-burdwan {
            animation: textReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.3s;
        }

        .t-pujo { 
            font-size: clamp(3rem, 11vw, 11rem);
            color: #ffd500;
            -webkit-text-stroke: 0;
            background: none;
            text-shadow: 0 20px 50px rgba(255, 170, 0, 0.5);
            margin-top: -0.1em;
            transform: translate3d(calc(var(--mx) * 70px), calc(var(--my) * 70px), 100px);
            transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            /* Entrance Animation */
            opacity: 0; clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        }
        .hero.go .t-pujo {
            animation: textReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.5s;
        }

        @keyframes textReveal {
            0% { opacity: 0; clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); transform: translateY(100px) rotateX(45deg); }
            100% { opacity: 1; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translateY(0) rotateX(0deg); }
        }

        /* 3D Glass Pill */
        .hero-bn-wrap { 
            margin-bottom: 3vh; 
            transform: translate3d(calc(var(--mx) * 20px), calc(var(--my) * 20px), 30px);
            transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        .hero-bn { 
            font-family: var(--f-bn); font-size: clamp(1rem, 1.8vw, 1.2rem); color: #fff; 
            padding: 16px 40px; background: rgba(255,255,255,0.05); backdrop-filter: blur(30px); 
            border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; 
            box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4);
            opacity: 0; transform: scale(0.8) translateY(20px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .hero.go .hero-bn { opacity: 1; transform: scale(1) translateY(0); transition-delay: 0.9s; }
        
        .hero-sub { 
            font-family: 'Inter', system-ui, sans-serif; font-weight: 400; font-size: clamp(1rem, 1.5vw, 1.2rem); 
            color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 8px; margin-top: 2vh; 
            opacity: 0; transition: all 1.5s ease; 
            transform: translate3d(calc(var(--mx) * 30px), calc(var(--my) * 30px), 20px);
        }
        .hero.go .hero-sub { opacity: 1; transition-delay: 1.2s; }
        
        /* Interactive Buttons */
        .hero-cta { 
            display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 6vh; 
            opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .hero.go .hero-cta { opacity: 1; transform: translateY(0); transition-delay: 1.4s; }
        
        .btn.jaw-btn { 
            position: relative; overflow: hidden;
            background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); 
            border: 1px solid rgba(255,255,255,0.2); color: #fff; 
            padding: 18px 48px; font-size: 0.9rem; font-family: 'Inter', system-ui, sans-serif;
            font-weight: 600; text-transform: uppercase; letter-spacing: 3px; border-radius: 100px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
            transform: translate3d(calc(var(--mx) * 50px), calc(var(--my) * 50px), 80px);
        }
        .btn.jaw-btn::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: all 0.5s ease;
        }
        .btn.jaw-btn:hover { background: #fff; color: #000; box-shadow: 0 20px 40px rgba(255,255,255,0.3); transform: translate3d(calc(var(--mx) * 50px), calc(var(--my) * 50px), 100px) scale(1.05); }
        .btn.jaw-btn:hover::before { left: 100%; }

        .btn.jaw-btn.gold { background: #ffd500; color: #000; border: none; box-shadow: 0 20px 40px rgba(255, 213, 0, 0.4); }
        .btn.jaw-btn.gold:hover { background: #fff; box-shadow: 0 20px 50px rgba(255,255,255,0.5); }
        
        /* Shimmering Light Sweep Animation */
        .shimmer-sweep {
            position: absolute; top: 0; left: -150%; width: 50%; height: 100%;
            background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
            transform: skewX(-25deg); animation: sweep 6s infinite 2s; z-index: 10; pointer-events: none;
        }
        @keyframes sweep { 0% { left: -150%; } 20% { left: 200%; } 100% { left: 200%; } }
      \`}</style>
      
      <div className="hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="hero-cam"><Photo v={HERO} eager alt="Burdwan Durga Puja pandal 2026 at dusk" /></div>
      </div>
      
      <Particles kind="embers" count={40} />
      <div className="hero-shade" />
      
      <div className="hero-in">
        <div className="hero-bn-wrap">
            <p className="hero-bn" lang="bn">{\`${bengaliText}\`}</p>
        </div>
        
        <div className="hero-title-wrap">
            <h1 className="jaw-drop-text t-burdwan">
                BURDWAN
                <div className="shimmer-sweep"></div>
            </h1>
            <h2 className="jaw-drop-text t-pujo">PUJO 2026</h2>
        </div>
        
        <p className="hero-sub">Where tradition meets imagination</p>
        
        <div className="hero-cta">
          <Link to="/pujas" className="btn jaw-btn gold" data-cursor="Explore">Explore Puja</Link>
          <Link to="/featured" className="btn jaw-btn" data-cursor="Open">Featured Pandals</Link>
          <Link to="/map" className="btn jaw-btn" data-cursor="Open">Pandal Map</Link>
        </div>
      </div>
      
    </section>
  );
}
`;

fs.writeFileSync('src/sections/Hero.tsx', jawDroppingHero, 'utf8');
console.log("Applied Jaw-Dropping 3D Parallax Animation Redesign");
