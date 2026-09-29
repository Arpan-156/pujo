const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  '<div className={`t3-toast ${toast ? \'show\' : \'\'}`}>Copied to clipboard!</div>',
  '<div className={`t3-toast ${toast ? \'show\' : \'\'}`}>Copied! Paste it in the Instagram chat.</div>'
);

// Also make sure getScore is updated to Community logic since it might have failed previously
const oldGetScore = /const getScore = \(p: any\) => \{\s*const s = userState\[p\.id\] \|\| \{ rating: 0, upvoted: false \};\s*return p\.baseVotes \+ \(s\.rating \* 10000\) \+ \(s\.upvoted \? 5000 : 0\);\s*\};/g;
if (code.match(oldGetScore)) {
    code = code.replace(oldGetScore, `const getScore = (p: any) => {
      const s = userState[p.id] || { rating: 0, upvoted: false };
      return p.baseVotes + (s.rating * 10) + (s.upvoted ? 50 : 0);
    };`);
    console.log("Updated getScore to global.");
}

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Updated Toast and Verified getScore");
