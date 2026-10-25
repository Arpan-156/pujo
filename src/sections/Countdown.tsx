import { PUJA_START, KALI_PUJA_2026 } from '../data/site';
import { useCountdown } from '../lib/motion';
import { pad2 } from '../lib/util';
import { Alpana, Particles, Reveal, RevealText, Smoke } from '../components/fx';

/** Sleek Diya SVG icon */
const DiyaFlameIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="cks-tag-icon" aria-hidden="true">
    <path d="M12 2C10.5 4.8 8 7.5 8 10.5a4 4 0 0 0 8 0c0-3-2.5-5.7-4-8.5z" fill="#f59e0b" />
    <path d="M4 14.5c0 3.6 3.6 6.5 8 6.5s8-2.9 8-6.5c0-1.8-3.2-2.8-8-2.8s-8 1-8 2.8z" stroke="var(--gold)" strokeWidth="1.6" fill="rgba(233, 181, 88, 0.15)" />
  </svg>
);

/** Each digit re-mounts on change so the old one rolls out and the new one rolls in. */
const Digit = ({ v }: { v: string }) => (
  <span className="cd-digit"><span key={v} className="cd-roll">{v}</span></span>
);

const Cell = ({ n, label, bn }: { n: number; label: string; bn: string }) => {
  const s = label === 'Days' ? String(n).padStart(2, '0') : pad2(n);
  return (
    <div className="cd-cell">
      <div className="cd-num" role="text" aria-label={`${n} ${label}`}>
        {s.split('').map((c, i) => <Digit key={i} v={c} />)}
      </div>
      <p className="cd-label">{label}<small lang="bn">{bn}</small></p>
    </div>
  );
};

export function Countdown() {
  const t = useCountdown(PUJA_START);
  const kali = useCountdown(KALI_PUJA_2026);

  return (
    <section className="countdown" id="countdown">
      <Alpana size={980} className="cd-alpana" />
      <Smoke className="cd-smoke" />
      <Particles kind="dust" count={34} />

      <div className="wrap cd-in">

        {/* Top Eyebrow Badge */}
        <Reveal className="cd-eyebrow">
          <span className="cd-eyebrow-symbol">✦</span>
          <span lang="bn">শারদোৎসব ২০২৭</span>
          <span className="cd-eyebrow-sep">•</span>
          <span>COUNTDOWN TO 2027</span>
          <span className="cd-eyebrow-symbol">✦</span>
        </Reveal>

        {/* Display Heading */}
        <RevealText lines={['COUNTDOWN TO', 'DURGA PUJA 2027']} className="display cd-h" />

        {/* Bengali Tagline */}
        <p className="cd-tagline" lang="bn">
          মা আসছেন আবার • আসছে বছর আবার হবে
        </p>

        {/* Active Countdown to Durga Puja 2027 */}
        {t.done ? (
          <Reveal className="cd-arrived">
            <span lang="bn">মা এসে গেছেন</span>
            <b>The Goddess has arrived. Shubho Sharodiya 2027.</b>
          </Reveal>
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

        <Reveal delay={300} className="cd-note">
          Until Maha Shashthi morning, Tuesday 5 October 2027 (১৮ই আশ্বিন ১৪৩৪). The countdown to next year’s grand celebration has begun.
        </Reveal>

        {/* Ultra-Sleek, Compact Kali Puja 2026 Strip */}
        <Reveal delay={350} className="cd-kali-strip">
          <div className="cks-top">
            <div className="cks-tag">
              <DiyaFlameIcon />
              <span>KALI PUJA 2026</span>
            </div>

            <div className="cks-date-group">
              <span className="cks-date-bn" lang="bn">রবিবার, ৮ই নভেম্বর ২০২৬</span>
              <span className="cks-date-en">Sunday, 8 Nov 2026</span>
              <span className="cks-tithi-tag" lang="bn">২২শে কার্তিক • অমাবস্যা নিশীথ কাল</span>
            </div>

            <div className="cks-countdown">
              {kali.done ? (
                <span className="cks-pill live">✨ আজ শ্যামাপূজা ও দীপাবলি</span>
              ) : (
                <span className="cks-pill">
                  <span className="cks-dot" />
                  <span lang="bn">আর মাত্র <b>{kali.d}</b> দিন বাকি</span>
                  <small>({kali.d}d to go)</small>
                </span>
              )}
            </div>
          </div>

          <div className="cks-bottom">
            <div className="cks-chips">
              <span className="cks-chip">
                <span className="cks-chip-date">৭ নভে</span>
                <span className="cks-chip-label" lang="bn">ভূত চতুর্দশী (১৪ প্রদীপ)</span>
              </span>
              <span className="cks-chip-sep" aria-hidden="true">•</span>
              <span className="cks-chip cks-chip-main">
                <span className="cks-chip-date">৮ নভে</span>
                <span className="cks-chip-label" lang="bn">শ্যামাপূজা ও দীপাবলি</span>
              </span>
              <span className="cks-chip-sep" aria-hidden="true">•</span>
              <span className="cks-chip">
                <span className="cks-chip-date">১১ নভে</span>
                <span className="cks-chip-label" lang="bn">ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা)</span>
              </span>
            </div>

            <div className="cks-shloka" lang="bn">
              "তমসো মা জ্যোতির্গময় — আলোর উৎসবে দূর হোক সমস্ত অন্ধকার"
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
