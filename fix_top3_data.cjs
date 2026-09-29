const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace the hardcoded PANDALS with useData() mapping
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
    // Generate a stable pseudorandom base vote count based on the name length and est year
    const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      id: p.slug,
      name: p.name,
      zone: p.town === false ? 'Outskirts' : 'Burdwan Town',
      tagline: p.desc || \`Theme: \${p.theme}\`,
      baseVotes: (stringVal * 12) + (p.est || 1980)
    };
  });`;

if (code.includes('const PANDALS = [')) {
    code = code.replace(oldDataBlock, newDataBlock);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Top3VoterPage data updated.");
} else {
    console.log("Could not find PANDALS data block.");
}
