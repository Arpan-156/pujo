const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

// The original pattern was a techno beat. Let's change it to a classic traditional Dhak Aarti pattern.
// "Tak dum dum, Tak dum dum" -> t X d . t X d . t t X . t . X .
const newPattern = "t.X.t.X.ttX.X...";

code = code.replace(
  "const PAT = 'XtXtdtXtXtXtdtXt';",
  "const PAT = 't.X.t.X.ttX.X...';"
);

// Also need to update the interval maybe? A real dhak is played quite fast. 230ms is 130 BPM (16th notes).
// That's fine.

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Changed Dhak rhythm to a traditional beat.");
