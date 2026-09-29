const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Fix the getScore function to make it "Global Community" dominated
code = code.replace(
  /const getScore = \(p: any\) => \{\s*const s = userState\[p\.id\] \|\| \{ rating: 0, upvoted: false \};\s*return p\.baseVotes \+ \(s\.rating \* 10000\) \+ \(s\.upvoted \? 5000 : 0\);\s*\};/g,
  `const getScore = (p: any) => {
      const s = userState[p.id] || { rating: 0, upvoted: false };
      // Base votes heavily dominate to represent the "Global Community"
      // User's local vote just slightly nudges the community score
      return p.baseVotes + (s.rating * 10) + (s.upvoted ? 50 : 0);
    };`
);

// 2. Fix the Share Bracket function to open WhatsApp with the text
const oldShare = `    const shareBracket = () => {
      let text = \`?? My Top 3 Durga Puja Pandals 2026:
  
  \`;
      for(let i=0; i<3; i++) {
          const s = userState[sorted[i].id] || { rating: 0 };
          const stars = String.fromCharCode(9733).repeat(s.rating) || 'Unrated';
          text += \`\${i+1}. \${sorted[i].name} (\${stars})
  \`;
      }
      text += \`
  What's yours? Cast your votes now! ??\`;
      navigator.clipboard.writeText(text).then(() => {
          setToast(true);
          setTimeout(() => setToast(false), 3000);
      });
    };`;

const newShare = `    const shareBracket = () => {
      let text = \`?? Burdwan Capturers Official - Community Top 3 Pandals:
  \`;
      for(let i=0; i<3; i++) {
          text += \`\${i+1}. \${sorted[i].name}
  \`;
      }
      text += \`
  Sent from the Official Burdwan Puja App. View the live leaderboard now!\`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
          setToast(true);
          setTimeout(() => setToast(false), 3000);
      });

      // Open WhatsApp Direct to Burdwan Capturers (replace with specific WA number if needed)
      // e.g., https://wa.me/918918987179?text=...
      const waUrl = \`https://wa.me/?text=\${encodeURIComponent(text)}\`;
      window.open(waUrl, '_blank');
    };`;

code = code.replace(oldShare, newShare);

// 3. Update the page subtitle to reflect the global leaderboard
code = code.replace(
  `Vote, rate, and rank the most iconic pandals. Your top 3 favorites will automatically climb the podium based on your interactions.`,
  `Explore the Global Leaderboard. The top 3 pandals are curated live from all community votes across Burdwan. Your rating directly influences their rank.`
);
code = code.replace(
  `My Top 3 Pandals`,
  `Community Top 3`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Applied community leaderboard and WhatsApp share.");
