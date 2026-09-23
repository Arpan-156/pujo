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
            <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? 'solid' : ''}`} onClick={() => setCat(c)}>
              {c}<small>{counts[c]}</small>
            </button>
          ))}
        </div>
        {list.length > 0 ? (
          <FlipGrid className="masonry">
            {list.map((g, i) => (
              <button key={g.id} className={`g-item ${g.tall ? 'tall' : ''} ${g.wide ? 'wide' : ''}`} onClick={() => setIdx(i)} data-cursor="View" aria-label={`Open photo: ${g.caption}`}>
                <Photo v={g.visual} alt={g.caption} />
                <span className="g-cap">{g.caption}</span>
              </button>
            ))}
          </FlipGrid>
        ) : (
          <div className="empty-state" style={{ minHeight: '50svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', animation: 'fade 0.8s var(--ease)' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <div style={{ position: 'absolute', inset: 0, border: '2px dashed var(--gold-2)', borderRadius: '50%', animation: 'spin 12s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(233, 181, 88, 0.4)', borderRadius: '50%', animation: 'spin 8s linear infinite reverse' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--gold-2)', fontSize: '2rem' }}>✨</div>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '2rem', fontWeight: 500 }}>No images yet</h3>
            <p style={{ color: 'var(--mute)', maxWidth: '300px' }}>We haven't uploaded photos for this category yet. Check back soon!</p>
          </div>
        )}
      </div>
      <Lightbox items={list} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
