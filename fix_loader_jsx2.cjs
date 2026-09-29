const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const oldJSX = `<div className="loader-core">
          <Alpana size={150} className="loader-alpana" />
          <p className="loader-bn">? ?o < ? ?, ?  ? ? s> </p>
          <p className="loader-en">Preparing the Puja</p>
          <div className="loader-bar-wrap">
              <p className="loader-pct">{pct}%</p>
              <div className="loader-bar" aria-hidden="true"><span style={{ transform: \`scaleX(\${pct / 100})\` }} /></div>
            </div>
        </div>`;

// Since there may be encoding issues, use regex
const regex = /<div className="loader-core">[\s\S]*?<\/div>\s*<\/div>/;

const newJSX = `<div className="loader-core">
          <div className="loader-ring-wrapper">
            <svg className="loader-circular" viewBox="0 0 200 200">
              <circle className="loader-circle-bg" cx="100" cy="100" r="90" />
              <circle className="loader-circle-progress" cx="100" cy="100" r="90" style={{ strokeDashoffset: 565.48 - (pct / 100) * 565.48 }} />
            </svg>
            <Alpana size={160} className="loader-alpana" />
            <div className="loader-pct-center">{pct}%</div>
          </div>
          <p className="loader-bn">????? ????????? ????</p>
          <p className="loader-en">Preparing the Puja</p>
        </div>`;

code = code.replace(regex, newJSX);
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log("Injected SVG circular progress ring.");
