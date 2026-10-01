const fs = require('fs');

let site = fs.readFileSync('src/data/site.ts', 'utf8');
if (!site.includes("label: 'FAQ'")) {
  site = site.replace(
    /\{ label: 'About'.+/,
    "{ label: 'FAQ', bn: '\\u09AA\\u09CD\\u09B0\\u09B6\\u09CD\\u09A8\\u09CB\\u09A4\\u09CD\\u09A4\\u09B0', to: '/faq' },\n  $&"
  );
  fs.writeFileSync('src/data/site.ts', site, 'utf8');
  console.log('Added FAQ to Nav');
} else {
  console.log('FAQ already in Nav');
}

