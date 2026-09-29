const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

const regex = /\.loader-core \{[\s\S]*?\.loader-pct \{[\s\S]*?\}/;

const newStyles = `.loader-core { 
  position: relative; z-index: 1; display: grid; justify-items: center; gap: 20px; transition: opacity 0.6s, transform 0.6s;
  padding: 60px 80px; border-radius: 24px;
  background: linear-gradient(145deg, rgba(20,5,8,0.85), rgba(30,6,12,0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(233,181,88,0.2);
  border-bottom: 2px solid rgba(233,181,88,0.5);
  box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 20px 40px rgba(233,181,88,0.05), 0 0 100px rgba(233,181,88,0.1);
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.loader.tap .loader-core { opacity: 0; transform: scale(0.95) translateY(-20px); }
.loader-alpana { opacity: 1; width: 140px; height: 140px; color: var(--gold); animation: spin 14s linear infinite; filter: drop-shadow(0 0 15px rgba(233,181,88,0.5)); margin-bottom: 10px; }
.loader-bn { font-family: var(--f-bn); font-size: clamp(1.8rem, 5vw, 2.4rem); background: linear-gradient(135deg, #fff, var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; letter-spacing: 2px; text-shadow: 0 10px 20px rgba(0,0,0,0.5); }
.loader-en { color: var(--mute); font-size: 1rem; letter-spacing: 4px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; }
.loader-bar-wrap { position: relative; width: min(300px, 70vw); margin-top: 10px; }
.loader-bar { width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; position: relative; box-shadow: inset 0 1px 3px rgba(0,0,0,0.8); }
.loader-bar span { display: block; height: 100%; background: linear-gradient(90deg, #e9b558, #ffde82); transform-origin: left; transition: transform 0.12s linear; box-shadow: 0 0 15px rgba(233,181,88,0.8); }
.loader-pct { font-variant-numeric: tabular-nums; color: var(--gold); font-size: 0.9rem; font-weight: bold; letter-spacing: 2px; position: absolute; right: 0; top: -30px; text-shadow: 0 0 10px rgba(233,181,88,0.3); }`;

code = code.replace(regex, newStyles);
fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Loader CSS updated.");
