const fs = require('fs');
let code = fs.readFileSync('src/components/shared.tsx', 'utf8');

const oldDiv = /<div style=\{\{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 10 \}\}>\s*<PassportButton slug=\{p\.slug\} \/>\s*<\/div>/;

code = code.replace(oldDiv, '');

const pcardTheme = /<p className="pcard-theme"><em>Theme:<\/em> [^<]+<\/p>/;

code = code.replace(pcardTheme, (match) => {
    return match + `
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', transform: 'translateZ(10px)', transition: 'transform 0.4s', position: 'relative', zIndex: 10 }}>
            <PassportButton slug={p.slug} />
          </div>`;
});

fs.writeFileSync('src/components/shared.tsx', code, 'utf8');
console.log("Fixed PassportButton overlap successfully.");
