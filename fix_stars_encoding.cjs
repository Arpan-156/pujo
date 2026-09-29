const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace any corrupted '?????' or similar question marks back to stars
// Wait, the corrupted string is literally just question marks.
// Let's find it.
code = code.replace(
  /<span>\{'\?+'\.repeat\(userState\[p\.slug\]\.rating\)\}\{'\?+'\.repeat\(5 - userState\[p\.slug\]\.rating\)\}<\/span>/g,
  `<span>{String.fromCharCode(9733).repeat(userState[p.slug].rating)}{String.fromCharCode(9734).repeat(5 - userState[p.slug].rating)}</span>`
);

code = code.replace(
  /<span>\{'\?'\.repeat\(userState\[p\.slug\]\.rating\)\}\{'\?+'\.repeat\(5 - userState\[p\.slug\]\.rating\)\}<\/span>/g,
  `<span>{String.fromCharCode(9733).repeat(userState[p.slug].rating)}{String.fromCharCode(9734).repeat(5 - userState[p.slug].rating)}</span>`
);

// Actually, let's just find the exact block and replace it using a more generic regex
const starRegex = /<span>\{'[^']*'\.repeat\(userState\[p\.slug\]\.rating\)\}\{'[^']*'\.repeat\(5 - userState\[p\.slug\]\.rating\)\}<\/span>/g;
code = code.replace(starRegex, `<span>{String.fromCharCode(9733).repeat(userState[p.slug].rating)}{String.fromCharCode(9734).repeat(5 - userState[p.slug].rating)}</span>`);

// Let's also make sure Top3VoterPage doesn't have the same problem
const top3StarRegex = /'[^']+'\.repeat\(s\.rating\)/g;
// Actually I'll just use String.fromCharCode in Top3VoterPage too just in case it got corrupted
const top3JSXRegex = /\{'[^']+'\.repeat\(s\.rating\)\}\{'[^']+'\.repeat\(5-s\.rating\)\}/g;
code = code.replace(top3JSXRegex, `{String.fromCharCode(9733).repeat(s.rating)}{String.fromCharCode(9734).repeat(5-s.rating)}`);

const shareStarRegex = /const stars = '[^']+'\.repeat\(s\.rating\) \|\| 'Unrated';/g;
code = code.replace(shareStarRegex, `const stars = String.fromCharCode(9733).repeat(s.rating) || 'Unrated';`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed stars encoding issue.");
