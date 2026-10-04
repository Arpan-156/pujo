const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// I need to swap <Experiences /> and <Timeline /> to be after <DailyShloka />
// Or just move <Experiences /> after <DailyShloka />
// Let's remove <Experiences /> first
code = code.replace(/\s*<Experiences \/>\n/, '\n');

// And insert it after <DailyShloka />
code = code.replace(
  /<DailyShloka \/>/,
  "<DailyShloka />\n      <Experiences />"
);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Moved Experiences after DailyShloka');
