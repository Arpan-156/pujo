const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /zone: p\.town === false \? 'Outskirts' : 'Burdwan Town',\s+tagline: p\.desc \|\| `Theme: \$\{p\.theme\}`,\s+baseVotes: \(stringVal \* 12\) \+ \(p\.est \|\| 1980\)/g;

const replacement = `zone: p.zone,
        tagline: p.description || p.story || \`Theme: \${p.theme}\`,
        baseVotes: (stringVal * 12) + 1980`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed Puja type references using regex.");
