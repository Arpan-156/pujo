const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

const regex = /\.loader-core \{[\s\S]*?\.loader-pct \{[\s\S]*?\}/;

const newStyles = `.loader-core { 
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; transition: opacity 0.6s, transform 0.6s;
  padding: 20px; width: 100%;
}
.loader.tap .loader-core { opacity: 0; transform: scale(1.1) translateY(-30px); filter: blur(10px); }

/* The mystical rotating aura */
.loader-core::before, .loader-core::after {
  content: ''; position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
  width: 280px; height: 280px; border-radius: 50%;
  pointer-events: none;
}
.loader-core::before {
  border: 1px dashed rgba(233, 181, 88, 0.4);
  animation: spin 20s linear infinite reverse;
}
.loader-core::after {
  border: 2px solid transparent;
  border-top-color: rgba(233, 181, 88, 0.8);
  border-bottom-color: rgba(233, 181, 88, 0.2);
  animation: spin 10s cubic-bezier(0.4, 0.1, 0.4, 0.9) infinite;
  box-shadow: 0 0 30px rgba(233, 181, 88, 0.1);
}

.loader-alpana { 
  opacity: 1; width: 140px; height: 140px; color: var(--gold); 
  animation: spin 14s linear infinite, pulseGlow 2s ease-in-out infinite; 
  filter: drop-shadow(0 0 20px rgba(233,181,88,0.7)); 
  margin-bottom: 20px; position: relative; z-index: 2;
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(233,181,88,0.4)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 40px rgba(233,181,88,1)); }
}

.loader-bn { 
  font-family: var(--f-bn); font-size: clamp(2rem, 6vw, 3rem); 
  background: linear-gradient(180deg, #fff 0%, #e9b558 100%); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
  margin: 0; letter-spacing: 2px; text-shadow: 0 10px 30px rgba(233,181,88,0.4); 
  animation: fadeUp 1s ease-out forwards;
}
.loader-en { 
  color: var(--mute); font-size: clamp(0.9rem, 2vw, 1.1rem); letter-spacing: 8px; 
  text-transform: uppercase; font-weight: bold; margin-bottom: 30px; 
  animation: fadeUp 1s ease-out 0.2s forwards; opacity: 0;
}

.loader-bar-wrap { position: relative; width: min(400px, 85vw); margin-top: 10px; animation: fadeUp 1s ease-out 0.4s forwards; opacity: 0; }
.loader-bar { width: 100%; height: 2px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; position: relative; }
.loader-bar span { 
  display: block; height: 100%; background: linear-gradient(90deg, transparent, #ffde82, #fff); 
  transform-origin: left; transition: transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1); 
  box-shadow: 0 0 20px rgba(233,181,88,1); 
}
.loader-bar::after {
  content: ''; position: absolute; right: 0; top: -5px; width: 10px; height: 10px; background: #fff; border-radius: 50%; box-shadow: 0 0 15px #fff; opacity: 0;
}
.loader-pct { 
  font-variant-numeric: tabular-nums; color: var(--gold); font-size: 1rem; font-weight: 900; 
  letter-spacing: 3px; position: absolute; right: 0; top: -35px; text-shadow: 0 0 15px rgba(233,181,88,0.6); 
}`;

code = code.replace(regex, newStyles);
fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Loader CSS updated to remove boxy view.");
