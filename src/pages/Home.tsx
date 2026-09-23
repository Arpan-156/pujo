import { useData } from '../data/store';
import { PujaCard, Btn } from '../components/shared';
import { Reveal, RevealText, Alpana } from '../components/fx';
import { Hero } from '../sections/Hero';
import { Countdown } from '../sections/Countdown';
import { Manifesto } from '../sections/Manifesto';
import { FeaturedRail } from '../sections/FeaturedRail';
import { ThemesGrid } from '../sections/ThemesGrid';
import { Experiences } from '../sections/Experiences';
import { Timeline } from '../sections/Timeline';
import { PujaMap } from '../sections/PujaMap';
import { Social } from '../sections/About';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import type { PointerEvent } from 'react';
import { useMemo } from 'react';
import { useFinePointer } from '../lib/motion';

export function Home() {
  const { pujas, landmarks } = useData();
  const fine = useFinePointer();
  const preview = useMemo(() => pujas.filter((p) => !p.featured).slice(0, 6), [pujas]);
  const move = (e: PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width).toFixed(3));
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height).toFixed(3));
  };

  return (
    <>
      <Hero />
      <Countdown />
      <Manifesto />
      <FeaturedRail />
      <section className="dir-preview" onPointerMove={move} style={{ '--px': 0.5, '--py': 0.5 } as React.CSSProperties}>
        <div className="dir-spotlight" aria-hidden="true" />
        <div className="wrap">
          <div className="dir-head">
            <div className="dir-head-text">
              <RevealText lines={['BURDWAN', 'PUJA PANDALS']} className="display" />
              <Reveal delay={200} className="lead">Explore the Puja celebrations across Bardhaman. The directory grows every week.</Reveal>
            </div>
            <div className="dir-head-art" aria-hidden="true">
              <Alpana size={400} spin />
            </div>
          </div>
          <div className="pcards">
            {preview.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 90}><PujaCard p={p} /></Reveal>)}
          </div>
          <div className="dir-more"><Btn to="/pujas" cursor="Open">See all {pujas.length} Puja</Btn></div>
        </div>
      </section>
      {/* <ThemesGrid /> */}
      <Experiences />
      <Timeline />
      {/* <section className="bd-teaser">
        <div className="bd-teaser-bg" aria-hidden="true"><Photo v={landmarks[0].visual} /></div>
        <div className="bd-teaser-shade" />
        <div className="wrap bd-teaser-in">
          <RevealText lines={['A TOWN BUILT', 'FOR WALKING']} className="display" />
          <Reveal delay={200} className="lead">Curzon Gate, the railway overbridge, the river at first light and the lanes between them.</Reveal>
          <Reveal delay={300}><Btn to="/bardhaman" cursor="Explore">Explore Bardhaman</Btn></Reveal>
        </div>
      </section> */}
      <div className="wrap map-head">
        <RevealText lines={['PUJA MAP']} className="display" />
        <Reveal delay={150} className="lead">Tap a glowing pin to see who is building what, and where. <Link to="/map" className="ulink">Open the full map</Link></Reveal>
      </div>
      <PujaMap />
      <Social />
    </>
  );
}
