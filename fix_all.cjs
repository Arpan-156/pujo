const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const oldCode = "onClick={() => setFilter(f.id)}";
const newCode = "onClick={() => f.id === 'all' ? reset() : setFilter(f.id)}";

if (code.includes(oldCode)) {
  code = code.replace(oldCode, newCode);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log("Fixed All button logic!");
} else {
  console.log("Could not find oldCode.");
}
