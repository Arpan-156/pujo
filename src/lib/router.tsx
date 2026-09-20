import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useReducedMotion } from './motion';

export type Phase = 'idle' | 'cover' | 'reveal';

interface RouterCtx {
  pathname: string;
  query: URLSearchParams;
  phase: Phase;
  label: { en: string; bn: string };
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx>(null as unknown as RouterCtx);
export const useRouter = () => useContext(Ctx);

const TITLES: [RegExp, { en: string; bn: string }][] = [
  [/^\/pujas/, { en: 'All Puja', bn: 'সব পুজো' }],
  [/^\/puja\//, { en: 'The Pandal', bn: 'মণ্ডপ' }],
  [/^\/themes/, { en: 'Themes', bn: 'থিম' }],
  [/^\/featured/, { en: 'Featured Pandals', bn: 'বাছাই মণ্ডপ' }],
  [/^\/bardhaman/, { en: 'Explore Bardhaman', bn: 'বর্ধমান' }],
  [/^\/gallery/, { en: 'Gallery', bn: 'ছবিঘর' }],
  [/^\/map/, { en: 'Puja Map', bn: 'পুজো মানচিত্র' }],
  [/^\/timeline/, { en: 'The Five Days', bn: 'পাঁচ দিন' }],
  [/^\/about/, { en: 'About', bn: 'আমরা' }],
  [/^\/contact/, { en: 'Contact', bn: 'যোগাযোগ' }],
];
const titleFor = (p: string) => TITLES.find(([re]) => re.test(p))?.[1] ?? { en: 'Bardhaman Durga Puja', bn: 'বর্ধমান দুর্গাপূজা' };

const read = () => {
  const h = window.location.hash.replace(/^#/, '') || '/';
  return h.startsWith('/') ? h : `/${h}`;
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(read);
  const [phase, setPhase] = useState<Phase>('idle');
  const [label, setLabel] = useState(titleFor(read()));
  const currentRef = useRef(current);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);

  const go = useCallback(
    (target: string) => {
      if (target === currentRef.current) return;
      if (busy.current) {
        pending.current = target;
        return;
      }
      const swap = () => {
        currentRef.current = target;
        setCurrent(target);
        window.scrollTo(0, 0);
      };
      if (reduced) {
        swap();
        return;
      }
      busy.current = true;
      setLabel(titleFor(target));
      setPhase('cover');
      setTimeout(() => {
        swap();
        setPhase('reveal');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
          if (pending.current) {
            const n = pending.current;
            pending.current = null;
            go(n);
          }
        }, 900);
      }, 720);
    },
    [reduced],
  );

  useEffect(() => {
    const on = () => go(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, [go]);

  const navigate = useCallback((to: string) => {
    const t = to.startsWith('/') ? to : `/${to}`;
    if (`#${t}` === window.location.hash || (t === '/' && !window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = t;
  }, []);

  const value = useMemo<RouterCtx>(() => {
    const [pathname, qs] = current.split('?');
    return { pathname, query: new URLSearchParams(qs ?? ''), phase, label, navigate };
  }, [current, phase, label, navigate]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function Link({ to, children, ...rest }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}
