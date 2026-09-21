import { memo, useId } from 'react';
import type { ReactNode } from 'react';
import type { ArtKind, Tone, Visual } from '../data/types';
import { rng } from '../lib/motion';

/**
 * Generated placeholder "photographs". Every place the site shows a picture goes through <Photo>.
 * Give a Visual a `src` and the real image is used instead: no other change needed.
 */

export interface BasePal {
  top: string; mid: string; bot: string; glow: string; sil: string; sil2: string; light: string;
}
export type Pal = BasePal & { g: string; wt: string };
export const GOLD = '#f6c76a';

export function palette(tone: Tone, h: number): BasePal {
  const w = (n: number) => ((h + n) % 360 + 360) % 360;
  switch (tone) {
    case 'dusk':
      return { top: `hsl(${w(255)} 38% 11%)`, mid: `hsl(${w(0)} 68% 27%)`, bot: `hsl(${w(24)} 96% 56%)`, glow: `hsl(${w(30)} 95% 62%)`, sil: `hsl(${w(0)} 55% 5%)`, sil2: `hsl(${w(0)} 50% 10%)`, light: GOLD };
    case 'dawn':
      return { top: `hsl(${w(190)} 28% 26%)`, mid: `hsl(${w(10)} 50% 56%)`, bot: `hsl(${w(34)} 92% 80%)`, glow: `hsl(${w(30)} 100% 88%)`, sil: `hsl(${w(190)} 25% 13%)`, sil2: `hsl(${w(190)} 22% 22%)`, light: '#ffe9b0' };
    case 'day':
      return { top: `hsl(205 50% 58%)`, mid: `hsl(190 45% 72%)`, bot: `hsl(50 70% 88%)`, glow: `hsl(48 100% 90%)`, sil: `hsl(${w(0)} 35% 16%)`, sil2: `hsl(${w(0)} 30% 28%)`, light: '#fff3c9' };
    default:
      return { top: `hsl(${w(0)} 55% 4%)`, mid: `hsl(${w(0)} 62% 13%)`, bot: `hsl(${w(6)} 78% 27%)`, glow: `hsl(${w(28)} 92% 58%)`, sil: `hsl(${w(0)} 55% 3%)`, sil2: `hsl(${w(0)} 50% 8%)`, light: GOLD };
  }
}

/* ---------- reusable pieces ---------- */
export const Garland = ({ x1, y1, x2, y2, sag = 40, n = 14, r = 3 }: { x1: number; y1: number; x2: number; y2: number; sag?: number; n?: number; r?: number }) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [(1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2, (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2];
  });
  return (
    <g>
      <path d={`M${x1} ${y1}Q${mx} ${my * 2 - (y1 + y2) / 2} ${x2} ${y2}`} fill="none" stroke="#000" strokeOpacity=".5" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r * 3.4} fill={GOLD} opacity=".14" />
          <circle cx={x} cy={y} r={r} fill={i % 3 === 1 ? '#ff9a5c' : GOLD} />
        </g>
      ))}
    </g>
  );
};

export const Kash = ({ x, y, s = 1, seed = 1, color = '#f8efe0' }: { x: number; y: number; s?: number; seed?: number; color?: string }) => {
  const r = rng(seed);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 7 }, (_, i) => {
        const a = -0.55 + i * 0.18 + (r() - 0.5) * 0.08;
        const h = 90 + r() * 70;
        const ex = Math.sin(a) * h, ey = -Math.cos(a) * h;
        return (
          <g key={i}>
            <path d={`M0 0Q${ex * 0.3} ${ey * 0.6} ${ex} ${ey}`} stroke="#3a2a1a" strokeWidth="1.6" fill="none" />
            <ellipse cx={ex} cy={ey - 6} rx="7" ry="26" fill={color} opacity=".82" transform={`rotate(${a * 57} ${ex} ${ey})`} />
            <ellipse cx={ex} cy={ey - 6} rx="3" ry="22" fill="#fff" opacity=".5" transform={`rotate(${a * 57} ${ex} ${ey})`} />
          </g>
        );
      })}
    </g>
  );
};

const Person = ({ x, y, s = 1, fill, del = 0 }: { x: number; y: number; s?: number; fill: string; del?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} style={{ animation: `art-float ${3 + (del % 2)}s ease-in-out ${-del}s infinite alternate` }}>
    <circle cx="0" cy="-26" r="8" />
    <path d="M-16 6C-16-14-9-18 0-18S16-14 16 6z" />
  </g>
);

const Crowd = ({ y, n, seed, fill, s = 1, w = 800 }: { y: number; n: number; seed: number; fill: string; s?: number; w?: number }) => {
  const r = rng(seed);
  return <g>{Array.from({ length: n }, (_, i) => {
    const x = (i + r() * 0.6) * (w / n);
    return <Person key={i} x={x} y={y + r() * 16} s={s * (0.8 + r() * 0.5)} fill={fill} del={r() * 5} />;
  })}</g>;
};

const Stars = ({ seed, n = 46, h = 300 }: { seed: number; n?: number; h?: number }) => {
  const r = rng(seed + 99);
  return <g fill="#fff">{Array.from({ length: n }, (_, i) => <circle key={i} cx={r() * 800} cy={r() * h} r={r() * 1.2 + 0.3} opacity={0.25 + r() * 0.6} style={{ animation: `art-twinkle ${2 + r() * 4}s ease-in-out ${r() * -5}s infinite alternate` }} />)}</g>;
};

