const fs = require('fs');
let code = fs.readFileSync('src/components/Art.tsx', 'utf8');

const dhakSVG = `
            {/* Front Dhak Player 1 */}
            <g className="walker" style={{ animationDelay: '0.6s' }}>
              <circle cx="-130" cy="42" r="8" />
              <rect x="-134" y="50" width="8" height="37" rx="4" />
              <ellipse cx="-142" cy="62" rx="12" ry="18" transform="rotate(-20 -142 62)" />
              <path d="M-132 57 L-152 52 M-132 62 L-148 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              {/* Drum sticks */}
              <path d="M-135 48 L-145 35 M-130 52 L-140 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Front Dhak Player 2 */}
            <g className="walker" style={{ animationDelay: '0.2s' }}>
              <circle cx="-90" cy="46" r="8" />
              <rect x="-94" y="54" width="8" height="37" rx="4" />
              <ellipse cx="-102" cy="66" rx="12" ry="18" transform="rotate(-20 -102 66)" />
              <path d="M-92 61 L-112 56 M-92 66 L-108 66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M-95 50 L-105 35 M-90 55 L-100 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
`;

code = code.replace(
  /<svg viewBox="-80 0 760 100" className="procession-svg" fill="currentColor">/g,
  `<svg viewBox="-160 0 840 100" className="procession-svg" fill="currentColor">` + dhakSVG
);

// We should also adjust the animation to start further right so the extra dhakis are off-screen at the beginning
code = code.replace(
  "right: -800px;",
  "right: -900px;"
);
code = code.replace(
  "100% { transform: translateX(calc(-100vw - 800px)); }",
  "100% { transform: translateX(calc(-100vw - 900px)); }"
);

fs.writeFileSync('src/components/Art.tsx', code, 'utf8');
console.log("Added more Dhakis to the front.");
