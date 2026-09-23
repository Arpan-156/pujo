import { useData } from '../data/store';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import { Reveal, RevealText } from '../components/fx';
import { pad2 } from '../lib/util';
import { ArrowUpRight } from '../components/Icons';
import { HScroll } from './HScroll';

export function FeaturedRail({ compact = false }: { compact?: boolean }) {
  const { featuredPujas } = useData();
  return (
    <section className="featured" id="featured">
      {!compact && (
        <div className="wrap feat-head">
          <RevealText lines={['FEATURED', 'PANDALS 2026']} className="display" />
          <Reveal delay={200} className="feat-lead">
            <p>The pandals Burdwan Capturers Official and Banglar Pujo Official are following most closely this year. Scroll sideways.</p>
            <p lang="bn" className="bn" style={{ marginTop: "16px", fontSize: "1.2rem", color: "var(--gold-2)" }}>এ বছরের বাছাই মণ্ডপ</p>
          </Reveal>
        </div>
      )}
      <HScroll>
        {compact && (
          <div className="feat-lead-card" aria-hidden="false">
            <RevealText lines={['FEATURED', 'PANDALS 2026']} className="display" />
          </div>
        )}
        {featuredPujas.map(({ puja, tagline, note }, i) => (
          <Link key={puja.slug} to={`/puja/${puja.slug}`} className="cover" data-cursor="Discover">
            <div className="cover-img"><Photo v={puja.heroImage} alt={`${puja.name} pandal`} /></div>
            <div className="cover-shade" />
            <span className="cover-no" aria-hidden="true">{pad2(i + 1)}</span>
            <div className="cover-text">
              <p className="cover-theme"><small>Theme</small>{puja.theme}</p>
              <h3>{puja.name}</h3>
              <p className="cover-tag">{tagline}</p>
              <p className="cover-note">{note}</p>
              <span className="cover-go">Discover <ArrowUpRight size={18} /></span>
            </div>
          </Link>
        ))}
        <div className="feat-end">
          <p lang="bn" className="bn">আরও মণ্ডপ</p>
          <Link to="/pujas" className="btn ghost" data-cursor="Open"><span>All Puja</span><ArrowUpRight size={18} /></Link>
        </div>
      </HScroll>
    </section>
  );
}
