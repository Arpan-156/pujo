const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const popupLogic = `
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);
`;

pages = pages.replace(
  'export function PujasPage() {\n    const { pujas, themes } = useData();\n    const [userState, setUserState]',
  'export function PujasPage() {\n    const { pujas, themes } = useData();\n' + popupLogic + '\n    const [userState, setUserState]'
);

// wait, let's use a simpler regex
pages = pages.replace(/export function PujasPage\(\) \{\s+const \{ pujas, themes \} = useData\(\);/, 'export function PujasPage() {\n    const { pujas, themes } = useData();\n' + popupLogic);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Fixed PujasPage popup state');
