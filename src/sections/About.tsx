import { useData } from '../data/store';
import { BRANDS } from '../data/site';
import { Alpana, BrandMark, LaalPaar, Reveal, RevealText } from '../components/fx';
import { Camera, Instagram } from '../components/Icons';
import { SOCIALS } from '../components/shared';
import { vars } from '../lib/util';

const CAPTURERS = [
  ['Mission', 'To document Bardhaman and its visual stories, from the grand gate to the small lane.'],
  ['Photography', 'Street, festival and architecture work made on foot, at every hour of the Puja.'],
  ['Community', 'A group of local photographers, writers and volunteers who know the town by heart.'],
  ['Content creation', 'Reels, photo essays and captions that carry Bardhaman to people far away.'],
  ['Social media', 'Regular posts across Instagram, Facebook and YouTube.'],
];
const PUJO = [
  ['Focus', 'Documenting and showcasing Durga Puja culture across Bengal.'],
  ['Pandals', 'Following the big builds and the small neighbourhood ones with equal care.'],
  ['Themes', 'Recording the idea behind each pandal so it is remembered after Dashami.'],
  ['Celebrations', 'The rituals, the music and the people who keep them going.'],
];

const Rows = ({ rows }: { rows: string[][] }) => (
  <dl className="ab-rows">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
);

export function AboutBrands() {
  return (
    <section className="about">
      <div className="wrap">
        <RevealText lines={['TWO COMMUNITIES.', 'ONE CELEBRATION.']} className="display ab-h" />
      </div>
      <div className="ab-pair">
        <Reveal variant="right" className="ab ab-cap">
          <Alpana size={520} className="ab-alpana" spin />
          <BrandMark brand="capturers" size={84} />
          <h3>Burdwan Capturers Official</h3>
          <p lang="bn" className="bn">বর্ধমানের ছবি, বর্ধমানের গল্প</p>
          <p className="ab-lead">A photography and content community documenting Bardhaman and its visual stories.</p>
          <Rows rows={CAPTURERS} />
        </Reveal>
        <div className="ab-join" aria-hidden="true"><LaalPaar /><span>×</span><LaalPaar /></div>
        <Reveal variant="left" className="ab ab-pujo">
          <Alpana size={520} className="ab-alpana" spin />
          <BrandMark brand="pujo" size={84} />
          <h3>Banglar Pujo Official</h3>
          <p lang="bn" className="bn">বাংলার পুজো, বাংলার মুখ</p>
          <p className="ab-lead">A page devoted to documenting and showcasing Durga Puja culture, pandals, themes and celebrations across Bengal.</p>
          <Rows rows={PUJO} />
        </Reveal>
      </div>
      <p className="wrap ab-note">Descriptions are placeholders. Replace them with each community&rsquo;s own words and logos.</p>
    </section>
  );
}

const Portrait = ({ hue, name }: { hue: number; name: string }) => {
  const ini = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div className="pf-img" style={vars({ '--h': hue })} role="img" aria-label={`Placeholder portrait of ${name}`}>
      <Camera size={36} className="pf-cam" />
      <span>{ini}</span>
    </div>
  );
};

export function Team() {
  const { contributors } = useData();
  return (
    <section className="team">
      <div className="wrap">
        <RevealText lines={['THE PEOPLE', 'BEHIND THE LENS']} className="display" />
        <div className="team-grid">
          {contributors.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 80} className={`pf pf${i % 4}`}>
              <Portrait hue={c.hue} name={c.name} />
              <h3>{c.name}</h3>
              <p className="pf-role">{c.role}</p>
              <p className="pf-bio">{c.bio}</p>
              <a href={c.social} className="pf-soc" aria-label={`${c.name} on Instagram`} data-cursor="Follow"><Instagram size={18} /></a>
            </Reveal>
          ))}
        </div>
        <p className="team-note">Names and portraits are placeholders.</p>
      </div>
    </section>
  );
}

const DETAIL = {
  instagram: ['Photos, reels and stories from the pandals.', 'Follow'],
  facebook: ['Albums, event notes and community updates.', 'Like'],
  youtube: ['Walk-throughs and film-length Puja documentaries.', 'Watch'],
} as const;

export function Social() {
  return (
    <section className="social">
      <div className="wrap">
        <RevealText lines={['FOLLOW THE', 'PUJO JOURNEY']} className="display" />
        {(['capturers', 'pujo'] as const).map((b) => (
          <div className="soc-row" key={b}>
            <div className="soc-who"><BrandMark brand={b} size={44} /><h3>{BRANDS[b].name}</h3></div>
            <div className="soc-cards">
              {SOCIALS.map(({ key, label, Icon }, i) => (
                <Reveal key={key} delay={i * 90} variant="up">
                  <a className={`soc-card ${key}`} href={BRANDS[b].socials[key]} data-cursor={DETAIL[key][1]} aria-label={`${BRANDS[b].short} on ${label}`}>
                    <Icon size={30} />
                    <b>{label}</b>
                    <span>{DETAIL[key][0]}</span>
                    <i className="soc-sweep" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
