import { PUJA_START, KALI_PUJA_2026 } from '../data/site';
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

        {/* Ornate Divider */}
        <div className="cd-divider" aria-hidden="true">
          <span className="cd-divider-line" />
          <span className="cd-divider-symbol">🪔</span>
          <span className="cd-divider-line" />
        </div>

        {/* Kali Puja 2026 Special Showcase Card */}
        <Reveal delay={350} className="kali-card">
          <div className="kali-glow" aria-hidden="true" />

          {/* Badge */}
          <div className="kali-badge">
            <span className="kali-diya-emoji">🪔</span>
            <span>এই বছরের শ্যামাপূজা ও দীপাবলি • KALI PUJA 2026</span>
          </div>

          {/* Main Date & Live Status */}
          <div className="kali-header-content">
            <div className="kali-date-info">
              <h3 className="kali-date-title" lang="bn">রবিবার, ৮ই নভেম্বর ২০২৬</h3>
              <p className="kali-date-sub">Sunday, 8 November 2026</p>
              <p className="kali-tithi-detail" lang="bn">
                ২২শে কার্তিক ১৪৩৩ বঙ্গাব্দ • কার্তিক অমাবস্যা তিথি (নিশীথ কাল মহানিশা পূজা)
              </p>
            </div>

            <div className="kali-pill-box">
              {kali.done ? (
                <div className="kali-status-pill done">
                  <span className="kali-pulse-dot" />
                  <span>✨ আজ শ্যামাপূজা ও দীপাবলি • শুভ কালীপূজা</span>
                </div>
              ) : (
                <div className="kali-status-pill">
                  <span className="kali-pulse-dot" />
                  <span lang="bn">
                    আর মাত্র <b className="kali-count-num">{kali.d}</b> দিন <b className="kali-count-num">{kali.h}</b> ঘণ্টা বাকি
                  </span>
                  <small className="kali-count-sub">({kali.d} days to go)</small>
                </div>
              )}
            </div>
          </div>

          {/* 3 Auspicious Dates Grid */}
          <div className="kali-grid">
            <div className="kali-col">
              <div className="kali-col-head">
                <span className="kali-col-icon">🕯️</span>
                <span className="kali-col-title" lang="bn">ভূত চতুর্দশী</span>
              </div>
              <p className="kali-col-date">শনিবার, ৭ নভেম্বর ২০২৬</p>
              <p className="kali-col-desc">১৪ শাক ভক্ষণ ও পূর্বপুরুষদের স্মরণে সন্ধ্যায় ১৪ প্রদীপ প্রজ্জ্বলন</p>
            </div>

            <div className="kali-col kali-col-featured">
              <div className="kali-col-badge">প্রধান উৎসব</div>
              <div className="kali-col-head">
                <span className="kali-col-icon">🪔</span>
                <span className="kali-col-title" lang="bn">শ্যামাপূজা ও দেওয়ালি</span>
              </div>
              <p className="kali-col-date">রবিবার, ৮ নভেম্বর ২০২৬</p>
              <p className="kali-col-desc">অমাবস্যার গভীর রাতে মা কালীর আরাধনা ও চতুর্দিকে আলোর রোশনাই</p>
            </div>

            <div className="kali-col">
              <div className="kali-col-head">
                <span className="kali-col-icon">✨</span>
                <span className="kali-col-title" lang="bn">ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা)</span>
              </div>
              <p className="kali-col-date">বুধবার, ১১ নভেম্বর ২০২৬</p>
              <p className="kali-col-desc">ভাই-বোনের পরম পবিত্র উৎসব — চন্দনের ফোঁটায় দীর্ঘায়ু কামনা</p>
            </div>
          </div>

          {/* Auspicious Chants */}
          <div className="kali-footer-mantra" lang="bn">
            <span className="kali-mantra-line">"তমসো মা জ্যোতির্গময় — আলোর উৎসবে দূর হোক সমস্ত অন্ধকার"</span>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
