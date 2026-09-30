const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Add import for api
if (!code.includes('fetchGlobalLeaderboard')) {
  code = code.replace(
    /import \{ useData \} from '\.\.\/data\/store';/,
    "import { useData } from '../data/store';\nimport { fetchGlobalLeaderboard, submitGlobalVote } from '../lib/api';"
  );
}

// 2. Modify Top3VoterPage
const newTop3 = `export function Top3VoterPage() {
  const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
  const [globalState, setGlobalState] = useState<Record<string, { score: number, upvotes: number }>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    // 1. Load local votes
    try {
      const saved = localStorage.getItem('puja_votes_26');
      if (saved) setUserState(JSON.parse(saved));
    } catch (e) {}

    // 2. Fetch Global Leaderboard asynchronously
    setIsSyncing(true);
    fetchGlobalLeaderboard().then(data => {
      setGlobalState(data);
      setIsSyncing(false);
    });
  }, []);

  const saveState = async (id: string, newLocalData: { rating: number; upvoted: boolean }) => {
    // Calculate difference to push to global backend
    const old = userState[id] || { rating: 0, upvoted: false };
    const ratingDiff = newLocalData.rating - old.rating;
    const upvoteDiff = (newLocalData.upvoted ? 1 : 0) - (old.upvoted ? 1 : 0);

    const newState = { ...userState, [id]: newLocalData };
    setUserState(newState);
    localStorage.setItem('puja_votes_26', JSON.stringify(newState));

    // Async push to industry-level backend
    if (ratingDiff !== 0 || upvoteDiff !== 0) {
      setIsSyncing(true);
      await submitGlobalVote(id, ratingDiff, upvoteDiff);
      // Re-fetch to get live consensus
      const latestGlobal = await fetchGlobalLeaderboard();
      setGlobalState(latestGlobal);
      setIsSyncing(false);
    }
  };

  const { pujas } = useData();
  const PANDALS = pujas.map(p => {
    const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      id: p.slug,
      name: p.name,
      zone: p.zone || 'Bardhaman',
      tagline: p.description || p.story || \`Theme: \${p.theme}\`,
      // Base is seeded so it looks realistic even before global votes roll in
      baseVotes: (stringVal * 12) + 1980
    };
  });

  const getScore = (p: typeof PANDALS[0]) => {
    const local = userState[p.id] || { rating: 0, upvoted: false };
    const global = globalState[p.id] || { score: 0, upvotes: 0 };
    // Mix static seed + live global + immediate local response
    return p.baseVotes + (local.rating * 10) + (local.upvoted ? 50 : 0) + (global.score * 10) + (global.upvotes * 50);
  };

  const sorted = [...PANDALS].sort((a, b) => getScore(b) - getScore(a));
  const top3 = [sorted[0], sorted[1], sorted[2]];

  const visualOrder = [
    { p: top3[1], rank: 2, class: 't3-pod-2', color: '#c0c0c0', label: '2ND' },
    { p: top3[0], rank: 1, class: 't3-pod-1', color: '#e9b558', label: '1ST' },
    { p: top3[2], rank: 3, class: 't3-pod-3', color: '#cd7f32', label: '3RD' }
  ];

  const rate = (id: string, rating: number) => {
    saveState(id, { ...(userState[id] || { rating: 0, upvoted: false }), rating });
  };

  const toggleUpvote = (id: string) => {
    const s = userState[id] || { rating: 0, upvoted: false };
    saveState(id, { ...s, upvoted: !s.upvoted });
  };`;

// Use regex to replace the function up to shareBracket
const targetRegex = /export function Top3VoterPage\(\) \{[\s\S]*?const shareBracket = \(\) => \{/;

code = code.replace(targetRegex, newTop3 + '\n\n  const shareBracket = () => {');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Upgraded Top3 to use API.");
