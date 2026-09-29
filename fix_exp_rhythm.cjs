const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

// The pattern is 'X.X.ttttX.X.tttt'
// We need to trigger the correct sound for each character.

// Find the setInterval loop
const oldLoop = /const id = setInterval\(\(\) => \{[\s\S]*?\}, 230\);/;

const newLoop = `const id = setInterval(() => {
        const ch = PAT[i % 16];
        setStep(i % 16);
        if (!reduced) {
            if (ch === 'X') engine.playDhakBass();
            else if (ch === 't') engine.playDhakTreble();
            else if (ch === 'd') engine.playDhakSoft();
        }
        i++;
      }, 200);`;

code = code.replace(oldLoop, newLoop);

// Also fix the manual click so it just plays a Bass hit instead of a triplet
code = code.replace(
  "onClick={() => { setHit((h) => h + 1); engine.oneShot('dhak'); }}",
  "onClick={() => { setHit((h) => h + 1); engine.playDhakBass(); }}"
);

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Fixed Dhak playback logic.");