const Bokeh = ({ seed, n = 18, y0 = 0, y1 = 600, col, op = 0.22 }: { seed: number; n?: number; y0?: number; y1?: number; col: string; op?: number }) => {
  const r = rng(seed + 33);
  return <g fill={col}>{Array.from({ length: n }, (_, i) => <circle key={i} cx={r() * 800} cy={y0 + r() * (y1 - y0)} r={8 + r() * 24} opacity={r() * op} style={{ animation: `art-float ${4 + r() * 6}s ease-in-out ${r() * -5}s infinite alternate` }} />)}</g>;
};

/* ---------- scenes ---------- */
type Ctx = { p: Pal; r: () => number; seed: number; tone: Tone };

const Tier = ({ cx, y, w, h, p, n }: { cx: number; y: number; w: number; h: number; p: Pal; n: number }) => (
  <g>
    <path d={`M${cx - w / 2} ${y + h}H${cx + w / 2}L${cx + w / 2 - 12} ${y}H${cx - w / 2 + 12}z`} fill={p.sil} />
    <path d={`M${cx - w / 2 - 6} ${y}H${cx + w / 2 + 6}`} stroke={GOLD} strokeOpacity=".6" strokeWidth="3" />
    {Array.from({ length: n }, (_, i) => {
      const gx = cx - w / 2 + 22 + (i * (w - 44)) / Math.max(1, n - 1);
      return <path key={i} d={`M${gx - 7} ${y + h - 8}V${y + 24}a7 7 0 0114 0V${y + h - 8}z`} fill={GOLD} opacity={0.75 + (i % 2) * 0.2} />;
    })}
  </g>
);

