const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '<h1 className="t-main">Burdwan <span>Pujo 2026</span></h1>',
  '<h1 className="t-main" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}><img src="/images/calligraphy.png" alt="Burdwan Pujo 2026" style={{ width: "100%", maxWidth: "800px", height: "auto", objectFit: "contain", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }} /></h1>'
);

// We should also remove the text-shadow on .t-main to avoid weird artifacting, although it shouldn't apply to img.
// Actually, it's fine.

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Replaced text with calligraphy image.");
