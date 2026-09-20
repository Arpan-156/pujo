import { PUJA_START } from '../data/site';
import { useCountdown } from '../lib/motion';
import { pad2 } from '../lib/util';
import { Alpana, Particles, Reveal, RevealText, Smoke } from '../components/fx';

/** Each digit re-mounts on change so the old one rolls out and the new one rolls in. */
const Digit = ({ v }: { v: string }) => (
  <span className="cd-digit"><span key={v} className="cd-roll">{v}</span></span>
);

const Cell = ({ n, label, bn }: { n: number; label: string; bn: string }) => {
  const s = label === 'Days' ? String(n).padStart(2, '0') : pad2(n);
  return (
    <div className="cd-cell">
      <div className="cd-num" role="text" aria-label={`${n} ${label}`}>{s.split('').map((c, i) => <Digit key={i} v={c} />)}</div>
      <p className="cd-label">{label}<small lang="bn">{bn}</small></p>
    </div>
  );
};

export function Countdown() {
  const t = useCountdown(PUJA_START);
  return (
    <section className="countdown">
      <Alpana size={980} className="cd-alpana" />
      <Smoke className="cd-smoke" />
      <Particles kind="dust" count={34} />
      <div className="wrap cd-in">
        <RevealText lines={['THE WAIT IS', 'ALMOST OVER']} className="display cd-h" />
        {t.done ? (
          <Reveal className="cd-arrived"><span lang="bn">মা এসে গেছেন</span><b>The Goddess has arrived. Shubho Pujo.</b></Reveal>
        ) : (
          <Reveal delay={200} className="cd-grid">
            <Cell n={t.d} label="Days" bn="দিন" />
            <span className="cd-sep" aria-hidden="true" />
            <Cell n={t.h} label="Hours" bn="ঘণ্টা" />
            <span className="cd-sep" aria-hidden="true" />
            <Cell n={t.m} label="Minutes" bn="মিনিট" />
            <span className="cd-sep" aria-hidden="true" />
            <Cell n={t.s} label="Seconds" bn="সেকেন্ড" />
          </Reveal>
        )}
        <Reveal delay={300} className="cd-note">Until Shashthi morning, Saturday 17 October 2026. The face is unveiled at dusk.</Reveal>
      </div>
    </section>
  );
}