const scenes: Record<ArtKind, (c: Ctx) => ReactNode> = {
  pandal: ({ p, r, seed }) => {
    const tiers = 3 + Math.floor(r() * 3), cx = 400 + (r() - 0.5) * 50, w0 = 340 + r() * 90;
    return (
      <>
        <Stars seed={seed} />
        <ellipse cx={cx} cy="430" rx="360" ry="200" fill={p.g} />
        <path d="M0 470H800V600H0z" fill={p.sil} />
        {[-1, 1].map((d) => (
          <g key={d}>
            <Tier cx={cx + d * (w0 / 2 + 70)} y={380} w={100} h={90} p={p} n={2} />
            <Tier cx={cx + d * (w0 / 2 + 70)} y={330} w={64} h={50} p={p} n={1} />
            <path d={`M${cx + d * (w0 / 2 + 70)} 300l-8 30h16z`} fill={p.sil} />
          </g>
        ))}
        {Array.from({ length: tiers }, (_, t) => <Tier key={t} cx={cx} y={440 - (t + 1) * 62} w={w0 * (1 - t * 0.15)} h={62} p={p} n={Math.max(2, Math.floor((w0 * (1 - t * 0.15)) / 36))} />)}
        <path d={`M${cx} ${440 - tiers * 62 - 50}l-12 50h24z`} fill={p.sil} />
        <circle cx={cx} cy={440 - tiers * 62 - 56} r="5" fill={GOLD} />
        <path d={`M${cx - 44} 470V420a44 44 0 0188 0V470z`} fill={GOLD} opacity=".95" />
        <path d={`M${cx - 44} 470V420a44 44 0 0188 0V470z`} fill={p.g} />
        <Garland x1={0} y1={250} x2={cx - w0 / 2} y2={440 - tiers * 62 + 20} sag={50} n={12} />
        <Garland x1={800} y1={250} x2={cx + w0 / 2} y2={440 - tiers * 62 + 20} sag={50} n={12} />
        <Garland x1={40} y1={470} x2={760} y2={470} sag={-22} n={22} r={2.4} />
        <Crowd y={548} n={26} seed={seed} fill={p.sil} s={1.4} />
      </>
    );
  },

  idol: ({ p, r, seed }) => {
    const arms = Array.from({ length: 10 }, (_, i) => -84 + i * 18.7);
    return (
      <>
        <Stars seed={seed} n={22} />
        <path d="M120 600V270a280 280 0 01560 0V600z" fill={p.sil2} />
        <path d="M120 600V270a280 280 0 01560 0V600z" fill="none" stroke={GOLD} strokeOpacity=".55" strokeWidth="3" />
        <path d="M150 600V275a250 250 0 01500 0V600z" fill="none" stroke={GOLD} strokeOpacity=".25" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="400" cy="250" r="130" fill={p.g} />
        <circle cx="400" cy="250" r="96" fill="none" stroke={GOLD} strokeWidth="2" opacity=".8" />
        <g stroke={GOLD} strokeWidth="1.5" opacity=".55">
          {Array.from({ length: 36 }, (_, i) => <path key={i} d={`M400 250L${400 + Math.cos((i * 10 * Math.PI) / 180) * 150} ${250 + Math.sin((i * 10 * Math.PI) / 180) * 150}`} />)}
        </g>
        {arms.map((a, i) => {
          const rad = ((a - 90) * Math.PI) / 180, ex = 400 + Math.cos(rad) * 130, ey = 300 + Math.sin(rad) * 110;
          return (
            <g key={i}>
              <path d={`M400 305Q${400 + Math.cos(rad) * 60} ${300 + Math.sin(rad) * 30} ${ex} ${ey}`} stroke={p.sil} strokeWidth="9" fill="none" strokeLinecap="round" />
              <path d={`M${ex} ${ey}l${Math.cos(rad) * 22} ${Math.sin(rad) * 22}`} stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
              <circle cx={ex} cy={ey} r="4" fill={GOLD} />
            </g>
          );
        })}
        <path d="M400 300c-30 0-46 30-48 90l-40 130h176l-40-130c-2-60-18-90-48-90z" fill={p.sil} />
        <path d="M356 470l-40 50h168l-40-50z" fill="#8f0f1c" opacity=".9" />
        <circle cx="400" cy="265" r="24" fill={p.sil} />
        <path d="M372 255l14-42 14 24 14-24 14 42z" fill={GOLD} />
        <circle cx="392" cy="266" r="2.2" fill={GOLD} /><circle cx="408" cy="266" r="2.2" fill={GOLD} />
        <path d="M120 520h120q40-40 80-6l20-30 30 40v30H120z" fill={p.sil} opacity=".95" />
        {[[190, 400], [610, 400], [230, 340], [570, 340]].map(([x, y], i) => (
          <g key={i} fill={p.sil} stroke={GOLD} strokeOpacity=".4">
            <circle cx={x} cy={y} r="14" /><path d={`M${x - 26} ${y + 90}c0-56 12-70 26-70s26 14 26 70z`} />
          </g>
        ))}
        <path d="M0 540H800V600H0z" fill={p.sil} />
        {[...Array(9)].map((_, i) => <path key={i} d={`M${300 + i * 25} 570q4-22 0-30q-6 8 0 30z`} fill={GOLD} opacity={0.5 + r() * 0.5} />)}
      </>
    );
  },

  gate: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={30} />
      <ellipse cx="400" cy="460" rx="380" ry="170" fill={p.g} />
      <path d="M0 470H800V600H0z" fill={p.sil} />
      <rect x="150" y="215" width="500" height="255" fill={p.sil2} />
      <rect x="150" y="215" width="500" height="255" fill="none" stroke={GOLD} strokeOpacity=".4" strokeWidth="2" />
      <path d="M130 215H670L640 190H160z" fill={p.sil} stroke={GOLD} strokeOpacity=".5" />
      <path d="M340 190V150a60 60 0 01120 0V190z" fill={p.sil} stroke={GOLD} strokeOpacity=".5" />
      <path d="M400 92v-24" stroke={GOLD} strokeWidth="3" /><circle cx="400" cy="64" r="5" fill={GOLD} />
      {[170, 610].map((x) => <path key={x} d={`M${x} 215V170a10 10 0 0120 0V215z`} fill={p.sil} stroke={GOLD} strokeOpacity=".5" />)}
      {[[200, 52, 140], [548, 52, 140]].map(([x, w, h]) => <path key={x} d={`M${x} 470V${470 - h}a${w / 2} ${w / 2} 0 01${w} 0V470z`} fill={GOLD} opacity=".85" />)}
      <path d="M320 470V300a80 80 0 01160 0V470z" fill={GOLD} opacity=".95" />
      <path d="M320 470V300a80 80 0 01160 0V470z" fill={p.g} />
      {[290, 510].map((x) => <rect key={x} x={x} y="230" width="14" height="240" fill={p.sil} />)}
      <Crowd y={520} n={22} seed={seed} fill={p.sil} s={1.5} />
      <Garland x1={150} y1={215} x2={650} y2={215} sag={44} n={20} r={2.4} />
    </>
  ),

  station: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={20} h={220} />
      <ellipse cx="400" cy="380" rx="400" ry="120" fill={p.g} />
      <path d="M0 400H800V600H0z" fill={p.sil} />
      <path d="M60 400V300H740V400z" fill={p.sil2} />
      <path d="M340 300V230L400 190 460 230V300z" fill={p.sil2} stroke={GOLD} strokeOpacity=".4" />
      <circle cx="400" cy="248" r="20" fill={p.light} opacity=".95" /><path d="M400 248V235M400 248l9 5" stroke={p.sil} strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={84 + i * 56} y="320" width="24" height="46" fill={GOLD} opacity=".8" />)}
      <path d="M0 410H800V428H0z" fill={p.sil2} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={i * 52 + 10} y="410" width="6" height="60" fill={p.sil} />)}
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${330 + i * 40} 600L${396 + i * 2.6} 470`} stroke="#000" strokeOpacity=".55" strokeWidth={5 - i} />)}
      <path d="M0 470H800" stroke="#000" strokeOpacity=".3" />
      <rect x="250" y="450" width="300" height="52" rx="6" fill={p.sil} />
      <circle cx="270" cy="476" r="9" fill="#fff" opacity=".9" /><circle cx="270" cy="476" r="26" fill="#fff" opacity=".12" />
      <path d="M0 470V450L90 430V470zM160 470V430L280 420V470z" fill="none" />
      <Crowd y={560} n={12} seed={seed + 3} fill={p.sil} s={1.7} />
    </>
  ),

  bridge: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={40} h={240} />
      <Bokeh seed={seed} n={12} y0={260} y1={420} col={GOLD} op={0.35} />
      <ellipse cx="400" cy="420" rx="420" ry="130" fill={p.g} />
      <path d="M0 440H800V600H0z" fill={p.sil} />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${380 + (i - 2) * 30} 440L${400 + (i - 2) * 260} 600`} stroke={GOLD} strokeOpacity=".22" strokeWidth="3" />)}
      <path d="M0 250H800V272H0z" fill={p.sil2} stroke={GOLD} strokeOpacity=".4" />
      <path d="M0 250V220H800V250" fill="none" stroke={p.sil2} strokeWidth="3" />
      {Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${i * 32 + 8} 250V220`} stroke={p.sil2} strokeWidth="2" />)}
      {Array.from({ length: 9 }, (_, i) => <g key={i}><circle cx={i * 100 + 40} cy="210" r="22" fill={GOLD} opacity=".18" /><circle cx={i * 100 + 40} cy="210" r="4" fill="#fff" /><path d={`M${i * 100 + 40} 214V250`} stroke={p.sil} strokeWidth="2" /></g>)}
      {[180, 620].map((x) => <path key={x} d={`M${x} 272V440`} stroke={p.sil} strokeWidth="14" />)}
      <path d="M0 250L-60 420M800 250L860 420" stroke={p.sil2} strokeWidth="26" />
      <Crowd y={244} n={14} seed={seed} fill={p.sil} s={0.7} />
    </>
  ),

  river: ({ p, seed, tone }) => (
    <>
      <circle cx="560" cy="300" r="90" fill={p.glow} opacity=".35" />
      <circle cx="560" cy="300" r="34" fill={p.glow} />
      <Stars seed={seed} n={tone === 'night' ? 40 : 6} h={240} />
      <rect y="330" width="800" height="270" fill={p.wt} />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${(i * 97) % 760} ${350 + (i * 29) % 230}h${40 + (i * 13) % 90}`} stroke={p.glow} strokeOpacity=".28" strokeWidth="2" strokeLinecap="round" />)}
      <rect x="520" y="336" width="80" height="250" fill={p.glow} opacity=".18" />
      <path d="M0 330q120-26 260-6t300-8T800 326V344H0z" fill={p.sil2} />
      <g fill={p.sil}><path d="M120 470h200l-24 26H150z" /><path d="M220 470V420" stroke={p.sil} strokeWidth="3" /><circle cx="250" cy="452" r="8" /><path d="M240 470c0-14 4-20 10-20s10 6 10 20z" /></g>
      <path d="M0 560q160-30 340-10t460-18V600H0z" fill={p.sil} />
      <Kash x={70} y={585} s={1.3} seed={seed} />
      <Kash x={690} y={590} s={1.6} seed={seed + 1} />
      <Kash x={760} y={570} s={1} seed={seed + 2} />
    </>
  ),

  temple: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={24} h={220} />
      <ellipse cx="400" cy="450" rx="380" ry="150" fill={p.g} />
      <path d="M0 470H800V600H0z" fill={p.sil} />
      {[[140, 0.55], [660, 0.55], [60, 0.4], [740, 0.4]].map(([x, s], i) => (
        <g key={i} transform={`translate(${x} 470) scale(${s})`}><path d="M-60 0V-120H60V0z" fill={p.sil2} /><path d="M-72-120Q0-170 72-120L52-150Q0-176-52-150z" fill={p.sil} /><path d="M0-158v-30" stroke={GOLD} strokeWidth="4" /></g>
      ))}
      <rect x="270" y="320" width="260" height="150" fill={p.sil2} />
      {Array.from({ length: 6 }, (_, c) => Array.from({ length: 3 }, (_, rr) => <rect key={`${c}-${rr}`} x={282 + c * 41} y={332 + rr * 44} width="30" height="34" fill={GOLD} opacity={0.16 + ((c + rr) % 3) * 0.06} />))}
      <path d="M340 470V400a60 60 0 01120 0V470z" fill={GOLD} opacity=".9" /><path d="M340 470V400a60 60 0 01120 0V470z" fill={p.g} />
      <path d="M250 320Q400 250 550 320L520 290Q400 236 280 290z" fill={p.sil} stroke={GOLD} strokeOpacity=".5" />
      <path d="M300 290Q400 205 500 290L470 262Q400 200 330 262z" fill={p.sil} stroke={GOLD} strokeOpacity=".5" />
      <path d="M400 230v-50" stroke={GOLD} strokeWidth="4" /><circle cx="400" cy="172" r="7" fill={GOLD} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <g key={i}><path d={`M${80 + i * 90} 500q8-24 0-30q-9 8 0 30z`} fill={GOLD} /></g>)}
    </>
  ),

  street: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={20} h={200} />
      <circle cx="400" cy="300" r="180" fill={p.g} />
      <path d="M0 600L400 300L800 600z" fill={p.sil2} />
      <path d="M-40 600L200 280V150L0 60V0H400V300z" fill={p.sil} opacity=".0" />
      <path d="M0 0H360V300L200 330 0 480z" fill={p.sil} /><path d="M800 0H440V300L600 330 800 480z" fill={p.sil} />
      {Array.from({ length: 5 }, (_, i) => <g key={i}><rect x={20 + i * 55} y={90 + i * 34} width={30 - i * 3} height={40 - i * 4} fill={GOLD} opacity=".7" /><rect x={780 - i * 55 - (30 - i * 3)} y={90 + i * 34} width={30 - i * 3} height={40 - i * 4} fill={GOLD} opacity=".6" /></g>)}
      {[0, 1, 2, 3].map((i) => <Garland key={i} x1={40 + i * 55} y1={60 + i * 42} x2={760 - i * 55} y2={60 + i * 42} sag={40 - i * 8} n={12 - i} r={3 - i * 0.4} />)}
      <Crowd y={570} n={9} seed={seed} fill={p.sil} s={1.9} />
      <Crowd y={470} n={9} seed={seed + 4} fill={p.sil} s={0.9} w={800} />
    </>
  ),

  dhak: ({ p, seed }) => (
    <>
      <circle cx="400" cy="300" r="240" fill={p.g} />
      {[0, 1, 2, 3, 4, 5].map((i) => <Kash key={i} x={140 + i * 100} y={330} s={1.1} seed={seed + i} />)}
      <path d="M180 360Q400 300 620 360L640 420Q400 470 160 420z" fill={p.sil} opacity="0" />
      <path d="M200 350C230 330 570 330 600 350L640 470C560 520 240 520 160 470z" fill={p.sil2} stroke={GOLD} strokeOpacity=".55" strokeWidth="2" />
      <ellipse cx="400" cy="350" rx="200" ry="22" fill={p.sil} stroke={GOLD} strokeOpacity=".5" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${230 + i * 30} 352L${190 + i * 38} 495`} stroke="#c9a15a" strokeOpacity=".55" strokeWidth="2" />)}
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${230 + i * 30} 352L${290 + i * 24 - 60} 495`} stroke="#c9a15a" strokeOpacity=".35" strokeWidth="2" />)}
      <path d="M200 420Q400 450 600 420" stroke="#a02226" strokeWidth="14" fill="none" opacity=".85" />
      <path d="M90 300L220 372" stroke={GOLD} strokeWidth="6" strokeLinecap="round" /><circle cx="88" cy="298" r="9" fill={GOLD} />
      <path d="M710 300L580 372" stroke={GOLD} strokeWidth="6" strokeLinecap="round" /><circle cx="712" cy="298" r="9" fill={GOLD} />
      <path d="M0 540H800V600H0z" fill={p.sil} />
    </>
  ),

  crowd: ({ p, seed }) => (
    <>
      <circle cx="400" cy="320" r="260" fill={p.g} />
      <Bokeh seed={seed} n={24} y0={40} y1={360} col={GOLD} op={0.34} />
      <Crowd y={430} n={20} seed={seed} fill={p.sil2} s={1.1} />
      <Crowd y={480} n={16} seed={seed + 1} fill={p.sil} s={1.5} />
      <Crowd y={545} n={11} seed={seed + 2} fill={p.sil} s={2.1} />
      <path d="M0 590H800V600H0z" fill={p.sil} />
    </>
  ),

  market: ({ p, seed }) => (
    <>
      <Bokeh seed={seed} n={30} y0={60} y1={420} col={GOLD} op={0.4} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M${20 + i * 195} 300h175l14 50h-203z`} fill={['#8f0f1c', '#c1121f', '#a13b00', '#6b0d18'][i]} />
          {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${26 + i * 195 + k * 22} 350q10 14 20 0`} fill={p.sil} />)}
          <rect x={30 + i * 195} y="356" width="160" height="140" fill={p.sil2} />
          {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={54 + i * 195 + k * 24} cy={440 + (k % 2) * 16} r="9" fill={['#f6c76a', '#ffffff', '#ff7a45'][k % 3]} opacity=".85" />)}
          <circle cx={110 + i * 195} cy="330" r="34" fill={GOLD} opacity=".2" />
          <circle cx={110 + i * 195} cy="330" r="6" fill="#fff" />
        </g>
      ))}
      <path d="M0 500H800V600H0z" fill={p.sil} />
    </>
  ),

  food: ({ p, seed }) => {
    const r = rng(seed);
    return (
      <>
        <Bokeh seed={seed} n={26} col={GOLD} op={0.4} />
        <ellipse cx="400" cy="450" rx="290" ry="80" fill="#000" opacity=".45" />
        <ellipse cx="400" cy="420" rx="270" ry="86" fill="#f5e9d0" />
        <ellipse cx="400" cy="420" rx="234" ry="66" fill="#e9d7b0" />
        {Array.from({ length: 70 }, (_, i) => {
          const a = r() * 6.28, d = Math.sqrt(r()) * 200;
          return <circle key={i} cx={400 + Math.cos(a) * d} cy={410 + Math.sin(a) * d * 0.32 - (1 - d / 200) * 22} r={9 + r() * 5} fill={i % 3 ? '#fff6e0' : '#f0b64a'} stroke="#c88a2a" strokeOpacity=".3" />;
        })}
        <path d="M110 440q290 120 580 0" stroke={p.sil} strokeWidth="6" fill="none" opacity=".5" />
      </>
    );
  },

  dhunuchi: ({ p, seed, r }) => (
    <>
      <circle cx="400" cy="380" r="260" fill={p.g} />
      {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${340 + i * 30} 400C${260 + i * 60} 300 ${520 - i * 40} 230 ${400 + (i - 2) * 50} 90`} stroke="#fff" strokeOpacity=".09" strokeWidth={28 - i * 3} fill="none" strokeLinecap="round" />)}
      <g fill={p.sil}>
        {[[300, 470], [500, 470]].map(([x, y]) => (
          <g key={x}><path d={`M${x - 46} ${y - 30}L${x - 20} ${y + 24}H${x + 20}L${x + 46} ${y - 30}z`} /><rect x={x - 12} y={y + 22} width="24" height="30" /><path d={`M${x - 30} ${y + 52}h60l-10-8h-40z`} /></g>
        ))}
      </g>
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={260 + r() * 280} cy={380 + r() * 90} r={1.6 + r() * 2.2} fill={i % 2 ? '#ff7a2d' : GOLD} opacity=".9" />)}
      {[[300, 440], [500, 440]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="24" fill="#ff8a3a" opacity=".55" />)}
      <path d="M0 540H800V600H0z" fill={p.sil} />
      <Crowd y={576} n={12} seed={seed} fill={p.sil} s={1.8} />
    </>
  ),

  sindoor: ({ p, seed, r }) => (
    <>
      <Bokeh seed={seed} n={20} col="#ff4a3a" op={0.35} />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={100 + r() * 600} cy={120 + r() * 300} r={30 + r() * 70} fill={['#d2101f', '#e8322a', '#9c0a16'][i % 3]} opacity={0.14 + r() * 0.2} />)}
      {[[220, 400, 1.5], [420, 430, 1.8], [610, 410, 1.5]].map(([x, y, s], i) => (
        <g key={i} fill={p.sil} transform={`translate(${x} ${y}) scale(${s})`}>
          <circle cx="0" cy="-40" r="34" /><path d="M-70 120C-70 20-40-6 0-6S70 20 70 120z" />
          <path d="M-14-70q14-10 28 0" stroke="#d2101f" strokeWidth="6" fill="none" /><circle cx="0" cy="-58" r="4" fill="#d2101f" />
        </g>
      ))}
      <path d="M300 300q60-60 140-30" stroke="#ff7a5c" strokeWidth="12" strokeLinecap="round" opacity=".3" fill="none" />
      {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={r() * 800} cy={r() * 460} r={0.8 + r() * 2.4} fill="#ff5a4a" opacity=".8" />)}
    </>
  ),

  kash: ({ p, seed }) => (
    <>
      <circle cx="580" cy="300" r="120" fill={p.glow} opacity=".35" /><circle cx="580" cy="300" r="40" fill={p.glow} />
      <path d="M0 420Q200 390 400 410T800 400V600H0z" fill={p.sil2} />
      {Array.from({ length: 16 }, (_, i) => <Kash key={i} x={20 + i * 52} y={470 + (i % 3) * 30} s={0.9 + (i % 4) * 0.25} seed={seed + i} />)}
      <path d="M0 560Q300 540 800 570V600H0z" fill={p.sil} />
    </>
  ),

  morning: (c) => scenes.kash(c),

  abstract: ({ p, r, seed }) => (
    <>
      <circle cx="400" cy="300" r="280" fill={p.g} />
      {Array.from({ length: 22 }, (_, i) => {
        const x = 30 + i * 36 + r() * 10, l = 80 + r() * 260;
        return (
          <g key={i}>
            <path d={`M${x} 0V${l}`} stroke={GOLD} strokeOpacity=".5" />
            <path d={`M${x} ${l}l9 18-9 18-9-18z`} fill={i % 3 ? GOLD : '#ff5a4a'} opacity=".85" />
            <circle cx={x} cy={l + 18} r="22" fill={GOLD} opacity=".1" />
          </g>
        );
      })}
      {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={200 + i * 100} cy={420 + (i % 2) * 40} r={60 + r() * 60} fill="none" stroke={p.glow} strokeOpacity=".4" strokeWidth="2" />)}
      <Stars seed={seed} n={14} />
      <path d="M0 540H800V600H0z" fill={p.sil} />
    </>
  ),

  rural: ({ p, seed }) => (
    <>
      <circle cx="600" cy="270" r="90" fill={p.glow} opacity=".4" /><circle cx="600" cy="270" r="36" fill={p.glow} />
      <path d="M0 420H800V600H0z" fill={p.sil2} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M0 ${440 + i * 18}Q400 ${420 + i * 18} 800 ${440 + i * 18}`} stroke={p.glow} strokeOpacity=".16" strokeWidth="2" fill="none" />)}
      <path d="M200 430V350L300 290 400 350V430z" fill={p.sil} /><path d="M180 352L300 268 420 352L400 356 300 290 200 356z" fill="#5a3a1a" />
      <rect x="276" y="380" width="46" height="50" fill={GOLD} opacity=".9" />
      {[[110, 430], [500, 440], [650, 425]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y}q-6-100 6-150`} stroke={p.sil} strokeWidth="9" fill="none" />{[-1, 0, 1].map((d) => <path key={d} d={`M${x + 6} ${y - 150}q${d * 40 + 5} -30 ${d * 70 + 10} 6`} stroke={p.sil} strokeWidth="5" fill="none" />)}</g>)}
      <circle cx="300" cy="500" r="30" fill={GOLD} opacity=".2" />
      <Kash x={720} y={520} s={0.9} seed={seed} />
    </>
  ),

  eco: ({ p, r }) => (
    <>
      <circle cx="420" cy="250" r="220" fill={p.glow} opacity=".25" />
      {Array.from({ length: 14 }, (_, i) => {
        const x = 30 + i * 56;
        return <g key={i}><path d={`M${x} 600V${80 + r() * 80}`} stroke={p.sil2} strokeWidth="10" />{[130, 230, 330, 430].map((y) => <path key={y} d={`M${x - 8} ${y}h16`} stroke={p.sil} strokeWidth="3" />)}</g>;
      })}
      {Array.from({ length: 36 }, (_, i) => (
        <g key={i} style={{ animation: `art-fall ${6 + r() * 8}s linear ${r() * -10}s infinite` }}>
          <ellipse cx={r() * 800} cy={20 + r() * 220} rx="10" ry="32" transform={`rotate(${r() * 180} ${r() * 800} ${r() * 400})`} fill={`hsl(${100 + r() * 40} 50% ${28 + r() * 18}%)`} opacity=".85" />
        </g>
      ))}
      {[[200, 300], [400, 260], [600, 320]].map(([x, y], i) => (
        <g key={i} style={{ transformOrigin: `${x}px 0px`, animation: `art-swing ${3 + r()}s ease-in-out ${r() * -2}s infinite alternate` }}>
          <path d={`M${x} 0V${y}`} stroke="#8a6a3a" />
          <path d={`M${x - 22} ${y}h44l-8 44h-28z`} fill="#c19a5b" />
          <circle cx={x} cy={y + 24} r="6" fill={GOLD} />
          <circle cx={x} cy={y + 24} r="30" fill={GOLD} opacity=".2" style={{ animation: `art-twinkle ${1 + r()}s infinite alternate` }} />
        </g>
      ))}
      <path d="M0 540H800V600H0z" fill={p.sil} />
    </>
  ),

  global: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={30} h={140} />
      <path d="M100 600V260L200 130 300 260V600z" fill={p.sil2} /><path d="M500 600V260L600 130 700 260V600z" fill={p.sil2} />
      <path d="M300 600V200L400 60 500 200V600z" fill={p.sil} stroke={GOLD} strokeOpacity=".4" />
      <circle cx="400" cy="250" r="58" fill="none" stroke={GOLD} strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M400 250L${400 + Math.cos(i * 0.5236) * 56} ${250 + Math.sin(i * 0.5236) * 56}`} stroke={['#c1121f', '#f6c76a', '#3b6fd6'][i % 3]} strokeWidth="9" opacity=".8" />)}
      {[[200, 0], [400, 1], [600, 2]].map(([x, k]) => <path key={x} d={`M${x - 48} 600V${430 - k * 10}a48 60 0 0196 0V600z`} fill={['#3b6fd6', '#c1121f', '#f6c76a'][k]} opacity=".7" />)}
      <ellipse cx="400" cy="600" rx="380" ry="80" fill={p.g} />
    </>
  ),

  social: ({ p, seed }) => (
    <>
      <circle cx="400" cy="300" r="260" fill={p.g} />
      {[[60, 160], [200, 110], [340, 190], [470, 90], [600, 150]].map(([x, h], i) => <g key={i}><rect x={x} y={420 - h * 1.5} width="90" height={h * 1.5 + 60} fill={p.sil2} />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={x + 12 + (k % 2) * 40} y={430 - h * 1.5 + Math.floor(k / 2) * 34} width="22" height="18" fill={GOLD} opacity={0.25 + ((i + k) % 3) * 0.25} />)}</g>)}
      <path d="M0 470H800V600H0z" fill={p.sil} />
      {[[180, 1], [300, 1.2], [430, 1.05], [560, 1.25]].map(([x, s], i) => <g key={i} transform={`translate(${x} 500) scale(${s})`} fill={p.sil}><circle cx="0" cy="-70" r="14" /><path d="M-22 40C-22-30-14-52 0-52S22-30 22 40z" /><rect x="-38" y="-88" width="76" height="12" fill={GOLD} opacity=".8" /></g>)}
      <Stars seed={seed} n={12} h={140} />
    </>
  ),

  shankha: ({ p }) => (
    <>
      <circle cx="400" cy="300" r="260" fill={p.g} />
      {[80, 130, 190, 260].map((r, i) => <circle key={i} cx="400" cy="300" r={r} fill="none" stroke={GOLD} strokeOpacity={0.4 - i * 0.07} />)}
      <path d="M400 420C300 420 250 350 280 290S400 220 440 270 440 350 400 350 350 310 380 290" stroke={GOLD} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M280 300C250 320 200 300 180 260" stroke={GOLD} strokeWidth="5" fill="none" />
      <path d="M0 540H800V600H0z" fill={p.sil} />
    </>
  ),

  lake: ({ p, seed }) => (
    <>
      <circle cx="240" cy="280" r="70" fill={p.glow} opacity=".5" />
      <rect y="320" width="800" height="280" fill={p.wt} />
      {[0, 1, 2, 3].map((i) => <rect key={i} y={340 + i * 46} width="800" height="16" fill="#fff" opacity={0.05 + i * 0.015} />)}
      <path d="M0 320Q200 300 400 316T800 310V330H0z" fill={p.sil2} />
      {[[80, 320], [700, 320], [740, 320]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y}q-4-80 4-120`} stroke={p.sil} strokeWidth="8" fill="none" />{[-1, 0, 1].map((d) => <path key={d} d={`M${x + 4} ${y - 120}q${d * 30} -26 ${d * 56} 8`} stroke={p.sil} strokeWidth="4" fill="none" />)}</g>)}
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${400 + i * 34} ${120 + (i % 3) * 20}q10-10 20 0q10-10 20 0`} stroke={p.sil} strokeWidth="2" fill="none" />)}
      <Stars seed={seed} n={6} h={200} />
    </>
  ),

  camera: ({ p, seed }) => (
    <>
      <Bokeh seed={seed} n={22} col={GOLD} op={0.38} />
      <circle cx="400" cy="300" r="240" fill={p.g} />
      <path d="M400 440L300 600M400 440L500 600M400 440V600" stroke={p.sil} strokeWidth="8" />
      <rect x="250" y="240" width="300" height="190" rx="18" fill={p.sil} stroke={GOLD} strokeOpacity=".4" strokeWidth="2" />
      <path d="M310 240l14-32h152l14 32z" fill={p.sil} />
      <circle cx="400" cy="335" r="70" fill={p.sil2} stroke={GOLD} strokeOpacity=".55" strokeWidth="3" />
      <circle cx="400" cy="335" r="46" fill="#000" /><circle cx="400" cy="335" r="20" fill={GOLD} opacity=".55" /><circle cx="384" cy="320" r="7" fill="#fff" opacity=".8" />
      <circle cx="510" cy="268" r="6" fill="#c1121f" />
    </>
  ),

  mythology: ({ p, seed }) => (
    <>
      <Stars seed={seed} n={40} h={300} />
      <g opacity=".5">{Array.from({ length: 40 }, (_, i) => <path key={i} d={`M400 320L${400 + Math.cos(i * 0.157) * 620} ${320 + Math.sin(i * 0.157) * 620}L${400 + Math.cos((i + 0.5) * 0.157) * 620} ${320 + Math.sin((i + 0.5) * 0.157) * 620}z`} fill={i % 2 ? p.glow : 'transparent'} opacity=".12" />)}</g>
      <circle cx="400" cy="320" r="90" fill={p.g} />
      <path d="M0 480L160 300 300 430 420 330 560 440 680 320 800 470V600H0z" fill={p.sil2} />
      <path d="M400 480V220M370 250a30 30 0 0060 0M400 220l-10-30M400 220l10-30M400 220V180" stroke={GOLD} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M470 470c20-50 80-60 120-30l40-10-10 30 30 20-40 10-20 30-30-20z" fill={p.sil} />
      <path d="M170 480c-10-40 20-70 60-60l30-20 10 30 30 10-20 30 10 30z" fill={p.sil} />
      <path d="M0 540H800V600H0z" fill={p.sil} />
    </>
  ),
};

