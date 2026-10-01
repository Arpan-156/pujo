const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');

const oldLoop = `      const loop = () => {
        rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
        el.style.transform = \`translate3d(\${rx}px,\${ry}px,0)\`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);`;

const newLoop = `      // We now follow the cursor instantly in the RAF to avoid input lag.
      // The smooth trailing effect for the ring can be handled by CSS if desired.
      const loop = () => {
        rx += (x - rx) * 0.6; ry += (y - ry) * 0.6; // Much faster, snappy response
        el.style.transform = \`translate3d(\${rx}px,\${ry}px,0)\`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);`;

if (code.includes(oldLoop)) {
  code = code.replace(oldLoop, newLoop);
  fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
  console.log("Cursor lag fixed!");
} else {
  console.log("Could not find old loop in fx.tsx");
}
