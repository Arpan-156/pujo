const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');

const regex = /export function BrandMark\(\{ brand, size = 44, className = '' \}: \{ brand: 'capturers' \| 'pujo'; size\?: number; className\?: string \}\) \{\s*const src = brand === 'capturers' \? '\/logos\/capturers\.jpg' : '\/logos\/pujo\.jpg';\s*return <img src=\{src\} width=\{size\} height=\{size\} alt=\{brand\} className=\{\`brand-mark \$\{className\}\`\} style=\{\{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 \}\} \/>;\s*\}/;

const newBrandMark = `export function BrandMark({ brand, size = 44, className = '' }: { brand: 'capturers' | 'pujo'; size?: number; className?: string }) {
  if (brand === 'pujo') {
    return (
      <svg width={size} height={size} viewBox="0 0 200 160" fill="none" className={\`brand-mark \${className}\`} style={{ flexShrink: 0, padding: size * 0.1, boxSizing: 'border-box' }}>
        <path d="M30 100c0-42 32-74 82-74 30 0 52 16 52 40 0 22-18 36-40 36-14 0-26-8-26-20 0-10 8-16 18-16" stroke="var(--gold-2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M30 100c-8 10-6 30 14 36 34 10 82 0 100-30" stroke="var(--gold-2)" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={\`M\${58 + i * 20} \${44 + i * 3}q10 \${18 - i * 2} \${-2} \${34 - i * 3}\`} stroke="var(--gold-2)" strokeOpacity=".5" strokeWidth="3.2" />)}
        <path d="M20 108l14-8" stroke="#c8281e" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }
  const src = brand === 'capturers' ? '/logos/capturers.jpg' : '/logos/pujo.jpg';
  return <img src={src} width={size} height={size} alt={brand} className={\`brand-mark \${className}\`} style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}`;

if (code.match(regex)) {
  code = code.replace(regex, newBrandMark);
  fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
  console.log("Replaced eye with Shankha");
} else {
  console.log("Could not find BrandMark regex");
}
