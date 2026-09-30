const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// The place to inject Procession is right above <div className="hero-in">
const injectTarget = `<div className="hero-shade" />`;
const replacement = `<div className="hero-shade" />
      
      {/* Maa Durga carrying animation */}
      <Procession />`;

code = code.replace(injectTarget, replacement);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Procession added to Hero.");
