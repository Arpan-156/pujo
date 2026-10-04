const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(/\{ label: 'Top 3 Voter', bn: '.*?', to: '\/top3' \},/, "{ label: 'Public Choice Awards', bn: '\\u099C\\u09A8\\u09AA\\u09CD\\u09B0\\u09BF\\u09DF\\u09A4\\u09BE\\u09B0 \\u09AD\\u09CB\\u099F', to: '/vote' },");

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Fixed site.ts');
