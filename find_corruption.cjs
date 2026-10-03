const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('\uFFFD')) {
    console.log(`Corrupted file found: ${f}`);
  }
});
