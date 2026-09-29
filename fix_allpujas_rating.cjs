const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Inject userState to PujasPage
const pujasPageStart = `export function PujasPage() {
    const { pujas, themes } = useData();`;

const pujasPageInjected = `export function PujasPage() {
    const { pujas, themes } = useData();
    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);`;

if (code.includes(pujasPageStart)) {
    code = code.replace(pujasPageStart, pujasPageInjected);
}

// Inject stars into the plist-col
const targetRow = `<h3 className="plist-name">{p.name}</h3>
                    </div>`;

const injectedRow = `<h3 className="plist-name" style={{ marginBottom: '8px' }}>{p.name}</h3>
                      {userState[p.slug]?.rating > 0 && (
                        <div style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{'?'.repeat(userState[p.slug].rating)}{'?'.repeat(5 - userState[p.slug].rating)}</span>
                          <span style={{ color: 'var(--mute)', letterSpacing: 'normal', fontSize: '0.75rem' }}>Your Rating</span>
                        </div>
                      )}
                    </div>`;

if (code.includes(targetRow)) {
    code = code.replace(targetRow, injectedRow);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("PujasPage updated with ratings.");
} else {
    console.log("Could not find target row in PujasPage.");
}
