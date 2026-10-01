const fs = require('fs');

let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /\{ slug:\s*'rathtala-barowari'[^}]*\}/;
const match = code.match(regex);

if (match) {
  let replacement = match[0].replace("area: 'Rathtala'", "area: 'Rathtala Playground'");
  code = code.replace(match[0], replacement);
  fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
  console.log("Area name updated successfully!");
} else {
  console.log("Could not find Rathtala Barowari.");
}
