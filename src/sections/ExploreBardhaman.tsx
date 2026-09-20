import { useEffect, useRef, useState } from 'react';
import { useData } from '../data/store';
import { Photo } from '../components/Art';
import { RevealText } from '../components/fx';

export function ExploreBardhaman() {
  const { landmarks } = useData();
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, [landmarks.length]);

  return (
    <section className="story">
      <div className="wrap story-head">
        <RevealText lines={['EXPLORE', 'BARDHAMAN']} className="display" />
      </div>
      <div className="wrap story-grid">
        <div className="story-stage" aria-hidden="true">
          <div className="story-frame">
            {landmarks.map((l, i) => (
              <div key={l.id} className={`story-img ${i === active ? 'on' : ''}`}><Photo v={l.visual} /></div>
            ))}
            <span className="story-count">{String(active + 1).padStart(2, '0')} / {String(landmarks.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="story-blocks">
          {landmarks.map((l, i) => (
            <article key={l.id} data-i={i} ref={(el) => { blocks.current[i] = el; }} className={`story-block ${i === active ? 'on' : ''}`}>
              <div className="story-inline"><Photo v={l.visual} alt={l.title} /></div>
              <p className="story-kind">{l.kind}</p>
              <h3><span lang="bn" className="bn">{l.bn}</span>{l.title}</h3>
              <p>{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
