import { useRef } from 'react';
import { useScrollVar } from '../lib/motion';
import { Photo } from '../components/Art';
import { Reveal, RevealText } from '../components/fx';
import { Btn } from '../components/shared';

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);
  return (
    <section ref={ref} className="manifesto">
      <div className="mf-back" aria-hidden="true"><Photo v={{ art: 'kash', seed: 31, hue: 30, tone: 'dawn' }} /></div>
      <div className="wrap mf-grid">
        <div className="mf-text">
          <RevealText as="h2" lines={['THE CITY', 'AWAITS', 'THE GODDESS.']} className="display mf-h" />
          <Reveal delay={200} as="p" className="mf-bn"><span lang="bn">শহর জেগে উঠছে ধুনোর গন্ধে, আলোয়, আর ঢাকের প্রথম কাঠির শব্দে।</span></Reveal>
          <Reveal delay={320} as="p" className="mf-en">
            In three weeks, lanes in Bardhaman turn into galleries. Bamboo becomes a gateway, cloth becomes a temple, and the whole town walks out at night to look. This guide follows it street by street, with the pandals we are watching most closely.
          </Reveal>
          <Reveal delay={420}><Btn to="/bardhaman" variant="ghost" cursor="Explore">Explore Bardhaman</Btn></Reveal>
        </div>
        <div className="mf-imgs">
          <div className="mf-a"><Photo v={{ art: 'idol', seed: 32, hue: 8, tone: 'dusk' }} alt="A Durga idol at dusk" /></div>
          <div className="mf-b"><Photo v={{ art: 'dhak', seed: 33, hue: 24, tone: 'dawn' }} alt="Dhak and kash in morning light" /></div>
          <div className="mf-c"><Photo v={{ art: 'gate', seed: 34, hue: 14, tone: 'dusk' }} alt="A gateway pandal" /></div>
        </div>
      </div>
    </section>
  );
}
