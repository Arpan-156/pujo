const fs = require('fs');

const codeToAppend = `
export function Top3VoterPage() {
  const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
  const [toast, setToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('puja_votes_26');
      if (saved) setUserState(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveState = (newState: Record<string, { rating: number; upvoted: boolean }>) => {
    setUserState(newState);
    localStorage.setItem('puja_votes_26', JSON.stringify(newState));
  };

  const PANDALS = [
    { id: 'p1', name: 'Sreebhumi Sporting', zone: 'Lake Town, Kol', tagline: 'Famous for massive architectural replicas and glowing lighting marvels.', baseVotes: 12450 },
    { id: 'p2', name: 'Alamganj Barowari', zone: 'Burdwan North', tagline: 'Breathtaking replica of the Kedarnath Temple with icy peaks.', baseVotes: 8920 },
    { id: 'p3', name: 'Ahiritola Sarbojanin', zone: 'North Kolkata', tagline: 'Heritage and classic traditional artistry honoring ancient roots.', baseVotes: 10430 },
    { id: 'p4', name: 'Boro Nilpur', zone: 'Burdwan Central', tagline: 'Dubai Swaminarayan Temple grand replica reaching the sky.', baseVotes: 7850 },
    { id: 'p5', name: 'Vivekananda Sevak Sangha', zone: 'Vivekananda Pally', tagline: 'Eco-friendly celebration focusing purely on mother nature.', baseVotes: 6120 },
    { id: 'p6', name: 'Rathtala Para Barowari', zone: 'Rathtala, Burdwan', tagline: 'Mythological Mahakal theme with stunning intricate art.', baseVotes: 9340 }
  ];

  const getScore = (p: any) => {
    const s = userState[p.id] || { rating: 0, upvoted: false };
    return p.baseVotes + (s.rating * 10000) + (s.upvoted ? 5000 : 0);
  };

  const sorted = [...PANDALS].sort((a, b) => getScore(b) - getScore(a));
  const top3 = [sorted[0], sorted[1], sorted[2]];

  const visualOrder = [
    { p: top3[1], rank: 2, class: 't3-pod-2', color: '#c0c0c0', label: '2ND' },
    { p: top3[0], rank: 1, class: 't3-pod-1', color: '#e9b558', label: '1ST' },
    { p: top3[2], rank: 3, class: 't3-pod-3', color: '#cd7f32', label: '3RD' }
  ];

  const rate = (id: string, rating: number) => {
    saveState({ ...userState, [id]: { ...(userState[id] || { rating: 0, upvoted: false }), rating } });
  };

  const toggleUpvote = (id: string) => {
    const s = userState[id] || { rating: 0, upvoted: false };
    saveState({ ...userState, [id]: { ...s, upvoted: !s.upvoted } });
  };

  const shareBracket = () => {
    let text = \`?? My Top 3 Durga Puja Pandals 2026:\n\n\`;
    for(let i=0; i<3; i++) {
        const s = userState[sorted[i].id] || { rating: 0 };
        const stars = '?'.repeat(s.rating) || 'Unrated';
        text += \`\${i+1}. \${sorted[i].name} (\${stars})\n\`;
    }
    text += \`\nWhat's yours? Cast your votes now! ?\`;
    navigator.clipboard.writeText(text).then(() => {
        setToast(true);
        setTimeout(() => setToast(false), 3000);
    });
  };

  return (
    <>
      <style>{\`
        .t3-wrap { padding: clamp(80px, 15vh, 120px) 20px; max-width: 1200px; margin: 0 auto; color: #fff; }
        .t3-head { text-align: center; margin-bottom: 60px; animation: fadeUp 0.6s ease-out forwards; }
        .t3-head h1 { font-family: var(--f-display); font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 16px; 
                      background: linear-gradient(135deg, #e9b558, #ffde82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .t3-head p { color: var(--mute); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .t3-podium-sec { text-align: center; margin-bottom: 80px; animation: fadeUp 0.6s ease-out 0.2s forwards; opacity: 0; }
        .t3-podium { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 260px; margin-bottom: 40px; }
        @media (min-width: 768px) { .t3-podium { gap: 24px; } }
        
        .t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; }
        @media (min-width: 768px) { .t3-pod-slot { width: 160px; } }
        
        .t3-pod-info { text-align: center; margin-bottom: 16px; transition: transform 0.3s; }
        .t3-pod-slot:hover .t3-pod-info { transform: translateY(-8px); }
        .t3-pod-lbl { font-size: 0.75rem; font-weight: bold; letter-spacing: 2px; margin-bottom: 4px; }
        .t3-pod-name { font-family: var(--f-display); font-size: clamp(0.9rem, 2vw, 1.25rem); font-weight: bold; line-height: 1.2; padding: 0 4px; }
        .t3-pod-stars { color: var(--gold); font-size: 0.75rem; letter-spacing: 2px; margin-top: 4px; }
        
        .t3-pod-base { width: 100%; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px; backdrop-filter: blur(10px); border-radius: 8px 8px 0 0; }
        .t3-pod-base span { font-family: var(--f-display); font-size: 3rem; font-weight: 900; opacity: 0.2; }
        
        .t3-pod-1 { height: 180px; background: linear-gradient(180deg, rgba(233,181,88,0.2) 0%, transparent 100%); border-top: 4px solid #e9b558; }
        .t3-pod-2 { height: 130px; background: linear-gradient(180deg, rgba(192,192,192,0.15) 0%, transparent 100%); border-top: 4px solid #c0c0c0; }
        .t3-pod-3 { height: 100px; background: linear-gradient(180deg, rgba(205,127,50,0.15) 0%, transparent 100%); border-top: 4px solid #cd7f32; }
        
        .t3-share { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(45deg, #e9b558, #ffde82); color: #000; padding: 14px 32px; border: none; border-radius: 50px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 30px rgba(233,181,88,0.3); }
        .t3-share:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(233,181,88,0.5); }
        
        .t3-cat-head { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 32px; }
        .t3-cat-head h2 { font-family: var(--f-display); font-size: 2rem; color: var(--gold); }
        .t3-cat-head span { color: var(--mute); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
        
        .t3-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .t3-card { background: linear-gradient(145deg, rgba(20,5,8,0.9), rgba(40,10,15,0.7)); border: 1px solid rgba(233,181,88,0.2); border-radius: 16px; padding: 24px; position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .t3-card:hover { transform: translateY(-6px); }
        .t3-top3-badge { position: absolute; top: 0; right: 0; background: var(--gold); color: #000; font-size: 0.7rem; font-weight: bold; padding: 4px 12px; border-radius: 0 0 0 8px; text-transform: uppercase; letter-spacing: 1px; }
        
        .t3-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .t3-zone { display: inline-block; font-size: 0.65rem; font-weight: bold; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; margin-bottom: 12px; }
        .t3-name { font-family: var(--f-display); font-size: 1.5rem; font-weight: bold; color: #fff; margin: 0; line-height: 1.2; }
        
        .t3-upvote { background: none; border: none; color: rgba(255,255,255,0.2); cursor: pointer; transition: all 0.3s; padding: 0; display: flex; align-items: center; justify-content: center; }
        .t3-upvote.voted { color: var(--gold); transform: scale(1.15); filter: drop-shadow(0 0 8px rgba(233,181,88,0.6)); }
        
        .t3-desc { color: var(--mute); font-size: 0.9rem; line-height: 1.6; margin-bottom: 24px; min-height: 45px; }
        
        .t3-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
        .t3-stars { display: flex; gap: 4px; }
        .t3-star { cursor: pointer; color: rgba(255,255,255,0.2); transition: transform 0.2s, color 0.2s; }
        .t3-star:hover, .t3-star.active { color: var(--gold); transform: scale(1.2); filter: drop-shadow(0 0 4px rgba(233,181,88,0.5)); }
        .t3-pts { font-size: 0.75rem; font-weight: bold; letter-spacing: 2px; color: rgba(255,255,255,0.4); }
        
        .t3-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(233,181,88,0.3); color: #fff; padding: 12px 24px; border-radius: 50px; font-weight: bold; pointer-events: none; opacity: 0; transition: opacity 0.3s; z-index: 1000; }
        .t3-toast.show { opacity: 1; }
      \`}</style>
      
      <div className="t3-wrap">
        <header className="t3-head">
          <h1>My Top 3 Pandals</h1>
          <p>Vote, rate, and rank the most iconic pandals. Your top 3 favorites will automatically climb the podium based on your interactions.</p>
        </header>
        
        <section className="t3-podium-sec">
          <div className="t3-podium">
            {visualOrder.map((slot, i) => {
              const s = userState[slot.p.id] || { rating: 0 };
              return (
                <div key={i} className="t3-pod-slot">
                  <div className="t3-pod-info">
                    <div className="t3-pod-lbl" style={{ color: slot.color }}>{slot.label}</div>
                    <div className="t3-pod-name">{slot.p.name}</div>
                    <div className="t3-pod-stars">{'?'.repeat(s.rating)}{'?'.repeat(5-s.rating)}</div>
                  </div>
                  <div className={\`t3-pod-base \${slot.class}\`}>
                    <span style={{ color: slot.color }}>{slot.rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="t3-share" onClick={shareBracket}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Share My Bracket
          </button>
        </section>
        
        <section>
          <div className="t3-cat-head">
            <h2>Pandal Catalog</h2>
            <span>Rate to Rank</span>
          </div>
          <div className="t3-grid">
            {sorted.map((p, idx) => {
              const s = userState[p.id] || { rating: 0, upvoted: false };
              const isTop3 = idx < 3;
              return (
                <div key={p.id} className="t3-card">
                  {isTop3 && <div className="t3-top3-badge">Top 3</div>}
                  <div className="t3-card-top">
                    <div>
                      <span className="t3-zone">{p.zone}</span>
                      <h3 className="t3-name">{p.name}</h3>
                    </div>
                    <button className={\`t3-upvote \${s.upvoted ? 'voted' : ''}\`} onClick={() => toggleUpvote(p.id)} aria-label="Upvote">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={s.upvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                  </div>
                  <p className="t3-desc">{p.tagline}</p>
                  <div className="t3-foot">
                    <div className="t3-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg key={star} onClick={() => rate(p.id, star)} className={\`t3-star \${star <= s.rating ? 'active' : ''}\`} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <div className="t3-pts">{getScore(p).toLocaleString()} PTS</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      
      <div className={\`t3-toast \${toast ? 'show' : ''}\`}>Copied to clipboard!</div>
    </>
  );
}
`;

let pagesContent = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
pagesContent += '\n' + codeToAppend;
fs.writeFileSync('src/pages/Pages.tsx', pagesContent);
console.log("Appended Top3VoterPage to Pages.tsx");
