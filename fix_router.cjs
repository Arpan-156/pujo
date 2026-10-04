const fs = require('fs');
let code = fs.readFileSync('src/lib/router.tsx', 'utf8');

code = code.replace(/\[\/\^\\\\\/gallery\/, \{ en: 'Gallery', bn: '.*?' \}\],/, "$&\n    [/^\\/vote/, { en: 'Public Choice Awards', bn: '\\u099C\\u09A8\\u09AA\\u09CD\\u09B0\\u09BF\\u09DF\\u09A4\\u09BE\\u09B0 \\u09AD\\u09CB\\u099F' }],");

fs.writeFileSync('src/lib/router.tsx', code, 'utf8');
console.log('Fixed router.tsx');
