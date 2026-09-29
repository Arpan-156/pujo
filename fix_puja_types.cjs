const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const oldMap = `  const PANDALS = pujas.map(p => {
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

const newMap = `  const PANDALS = pujas.map(p => {
      // Generate a stable pseudorandom base vote count based on the name length
      const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return {
        id: p.slug,
        name: p.name,
        zone: p.zone,
        tagline: p.description || p.story || \`Theme: \${p.theme}\`,
        baseVotes: (stringVal * 12) + 1980
      };
    });`;

if (code.includes('zone: p.town === false')) {
    code = code.replace(oldMap, newMap);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Fixed Puja type references.");
} else {
    console.log("Could not find the map block.");
}
