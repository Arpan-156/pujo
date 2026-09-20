import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { useEntrance } from '../lib/entrance';
import { useFinePointer, useScrollVar } from '../lib/motion';
import { Photo } from '../components/Art';
import { LaalPaar, Particles, Rays, RevealText, Smoke } from '../components/fx';
import { Btn } from '../components/shared';

const HERO: Visual = { art: 'pandal', seed: 7, hue: 10, tone: 'dusk' };

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
    <section ref={ref} className={`hero ${open ? 'go' : ''}`} onPointerMove={move}>
      <div className="hero-bg"><div className="hero-cam"><Photo v={HERO} eager alt="A pandal glowing at dusk" /></div></div>
      <Rays />
      <Smoke className="hero-smoke" />
      <Particles kind="petals" count={22} />
      <Particles kind="embers" count={30} />
      <div className="hero-shade" />
      <div className="wrap hero-in">
        <p className="hero-bn" lang="bn">আলোর শহর, ঢাকের তালে, আবারও ফিরছে পুজোর দিনগুলি।</p>
        <RevealText as="h1" lines={['BARDHAMAN', 'DURGA PUJA', '2026']} className="display hero-h1" live={open} delay={300} />
        <p className="hero-sub">Where tradition meets imagination.</p>
        <div className="hero-cta">
          <Btn to="/pujas" cursor="Explore">Explore Puja</Btn>
          <Btn to="/featured" variant="ghost" cursor="Open">Featured Pandals</Btn>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true"><span>Scroll</span><i /></div>
      <LaalPaar className="hero-paar" />
    </section>
  );
}
