const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const newEntrance = `
  export function Entrance({ onDone }: { onDone: () => void }) {
    const [step, setStep] = useState(0);
    const reduced = useReducedMotion();
    const skip = () => setStep(5);
  
    useEffect(() => {
      if (reduced) { skip(); return; }
      const t1 = setTimeout(() => setStep(1), 300);
      const t2 = setTimeout(() => setStep(2), 1600);
      const t3 = setTimeout(() => setStep(3), 3200);
      const t4 = setTimeout(() => setStep(4), 5800);
      const t5 = setTimeout(() => { setStep(5); onDone(); }, 6800);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [reduced, onDone]);
  
    if (step === 5) return null;
  
    return (
      <div className={\`intro \${step >= 4 ? 'leaving' : ''} s\${step}\`} onClick={step < 3 ? skip : undefined}>
        {/* Jaw-dropping ambient background */}
        <div className="intro-cinematic-bg">
            <div className="intro-bg-img" />
            <div className="intro-bg-overlay" />
        </div>
        
        <Smoke className="intro-smoke" />
        <Particles kind="embers" count={120} className="intro-embers" />
        
        <div className="intro-vignette" />
        
        <div className="intro-center">
          <p className={\`intro-bn \${step >= 1 ? 'in' : ''}\`}>??? ?????????</p>
          
          <div className="intro-title-wrap">
              <h1 className={\`intro-title \${step >= 2 ? 'in' : ''}\`} aria-label="Bardhaman Durga Puja 2026">
                <span className="intro-line-1">BARDHAMAN</span>
                <span className="intro-line-2">DURGA PUJA</span>
                <span className="intro-line-3">2026</span>
              </h1>
              <div className={\`intro-lens-flare \${step >= 2 ? 'fire' : ''}\`} />
          </div>

          <div className={\`intro-presented \${step >= 3 ? 'in' : ''}\`}>
            <div className="intro-line-dec">
                <span className="line"></span>
                <span className="diamond"></span>
                <span className="line"></span>
            </div>
            <p className="pre">PRESENTED BY</p>
            <p className="who"><span>Burdwan Capturers Official</span><span className="cross">&times;</span><span>Banglar Pujo Official</span></p>
          </div>
        </div>
        
        <button className="intro-skip" onClick={skip}>
            <span className="skip-text">Skip Intro</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    );
  }
`;

const oldEntranceRegex = /export function Entrance\(\{ onDone \}: \{ onDone: \(\) => void \}\) \{[\s\S]*?return \([\s\S]*?<\/div>\s*\);\s*\}/;
code = code.replace(oldEntranceRegex, newEntrance.trim());
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log("Updated Entrance component JSX.");
