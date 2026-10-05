import re
import codecs

with codecs.open('src/components/HallOfFameV2.tsx', 'r', 'utf-8') as f:
    content = f.read()

# 1. Inject LogoABBarta before GenericLogo
logo_ab_barta = """const LogoABBarta = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <rect x="20" y="25" width="60" height="40" rx="4" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="50" y="47" fontFamily="Impact, sans-serif" fontSize="24" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">AB</text>
    <text x="50" y="85" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">BARTA</text>
  </svg>
);

const GenericLogo = () => ("""

content = content.replace('const GenericLogo = () => (', logo_ab_barta)

# 2. Fix the top condition
content = content.replace(
    "if (!p || p.slug !== 'vivekananda-sevak-sangha') return null;",
    "if (!p || (p.slug !== 'vivekananda-sevak-sangha' && p.slug !== 'jagoroni-sangha')) return null;"
)

# 3. Add Jagarani awards
jagarani_awards = """
  if (p.slug === 'jagoroni-sangha') {
    awards = [
      { title: 'CN Calcutta News', year: '3 Times Winner', Icon: LogoCN },
      { title: 'Republic Bangla', year: '1 Time Winner', Icon: LogoRepublic },
      { title: 'AB Barta', year: '1 Time Winner', Icon: LogoABBarta },
      { title: 'Ultratech 7 Wonders', year: '1 Time Winner', Icon: LogoUltratech },
    ];
  }

  // Duplicate awards for infinite scrolling marquee"""

content = content.replace("  // Duplicate awards for infinite scrolling marquee", jagarani_awards)

with codecs.open('src/components/HallOfFameV2.tsx', 'w', 'utf-8') as f:
    f.write(content)
