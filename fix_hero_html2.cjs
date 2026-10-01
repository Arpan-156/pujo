const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

const targetStr = `<p className="hero-brand">Presented by <span style={{ color: '#fff' }}>Burdwan Capturers Official</span></p>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, '');
  
  // Now add it right before closing </section>
  code = code.replace(
    '</section>', 
    `  ${targetStr}\n      </section>`
  );
  
  fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
  console.log("Moved hero-brand successfully!");
} else {
  console.log("Could not find the target string!");
}
