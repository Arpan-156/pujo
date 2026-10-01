const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Find the start of function HomeFAQ
const faqStart = home.indexOf('function HomeFAQ() {');
if (faqStart !== -1) {
  // Find the end of HomeFAQ (before export function Home() {)
  const faqEnd = home.indexOf('export function Home() {');
  if (faqEnd !== -1) {
    home = home.substring(0, faqStart) + home.substring(faqEnd);
  }
}

home = home.replace('<HomeFAQ />', '');
fs.writeFileSync('src/pages/Home.tsx', home, 'utf8');

console.log('Removed HomeFAQ');
