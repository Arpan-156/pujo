const fs = require('fs');
let css = fs.readFileSync('src/styles/sections.css', 'utf8');

// I already restored `--p` in the previous step. Let's make the animation smoother.
css = css.replace(
  /transform: scaleX\(min\(1, max\(0, calc\(var\(--p, 0\) \* 1\.9 - 0\.3\)\)\)\);/,
  `transform: scaleX(min(1, max(0, calc(var(--p, 0) * 2 - 0.4))));` // Starts at 0.2 (20% through), ends at 0.7 (70% through). This ensures it fills completely while they are looking at it.
);

fs.writeFileSync('src/styles/sections.css', css, 'utf8');
console.log("Smoothed timeline vertical animation.");
