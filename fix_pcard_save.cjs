const fs = require('fs');
let code = fs.readFileSync('src/components/shared.tsx', 'utf8');

// The original absolute div for the passport button:
const oldDiv = `<div style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 10 }}>
        <PassportButton slug={p.slug} />
      </div>`;

// Remove the absolute div from the end of the article
code = code.replace(oldDiv, '');

// Inject it inside the Wrapper (pcard-body) right after the theme, but as relative flex
const newButton = `
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', transform: 'translateZ(10px)', transition: 'transform 0.4s' }}>
            <PassportButton slug={p.slug} />
          </div>`;

code = code.replace(
  "<p className=\"pcard-theme\"><em>Theme:</em> “{p.theme}”</p>",
  "<p className=\"pcard-theme\"><em>Theme:</em> “{p.theme}”</p>" + newButton
);

fs.writeFileSync('src/components/shared.tsx', code, 'utf8');
console.log("Fixed PassportButton overlap in PujaCard.");
