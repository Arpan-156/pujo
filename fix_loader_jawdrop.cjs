const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

const regex = /\.loader-core \{[\s\S]*?\.loader-bar span \{[\s\S]*?\}\s*\}/;

const newStyles = `.loader-core { 
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; transition: opacity 0.6s, transform 0.6s;
  width: 100%;
}
.loader.tap .loader-core { opacity: 0; transform: scale(1.3); filter: blur(20px); }

.loader-ring-wrapper {
  position: relative; width: 240px; height: 240px; 
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 30px;
}

.loader-circular {
  position: absolute; inset: 0; width: 100%; height: 100%;
  transform: rotate(-90deg);
  filter: drop-shadow(0 0 20px rgba(233, 181, 88, 0.6));
}

.loader-circle-bg {
  fill: none; stroke: rgba(255, 255, 255, 0.05); stroke-width: 4;
}

.loader-circle-progress {
  fill: none; stroke: var(--gold); stroke-width: 6; stroke-linecap: round;
  stroke-dasharray: 565.48;
  transition: stroke-dashoffset 0.15s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.loader-alpana { 
  opacity: 0.25; width: 160px; height: 160px; color: var(--gold); 
  animation: spin 10s linear infinite, breathing 3s ease-in-out infinite; 
  position: absolute;
}

@keyframes breathing {
  0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 10px rgba(233,181,88,0.2)); }
  50% { transform: scale(1.1) rotate(180deg); filter: drop-shadow(0 0 40px rgba(233,181,88,1)); opacity: 0.5; }
}

.loader-pct-center {
  position: absolute; z-index: 3;
  font-family: var(--f-display); font-size: 3rem; font-weight: 900;
  color: #fff; text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(233, 181, 88, 1);
  font-variant-numeric: tabular-nums;
  animation: pulseLight 1s infinite alternate;
}

@keyframes pulseLight {
  from { text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(233,181,88,0.3); }
  to { text-shadow: 0 0 20px rgba(255,255,255,1), 0 0 50px rgba(233, 181, 88, 1); }
}

.loader-bn { 
  font-family: var(--f-bn); font-size: clamp(2.2rem, 7vw, 3.5rem); 
  background: linear-gradient(180deg, #fff 0%, #e9b558 100%); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
  margin: 0; letter-spacing: 2px; text-shadow: 0 10px 40px rgba(233,181,88,0.5); 
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.loader-en { 
  color: rgba(255,255,255,0.6); font-size: 0.95rem; letter-spacing: 12px; 
  text-transform: uppercase; margin-bottom: 20px; font-weight: bold;
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards; opacity: 0;
}`;

code = code.replace(regex, newStyles);
fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Replaced entrance.css with jaw-dropping circular styles.");
