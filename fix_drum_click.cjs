const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

const targetRegex = /<button className=\{\`dhak-drum \$\{hit \? 'hit' : ''\}\`\} key=\{hit\} onClick=\{[^>]+\} aria-label="Strike the dhak" data-cursor="Strike">/;
const replacement = `<button className={\`dhak-drum \${hit ? 'hit' : ''}\`} key={hit} onClick={() => { setHit((h) => h + 1); toggleAuto(); }} aria-label="Strike the dhak" data-cursor="Strike">`;

if (code.match(targetRegex)) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
  console.log("Updated drum click to toggle music.");
} else {
  console.log("Could not find dhak-drum button.");
}
