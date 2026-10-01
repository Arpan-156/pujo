const fs = require('fs');
let code = fs.readFileSync('src/components/shared.tsx', 'utf8');

const regex = /\{\s*key:\s*'youtube',\s*label:\s*'YouTube',\s*Icon:\s*Youtube\s*\}/;

if (code.match(regex)) {
  code = code.replace(regex, '');
  // Remove the trailing comma if it exists
  code = code.replace(/,\s*,/g, ',');
  fs.writeFileSync('src/components/shared.tsx', code, 'utf8');
  console.log("Removed YouTube from SOCIALS");
} else {
  console.log("Could not find YouTube in SOCIALS");
}
