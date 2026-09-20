import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { useScrollVar, useFinePointer } from '../lib/motion';
import { Photo } from '../components/Art';
import { Reveal, RevealText, Particles, Smoke } from '../components/fx';
import { Btn } from '../components/shared';

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  useScrollVar(ref);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section ref={ref} className="manifesto" onPointerMove={move}>
      <div className="mf-back" aria-hidden="true"><Photo v={{ art: 'kash', seed: 31, hue: 30, tone: 'dawn', src: '/photos/kash.jpg' }} /></div>
      <Smoke className="mf-smoke" />
      <div className="wrap mf-grid">
        <div className="mf-text">
          <RevealText as="h2" lines={['THE CITY', 'AWAITS', 'THE GODDESS.']} className="display mf-h" />
          <Reveal delay={200} as="p" className="mf-bn"><span lang="bn">শহর জেগে উঠছে ধুনোর গন্ধে, আলোয়, আর ঢাকের প্রথম কাঠির শব্দে।</span></Reveal>
          <Reveal delay={320} as="p" className="mf-en">
            In three weeks, lanes in Bardhaman turn into galleries. Bamboo becomes a gateway, cloth becomes a temple, and the whole town walks out at night to look. This guide follows it street by street, with the pandals we are watching most closely.
          </Reveal>
          <Reveal delay={420}><Btn to="/bardhaman" variant="ghost" cursor="Explore">Explore Bardhaman</Btn></Reveal>
        </div>
        <div className="mf-imgs">
          <Particles kind="petals" count={12} className="mf-parts" />
          <Reveal delay={300} variant="up" className="mf-a"><Photo v={{ art: 'idol', seed: 32, hue: 8, tone: 'dusk', src: '/photos/durga.jpg' }} alt="A Durga idol" /></Reveal>
          <Reveal delay={500} variant="zoom" className="mf-b"><Photo v={{ art: 'dhak', seed: 33, hue: 24, tone: 'dawn', src: '/photos/radio.jpg' }} alt="Radio and Mahalaya mask" /></Reveal>
          <Reveal delay={700} variant="left" className="mf-c"><Photo v={{ art: 'gate', seed: 34, hue: 14, tone: 'dusk', src: '/photos/gate.jpg' }} alt="Dhakis at sunset" /></Reveal>
        </div>
      </div>
    </section>
  );
}
