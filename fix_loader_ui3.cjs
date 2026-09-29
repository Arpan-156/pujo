const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

const regex = /\.loader-core \{[\s\S]*?\.loader-pct \{[\s\S]*?\}/;

const newStyles = `.loader-core { 
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; transition: opacity 0.6s, transform 0.6s;
  width: 100%;
}
.loader.tap .loader-core { opacity: 0; transform: scale(1.05); filter: blur(10px); }

.loader-alpana { 
  opacity: 0.9; width: 110px; height: 110px; color: var(--gold); 
  animation: spin 16s linear infinite; 
  filter: drop-shadow(0 0 15px rgba(233,181,88,0.4)); 
  margin-bottom: 10px;
}

.loader-bn { 
  font-family: var(--f-bn); font-size: clamp(1.8rem, 5vw, 2.5rem); 
  color: var(--gold-2); 
  margin: 0; letter-spacing: 1px; 
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.loader-en { 
  color: rgba(255,255,255,0.5); font-size: 0.85rem; letter-spacing: 6px; 
  text-transform: uppercase; margin-bottom: 20px; 
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards; opacity: 0;
}

.loader-bar-wrap { 
  position: relative; width: 240px; margin-top: 10px; 
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards; opacity: 0; 
}

.loader-pct { 
  font-variant-numeric: tabular-nums; color: var(--gold); font-size: 1rem; font-weight: 500; 
  letter-spacing: 2px; text-shadow: 0 0 10px rgba(233,181,88,0.4); 
  position: static; margin: 0;
}

.loader-bar { 
  width: 100%; height: 1px; background: rgba(255,255,255,0.1); position: relative; 
}

.loader-bar span { 
  display: block; height: 100%; background: var(--gold); 
  transform-origin: center; transition: transform 0.12s linear; 
  box-shadow: 0 0 10px rgba(233,181,88,0.5); 
}`;

code = code.replace(regex, newStyles);
fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Reverted to a clean, elegant, non-boxy minimalist UI.");
