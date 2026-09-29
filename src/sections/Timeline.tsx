import { useRef } from 'react';
import { STAGES } from '../data/site';
import { useScrollVar } from '../lib/motion';
import { Photo } from '../components/Art';
import { Reveal, RevealText, Particles } from '../components/fx';

export function Timeline() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);
  return (
    <section className="timeline" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <RevealText lines={['MAHALAYA', 'TO DASHAMI']} className="display" />
        <Reveal delay={150} className="lead">Seven mornings and evenings, from the first radio recital to the last drumbeat at the water.</Reveal>
      </div>
      <div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways" style={{ position: 'relative', zIndex: 2 }} onScroll={(e) => {
        const el = e.currentTarget;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
        el.style.setProperty('--hp', progress.toString());
      }}>
        <div className="tl-track">
          <div className="tl-line" aria-hidden="true" style={{ left: '30px', right: '30px' }}><span /></div>
          <ol className="tl-list" style={{ padding: '0 20px' }}>
            {STAGES.map((s, i) => (
              <li key={s.id} className="tl-item">
                <span className="tl-dot" aria-hidden="true" />
                <Reveal delay={i * 110} variant="up">
                  <p className="tl-date">{s.date}</p>
                  <div className="tl-arch"><Photo v={s.visual} alt={`${s.name}: ${s.ritual}`} /></div>
                  <h3><span lang="bn" className="bn">{s.bn}</span>{s.name}</h3>
                  <p className="tl-ritual">{s.ritual}</p>
                  <p className="tl-text">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
