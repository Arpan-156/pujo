const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Replace Data Block
const oldDataBlock = `  const PANDALS = [
    { id: 'p1', name: 'Sreebhumi Sporting', zone: 'Lake Town, Kol', tagline: 'Famous for massive architectural replicas and glowing lighting marvels.', baseVotes: 12450 },
    { id: 'p2', name: 'Alamganj Barowari', zone: 'Burdwan North', tagline: 'Breathtaking replica of the Kedarnath Temple with icy peaks.', baseVotes: 8920 },
    { id: 'p3', name: 'Ahiritola Sarbojanin', zone: 'North Kolkata', tagline: 'Heritage and classic traditional artistry honoring ancient roots.', baseVotes: 10430 },
    { id: 'p4', name: 'Boro Nilpur', zone: 'Burdwan Central', tagline: 'Dubai Swaminarayan Temple grand replica reaching the sky.', baseVotes: 7850 },
    { id: 'p5', name: 'Vivekananda Sevak Sangha', zone: 'Vivekananda Pally', tagline: 'Eco-friendly celebration focusing purely on mother nature.', baseVotes: 6120 },
    { id: 'p6', name: 'Rathtala Barowari', zone: 'Rathtala, Burdwan', tagline: 'Mythological Mahakal theme with stunning intricate art.', baseVotes: 9340 }
  ];`;

const newDataBlock = `  const { pujas } = useData();
  const PANDALS = pujas.map(p => {
    const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      id: p.slug,
      name: p.name,
      zone: p.zone || 'Bardhaman',
      tagline: p.description || p.story || \`Theme: \${p.theme}\`,
      baseVotes: (stringVal * 12) + 1980
    };
  });`;

code = code.replace(oldDataBlock, newDataBlock);

// 2. Add Animations and fix styles
code = code.replace(
  '.t3-wrap { padding: clamp(80px, 15vh, 120px) 20px; max-width: 1200px; margin: 0 auto; color: #fff; }',
  `@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatTrophy { 0%, 100% { transform: translateY(0); filter: drop-shadow(0 10px 20px rgba(233,181,88,0.2)); } 50% { transform: translateY(-15px); filter: drop-shadow(0 25px 30px rgba(233,181,88,0.6)); } }
        @keyframes cardReveal { from { opacity: 0; transform: scale(0.9) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        
        .t3-wrap { padding: clamp(80px, 15vh, 120px) 20px; max-width: 1200px; margin: 0 auto; color: #fff; perspective: 1000px; }`
);

// 3. Make podium animated
code = code.replace(
  '.t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; }',
  '.t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; animation: floatTrophy 6s ease-in-out infinite; }'
);
// Offset animations so they float differently
code = code.replace(
  '.t3-pod-1 { height: 180px;',
  '.t3-pod-1 { height: 180px; animation-delay: -1s;'
);
code = code.replace(
  '.t3-pod-3 { height: 100px;',
  '.t3-pod-3 { height: 100px; animation-delay: -3s;'
);

// 4. Animate Cards
code = code.replace(
  '.t3-card { background: linear-gradient',
  '.t3-card { animation: cardReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-timeline: view(); animation-range: entry 10% cover 30%; background: linear-gradient'
);

// 5. Fix star encoding in JSX (since we rolled back)
const starRegex = /\{'\?'\.repeat\(s\.rating\)\}\{'\?'\.repeat\(5-s\.rating\)\}/g;
code = code.replace(starRegex, `{String.fromCharCode(9733).repeat(s.rating)}{String.fromCharCode(9734).repeat(5-s.rating)}`);

const shareStarRegex = /const stars = '\?'\.repeat\(s\.rating\) \|\| 'Unrated';/g;
code = code.replace(shareStarRegex, `const stars = String.fromCharCode(9733).repeat(s.rating) || 'Unrated';`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Ultimate Top 3 animations added.");