/* ---------- component ---------- */
export const Art = memo(function Art({ art, seed, hue = 12, tone = 'night', className = '', title }: Visual & { className?: string; title?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const base = palette(tone, hue);
  const p: Pal = { ...base, g: `url(#glow${uid})`, wt: `url(#water${uid})` };
  return (
    <svg className={`art ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role={title ? 'img' : 'presentation'} aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes art-float { 0% { transform: translateY(-6px); } 100% { transform: translateY(6px); } }
          @keyframes art-swing { 0% { transform: rotate(-6deg); } 100% { transform: rotate(6deg); } }
          @keyframes art-fall { 0% { transform: translateY(-150px); opacity: 0; } 20% { opacity: 0.85; } 80% { opacity: 0.85; } 100% { transform: translateY(600px); opacity: 0; } }
          @keyframes art-twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        `}</style>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.top} /><stop offset=".55" stopColor={p.mid} /><stop offset="1" stopColor={p.bot} /></linearGradient>
        <radialGradient id={`glow${uid}`}><stop offset="0" stopColor={p.glow} stopOpacity=".75" /><stop offset="1" stopColor={p.glow} stopOpacity="0" /></radialGradient>
        <linearGradient id={`water${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.bot} /><stop offset="1" stopColor={p.mid} /></linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#sky${uid})`} />
      {scenes[art]({ p, r: rng(seed), seed, tone })}
    </svg>
  );
});

/* ---------- Photo: real image or placeholder ---------- */
export function Photo({ v, className = '', alt = '', eager = false }: { v: Visual; className?: string; alt?: string; eager?: boolean }) {
  if (v.src) return <img className={`photo ${className}`} src={v.src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  return <Art {...v} className={`photo ${className}`} title={alt || undefined} />;
}
