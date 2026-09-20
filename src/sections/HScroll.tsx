import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { clamp, onScrollFrame, useIsMobile, useReducedMotion } from '../lib/motion';

/**
 * Vertical scroll drives a horizontal track on desktop (pinned).
 * On phones and with reduced motion it becomes a native swipe scroller with snap points.
 */
export function HScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const pinned = !mobile && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const o = outer.current!, t = track.current!;
    let lastH = 0;
    return onScrollFrame(() => {
      const vh = window.innerHeight;
      const dist = Math.max(0, t.scrollWidth - window.innerWidth);
      const h = Math.round(dist + vh);
      if (h !== lastH) { o.style.height = `${h}px`; lastH = h; }
      const r = o.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    });
  }, [pinned]);

  return (
    <div ref={outer} className={`hs ${pinned ? 'pinned' : 'native'} ${className}`}>
      <div className="hs-sticky">
        <div ref={track} className="hs-track">{children}</div>
        {pinned && <div className="hs-progress" aria-hidden="true"><span ref={bar} /></div>}
      </div>
    </div>
  );
}
