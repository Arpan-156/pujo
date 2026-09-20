import { useMemo, useState } from 'react';
import { useData } from '../data/store';
import { GALLERY_CATEGORIES } from '../data/content';
import { Photo } from '../components/Art';
import { FlipGrid } from '../components/shared';
import { Lightbox } from './Lightbox';

export function GalleryBoard() {
  const { gallery } = useData();
  const [cat, setCat] = useState('All');
  const [idx, setIdx] = useState<number | null>(null);
  const list = useMemo(() => (cat === 'All' ? gallery : gallery.filter((g) => g.category === cat)), [gallery, cat]);
  const counts = useMemo(() => Object.fromEntries(GALLERY_CATEGORIES.map((c) => [c, c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length])), [gallery]);

  return (
    <section className="gallery">
      <div className="wrap">
        <div className="chips sticky-chips" role="tablist" aria-label="Gallery categories">
          {GALLERY_CATEGORIES.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? 'solid' : ''}`} onClick={() => setCat(c)} disabled={!counts[c]}>
              {c}<small>{counts[c]}</small>
            </button>
          ))}
        </div>
        <FlipGrid className="masonry">
          {list.map((g, i) => (
            <button key={g.id} className={`g-item ${g.tall ? 'tall' : ''} ${g.wide ? 'wide' : ''}`} onClick={() => setIdx(i)} data-cursor="View" aria-label={`Open photo: ${g.caption}`}>
              <Photo v={g.visual} alt={g.caption} />
              <span className="g-cap">{g.caption}</span>
            </button>
          ))}
        </FlipGrid>
      </div>
      <Lightbox items={list} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
