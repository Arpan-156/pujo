import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { Visual } from '../data/types';
import { Photo } from '../components/Art';
import { vars } from '../lib/util';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from '../components/Icons';

export interface LbItem { visual: Visual; caption: string; credit: string }

export function Lightbox({ items, index, onIndex, onClose }: { items: LbItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const startX = useRef<number | null>(null);
  const open = index !== null && items[index];
  const n = items.length;

  useEffect(() => setZoom(false), [index]);
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('lb-open');
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index! + 1) % n);
      else if (e.key === 'ArrowLeft') onIndex((index! - 1 + n) % n);
    };
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.documentElement.classList.remove('lb-open'); };
  }, [open, index, n, onIndex, onClose]);

  if (!open) return null;
  const it = items[index!];
  const go = (d: number) => onIndex((index! + d + n) % n);
  const down = (e: PointerEvent) => { startX.current = e.clientX; };
  const up = (e: PointerEvent) => {
    if (startX.current === null || zoom) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };
  const aim = (e: PointerEvent<HTMLElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button className="lb-bg" aria-label="Close viewer" onClick={onClose} />
      <div className="lb-top">
        <p className="lb-count">{index! + 1} / {n}</p>
        <div>
          <button className="icon-btn" aria-label={zoom ? 'Zoom out' : 'Zoom in'} onClick={() => setZoom((z) => !z)}>{zoom ? <ZoomOut size={22} /> : <ZoomIn size={22} />}</button>
          <button className="icon-btn" aria-label="Close" onClick={onClose}><X size={24} /></button>
        </div>
      </div>
      <button className="lb-nav prev" aria-label="Previous photo" onClick={() => go(-1)}><ChevronLeft size={28} /></button>
      <button className="lb-nav next" aria-label="Next photo" onClick={() => go(1)}><ChevronRight size={28} /></button>
      <figure className="lb-fig" onPointerDown={down} onPointerUp={up} onPointerMove={aim}>
        <div key={index} className={`lb-img ${zoom ? 'zoom' : ''}`} style={vars({ '--o': origin })} onClick={() => setZoom((z) => !z)}>
          <Photo v={it.visual} alt={it.caption} eager />
        </div>
        <figcaption key={`c${index}`}>
          <p>{it.caption}</p>
          <small>Photo: {it.credit}</small>
        </figcaption>
      </figure>
    </div>
  );
}
