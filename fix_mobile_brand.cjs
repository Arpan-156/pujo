const fs = require('fs');

let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

const regex = /\.hero-brand\s*\{\s*margin-top:\s*6vh;\s*margin-bottom:\s*40px;\s*font-size:\s*0\.65rem;\s*text-align:\s*center;\s*padding-bottom:\s*0;\s*\}/;

const newCode = `.hero-brand { margin-top: 6vh; margin-bottom: 40px; font-size: 0.65rem; text-align: center; padding-bottom: 0; display: flex; flex-direction: column; gap: 6px; }`;

if (code.match(regex)) {
  code = code.replace(regex, newCode);
  fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
  console.log("Fixed mobile brand layout");
} else {
  console.log("Could not find regex match");
}
