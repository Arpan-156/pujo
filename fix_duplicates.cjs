const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const doubleInject = `    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);
    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);`;

const singleInject = `    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);`;

if(code.includes(doubleInject)) {
    code = code.replace(doubleInject, singleInject);
}

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed duplicate declarations.");
