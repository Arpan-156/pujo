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
      <Particles kind="petals" count={50} className="tl-particles" />
      <div className="wrap">
        <RevealText lines={['MAHALAYA', 'TO DASHAMI']} className="display" />
        <Reveal delay={150} className="lead">Seven mornings and evenings, from the first radio recital to the last drumbeat at the water.</Reveal>
      </div>
      <div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways">
        <div className="tl-track">
          <div className="tl-line" aria-hidden="true"><span /></div>
          <ol className="tl-list">
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
