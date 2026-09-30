const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

const target = /function DhakTile\(\) \{[\s\S]*?<\/ol>\n    <\/div>\n  \);\n\}/;

const replacement = `function DhakTile() {
  const [hit, setHit] = useState(0);
  const [step, setStep] = useState(-1);
  const [auto, setAuto] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (auto) {
      let i = 0;
      const id = setInterval(() => {
        setStep(i % 16);
        i++;
      }, 200);
      return () => clearInterval(id);
    } else {
      setStep(-1);
    }
  }, [auto]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggleAuto = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/dhak.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 1.0;
    }
    const nextState = !auto;
    setAuto(nextState);
    if (nextState) {
      audioRef.current.play().catch(e => console.error("Audio block:", e));
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="xp xp-dhak">
      <div className="xp-copy">
        <p className="bn" lang="bn">\u09A2\u09BE\u0995</p>
        <h3>Dhak</h3>
        <p>The drum that tells the neighbourhood it is time. Tap it, or let the pattern run.</p>
        <button className={\`chip \${auto ? 'solid' : ''}\`} aria-pressed={auto} onClick={toggleAuto} data-cursor={auto ? 'Stop' : 'Play'}>{auto ? 'Stop the track' : 'Play the track'}</button>
      </div>
      <button className={\`dhak-drum \${hit ? 'hit' : ''}\`} key={hit} onClick={() => { setHit((h) => h + 1); engine.playDhakBass(); }} aria-label="Strike the dhak" data-cursor="Strike">
        {hit > 0 && <><span className="ripple" /><span className="ripple r2" /></>}
        <svg viewBox="0 0 240 200" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="dk" cx=".5" cy=".4"><stop offset="0" stopColor="#f6dfa8" /><stop offset="1" stopColor="#b9772f" /></radialGradient>
          </defs>
          <path d="M28 66C90 42 150 42 212 66l14 84c-62 34-150 34-212 0z" fill="#5b1216" stroke="#e9b558" strokeWidth="2" />
          {Array.from({ length: 11 }, (_, i) => <path key={i} d={\`M\${38 + i * 16} 60L\${28 + i * 18.5} 158\`} stroke="#e9b558" strokeOpacity=".55" strokeWidth="1.4" />)}
          <ellipse cx="120" cy="62" rx="94" ry="20" fill="url(#dk)" stroke="#e9b558" strokeWidth="2" />
          <ellipse cx="120" cy="62" rx="36" ry="7" fill="#7a3d12" opacity=".5" />
          <path d="M8 18l70 40M232 18l-70 40" stroke="#e9b558" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </button>
      <ol className="dhak-steps" aria-label="Rhythm pattern">
        {PAT.split('').map((c, i) => <li key={i} className={\`\${c === 't' ? 'soft' : c === 'd' ? 'mid' : 'hard'} \${step === i ? 'on' : ''}\`} />)}
      </ol>
    </div>
  );
}`;

code = code.replace(target, replacement);
fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Updated audio sync");
