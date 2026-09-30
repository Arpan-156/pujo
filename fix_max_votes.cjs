const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Inject the votedClubIds and max check logic into Top3VoterPage
const target1 = /const rate = \(id: string, rating: number\) => \{[\s\S]*?saveState\(id, \{ \.\.\.s, upvoted: !s\.upvoted \}\);\n  \};/;

const replacement1 = `
  const votedClubIds = Object.keys(userState).filter(id => userState[id].rating > 0 || userState[id].upvoted);

  const rate = (id: string, rating: number) => {
    if (!votedClubIds.includes(id) && votedClubIds.length >= 3) {
      alert("You can only vote for up to 3 clubs! Please clear your votes to start over.");
      return;
    }
    saveState(id, { ...(userState[id] || { rating: 0, upvoted: false }), rating });
  };

  const toggleUpvote = (id: string) => {
    if (!votedClubIds.includes(id) && votedClubIds.length >= 3) {
      alert("You can only vote for up to 3 clubs! Please clear your votes to start over.");
      return;
    }
    const s = userState[id] || { rating: 0, upvoted: false };
    saveState(id, { ...s, upvoted: !s.upvoted });
  };

  const clearVotes = async () => {
    if (!confirm("Are you sure you want to clear your cast votes?")) return;
    setIsSyncing(true);
    for (const id of votedClubIds) {
      const s = userState[id];
      await submitGlobalVote(id, -s.rating, -(s.upvoted ? 1 : 0));
    }
    setUserState({});
    localStorage.removeItem('puja_votes_26');
    const latestGlobal = await fetchGlobalLeaderboard();
    setGlobalState(latestGlobal);
    setIsSyncing(false);
  };
`;

code = code.replace(target1, replacement1);

// 2. Add the Clear Votes button to the UI
const target2 = /<button className="t3-share" onClick=\{shareBracket\}>[\s\S]*?<\/button>/;
const replacement2 = `<div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="t3-share" onClick={shareBracket}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                Share My Bracket
              </button>
              {votedClubIds.length > 0 && (
                <button className="t3-share" style={{ background: 'transparent', border: '2px solid #e9b558', color: '#e9b558', boxShadow: 'none' }} onClick={clearVotes}>
                  Clear My Votes
                </button>
              )}
            </div>`;

code = code.replace(target2, replacement2);

// 3. Disable un-voted clubs visually
const target3 = /<div className="t3-grid">[\s\S]*?\{sorted\.map\(\(p, idx\) => \{[\s\S]*?const s = userState\[p\.id\] \|\| \{ rating: 0, upvoted: false \};/;
const replacement3 = `<div className="t3-grid">
              {sorted.map((p, idx) => {
                const s = userState[p.id] || { rating: 0, upvoted: false };
                const isMaxedOut = !votedClubIds.includes(p.id) && votedClubIds.length >= 3;
`;

code = code.replace(target3, replacement3);

const target4 = /<div key=\{p\.id\} className="t3-card">/;
const replacement4 = `<div key={p.id} className="t3-card" style={{ opacity: isMaxedOut ? 0.4 : 1, pointerEvents: isMaxedOut ? 'none' : 'auto' }}>`;

code = code.replace(target4, replacement4);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Implemented max 3 votes and clear button.");
