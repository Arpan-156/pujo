import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';

/* ---------- media queries ---------- */
function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  };
}
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsMobile = () => useMedia('(max-width: 820px)');
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)');

/* ---------- single shared scroll/resize loop ---------- */
type Sub = () => void;
const subs = new Set<Sub>();
let ticking = false;
let bound = false;
export let stableVh = typeof window !== 'undefined' ? window.innerHeight : 800;
export let lastW = typeof window !== 'undefined' ? window.innerWidth : 800;

function frame() {
  ticking = false;
  subs.forEach((s) => s());
}
function kick() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
}

function onResize() {
  if (window.innerWidth !== lastW || Math.abs(window.innerHeight - stableVh) > 150) {
    lastW = window.innerWidth;
    stableVh = window.innerHeight;
  }
  kick();
}

export function onScrollFrame(cb: Sub): () => void {
  if (!bound) {
    bound = true;
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
  }
  subs.add(cb);
  cb();
  return () => {
    subs.delete(cb);
  };
}

/** Sets CSS variable --p (0..1) on an element as the element travels through the viewport. */
export function useScrollVar(ref: RefObject<HTMLElement | null>, mode: 'through' | 'pinned' = 'through', name = '--p') {
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.setProperty(name, mode === 'pinned' ? '0.5' : '0.5');
      return;
    }
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const vh = stableVh;
      let p: number;
      if (mode === 'pinned') p = -r.top / Math.max(1, r.height - vh);
      else p = (vh - r.top) / (vh + r.height);
      el.style.setProperty(name, Math.min(1, Math.max(0, p)).toFixed(4));
    });
  }, [ref, mode, name, reduced]);
}

/* ---------- in-view ---------- */
export function useInView<T extends HTMLElement>(opts: { once?: boolean; margin?: string; threshold?: number } = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { once = true, margin = '0px 0px -12% 0px', threshold = 0.05 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin, threshold]);
  return [ref, inView];
}

/* ---------- countdown ---------- */
export function useCountdown(target: Date) {
  const calc = () => {
    const ms = Math.max(0, target.getTime() - Date.now());
    const s = Math.floor(ms / 1000);
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, done: ms === 0 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return t;
}

/* ---------- mulberry32 ---------- */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
