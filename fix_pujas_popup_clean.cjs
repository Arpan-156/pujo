const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Use regex to remove all instances of showPopup from PujasPage
// Then insert exactly once.
pages = pages.replace(/export function PujasPage\(\) \{[\s\S]*?const \{ query, navigate \} = useRouter\(\);/,
  'export function PujasPage() {\n    const { pujas, themes } = useData();\n    const [showPopup, setShowPopup] = useState(false);\n    useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);\n    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});\n    useEffect(() => { try { const saved = localStorage.getItem("puja_votes_26"); if (saved) setUserState(JSON.parse(saved)); } catch (e) {} }, []);\n    const { query, navigate } = useRouter();'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Cleaned up PujasPage popup');
