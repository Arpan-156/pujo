const fs = require('fs');

let code = fs.readFileSync('src/components/Passport.tsx', 'utf8');

code = code.replace(
  "const savedPujas = PUJAS.filter(p => data.saved.includes(p.slug));",
  "const savedPujas = PUJAS.filter(p => data.saved.includes(p.slug));\n  const visitedCount = savedPujas.filter(p => data.visited.includes(p.slug)).length;"
);

code = code.replace(
  "{data.visited.length} / {data.saved.length} Visited",
  "{visitedCount} / {savedPujas.length} Visited"
);

code = code.replace(
  "data.visited.length > 0 && <button",
  "visitedCount > 0 && <button"
);

code = code.replace(
  "{data.saved.length > 0 && <span className=\"passport-badge\">{data.saved.length}</span>}",
  "{savedPujas.length > 0 && <span className=\"passport-badge\">{savedPujas.length}</span>}"
);

// We also need to fix the condition `data.saved.length === 0` to `savedPujas.length === 0` which is already done correctly in the code.
// `{savedPujas.length === 0 ? (`

fs.writeFileSync('src/components/Passport.tsx', code, 'utf8');
console.log("Fixed Passport bug!");
