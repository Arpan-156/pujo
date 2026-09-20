import { useEffect, useState } from 'react';
import { NAV } from '../data/site';
import { Link, useRouter } from '../lib/router';
import { Alpana, BrandMark, LaalPaar } from './fx';
import { Menu, X } from './Icons';

export function Nav({ visible }: { visible: boolean }) {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  const active = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to) || (to === '/pujas' && pathname.startsWith('/puja/')));

  return (
    <>
      <header className={`nav ${visible ? 'show' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-brand" data-cursor="Home" aria-label="Bardhaman Durga Puja 2026, home">
          <span className="nav-marks"><BrandMark brand="capturers" size={30} /><BrandMark brand="pujo" size={30} /></span>
          <span className="nav-brand-text"><b>বর্ধমান পূজা</b><small>Puja 2026</small></span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={active(n.to) ? 'on' : ''} aria-current={active(n.to) ? 'page' : undefined}>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <button className="nav-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </header>

      <div className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <Alpana size={720} className="menu-alpana" />
        <button className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={28} /></button>
        <nav className="menu-list" aria-label="Mobile">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} className={active(n.to) ? 'on' : ''} style={{ ['--i' as string]: i }} tabIndex={open ? 0 : -1}>
              <small>{n.bn}</small>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <LaalPaar />
          <p>Burdwan Capturers Official × Banglar Pujo Official</p>
        </div>
      </div>
    </>
  );
}
