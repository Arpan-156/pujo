const fs = require('fs');

const replaceInFile = (file) => {
  let code = fs.readFileSync(file, 'utf8');
  // Only replace Bardwan with Burdwan if it's not part of the URL (bardwanpuja.pages.dev)
  // We can do this by splitting or just using a regex that looks for Bardwan not followed by puja.pages.dev
  code = code.replace(/Bardwan(?!puja\.pages\.dev)/gi, 'Burdwan');
  fs.writeFileSync(file, code, 'utf8');
};

replaceInFile('src/pages/Home.tsx');
replaceInFile('src/sections/Hero.tsx');

console.log('Fixed more Bardwan');
