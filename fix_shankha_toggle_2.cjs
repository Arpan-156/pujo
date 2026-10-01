const fs = require('fs');

let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

const startIdx = code.indexOf('function ShankhaTile() {');
const endIdx = code.indexOf('export function Experiences() {');

const newShankhaTile = `function ShankhaTile() {
  const [n, setN] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleShankha = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/shankha.mp3');
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false);
        setN(0);
      });
    }

    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
      setN(0);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error(e));
      setPlaying(true);
      setN(v => v + 1);
    }
  };

  return (
    <div className="xp xp-shankha">
      <div className="xp-copy">
        <p className="bn" lang="bn">????</p>
        <h3>Shankha</h3>
        <p>Married women blow the conch at every welcome. One long breath, held as long as you can.</p>
        <button className={\`chip \${playing ? '' : 'solid'}\`} aria-pressed={playing} onClick={toggleShankha} data-cursor={playing ? "Stop" : "Blow"}>
          {playing ? 'Stop the shankha' : 'Blow the shankha'}
        </button>
      </div>
      <div className="shankha-stage" key={n}>
        {n > 0 && [0, 1, 2, 3].map((i) => <span key={i} className="wave" style={{ animationDelay: \`\${i * 0.35}s\` }} />)}
        <svg viewBox="0 0 200 160" fill="none" aria-hidden="true" className={n > 0 ? 'glow' : ''}>
          <path d="M30 100c0-42 32-74 82-74 30 0 52 16 52 40 0 22-18 36-40 36-14 0-26-8-26-20 0-10 8-16 18-16" stroke="#f6efe2" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 100c-8 10-6 30 14 36 34 10 82 0 100-30" stroke="#f6efe2" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={\`M\${58 + i * 20} \${44 + i * 3}q10 \${18 - i * 2} \${-2} \${34 - i * 3}\`} stroke="#f6efe2" strokeOpacity=".5" strokeWidth="1.6" />)}
          <path d="M20 108l14-8" stroke="#c8281e" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

`;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newShankhaTile + code.substring(endIdx);
  fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
  console.log("ShankhaTile updated successfully with toggle logic!");
} else {
  console.log("Could not find start or end index.");
}
