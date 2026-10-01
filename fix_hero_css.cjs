const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '<div className="hero-title-wrap">',
  '<div className="hero-title-wrap" style={{ width: "100%", padding: "0 20px" }}>'
);

// also let's make sure the inline style on the h1 doesn't mess with mobile scaling
code = code.replace(
  'maxWidth: "800px", height: "auto"',
  'maxWidth: "800px", minWidth: "280px", height: "auto"'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Updated container CSS for responsive fit");
