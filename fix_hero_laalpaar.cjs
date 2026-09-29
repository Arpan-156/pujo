const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Remove the inline style from LaalPaar
code = code.replace(
  "<LaalPaar className=\"hero-paar\" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 5 }} />",
  "<LaalPaar className=\"hero-paar\" />"
);

// Add .hero-paar to the style block
code = code.replace(
  ".hero.go .hero-brand { opacity: 1; transition-delay: 1.6s; }",
  ".hero.go .hero-brand { opacity: 1; transition-delay: 1.6s; }\n        .hero-paar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; opacity: 0.85; }"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed LaalPaar styles.");
