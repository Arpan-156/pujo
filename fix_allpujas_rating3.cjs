const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /export function PujasPage\(\) \{\s*const \{ pujas, themes \} = useData\(\);/g;
const injected = `export function PujasPage() {
    const { pujas, themes } = useData();
    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);`;

code = code.replace(regex, injected);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("PujasPage userState injected.");
