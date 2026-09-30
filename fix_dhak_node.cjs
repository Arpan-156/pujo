
const fs = require("fs");
let code = fs.readFileSync("src/sections/Experiences.tsx", "utf8");

// Restore Bengali character
code = code.replace(/<p className="bn" lang="bn">ঢাক<\/p>/g, `<p className="bn" lang="bn">ঢাক</p>`);
code = code.replace(/<p className="bn" lang="bn">\?\?\?<\/p>/g, `<p className="bn" lang="bn">ঢাক</p>`);
code = code.replace(/ঢাক/g, `\u09A2\u09BE\u0995`);

fs.writeFileSync("src/sections/Experiences.tsx", code, "utf8");
console.log("Restored Bengali chars");

