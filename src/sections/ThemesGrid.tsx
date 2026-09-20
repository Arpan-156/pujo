import { useData } from '../data/store';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import { Reveal, RevealText } from '../components/fx';
import { ArrowRight } from '../components/Icons';

export function ThemesGrid({ withHead = true }: { withHead?: boolean }) {
  const { themes, themeCount } = useData();
  return (
    <section className="themes">
      <div className="wrap">
        {withHead && (
          <div className="themes-head">
            <RevealText lines={['PUJA', 'THEMES']} className="display" />
            <Reveal delay={200} className="lead">Every year the committees choose an idea and build it at full size. These are the nine families of ideas you will meet on the streets.</Reveal>
          </div>
        )}
        <div className="theme-grid">
          {themes.map((t, i) => {
            const n = themeCount(t.id);
            return (
              <Reveal key={t.id} variant="zoom" delay={(i % 3) * 90} className={`theme-cell tc${i}`}>
                <Link to={`/pujas?theme=${t.id}`} className="theme-card" data-cursor="Explore">
                  <div className="theme-img"><Photo v={t.visual} alt={t.title} /></div>
                  <div className="theme-shade" />
                  <div className="theme-body">
                    <p lang="bn" className="bn">{t.bn}</p>
                    <h3>{t.title}</h3>
                    <div className="theme-more">
                      <p>{t.description}</p>
                      <p className="theme-count"><b>{n}</b> {n === 1 ? 'Puja' : 'Pujas'} in the directory</p>
                      <span className="theme-go">Explore <ArrowRight size={16} /></span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
