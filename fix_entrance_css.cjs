const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

// Replace the entire /* ---------- intro ---------- */ section up to /* ---------- curtain ---------- */
const oldIntroCSS = /\/\* ---------- intro ---------- \*\/[\s\S]*?(?=\/\* ---------- curtain ---------- \*\/)/;

const newIntroCSS = `/* ---------- intro ---------- */
.intro { position: fixed; inset: 0; z-index: 190; background: #050102; display: grid; place-items: center; overflow: hidden; transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
.intro.leaving { opacity: 0; pointer-events: none; }

/* Cinematic Background */
.intro-cinematic-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.intro-bg-img { position: absolute; inset: -5%; width: 110%; height: 110%; background: url('/cover.jpg') center/cover no-repeat; opacity: 0.15; transform: scale(1); animation: slow-zoom 15s linear forwards; mix-blend-mode: luminosity; }
@keyframes slow-zoom { to { transform: scale(1.15); opacity: 0.25; } }
.intro-bg-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 10%, #080203 70%), linear-gradient(0deg, #050102 10%, transparent 50%, #050102 90%); }

.intro-smoke { opacity: 0.6; z-index: 1; mix-blend-mode: screen; }
.intro-embers { z-index: 2; opacity: 0.8; }
.intro-vignette { position: absolute; inset: 0; z-index: 3; background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%); pointer-events: none; }

.intro-center { position: relative; z-index: 10; text-align: center; padding: 0 20px; display: grid; gap: clamp(20px, 4vh, 40px); justify-items: center; width: 100%; max-width: 1000px; }

/* Bengali Text */
.intro-bn { font-family: var(--f-bn); font-size: clamp(2rem, 6vw, 4rem); color: var(--gold); opacity: 0; filter: blur(20px); letter-spacing: 0.8em; transform: scale(1.1); transition: all 2.5s cubic-bezier(0.165, 0.84, 0.44, 1); text-shadow: 0 0 40px rgba(233,181,88,0.4); margin-bottom: -10px; }
.intro-bn.in { opacity: 1; filter: blur(0); letter-spacing: 0.15em; transform: scale(1); }
.intro.s2 .intro-bn { opacity: 0.7; transform: scale(0.85) translateY(-10px); }

/* Main Title */
.intro-title-wrap { position: relative; }
.intro-title { font-family: var(--f-display); font-weight: 500; font-size: clamp(2.8rem, 10vw, 8rem); line-height: 0.9; margin: 0; display: flex; flex-direction: column; align-items: center; text-transform: uppercase; letter-spacing: 0.05em; perspective: 1000px; }
.intro-title span { display: block; opacity: 0; filter: blur(24px); transform: translateY(40px) scale(0.95) rotateX(-20deg); transition: all 1.8s cubic-bezier(0.2, 0.8, 0.2, 1); background: linear-gradient(180deg, #ffffff 0%, #ffe8b3 30%, #c48a31 80%, #7a4b11 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.intro-title.in span { opacity: 1; filter: blur(0); transform: translateY(0) scale(1) rotateX(0); }
.intro-title span:nth-child(1) { transition-delay: 0.1s; }
.intro-title span:nth-child(2) { font-size: 1.1em; transition-delay: 0.3s; }
.intro-title span:nth-child(3) { font-size: 0.7em; letter-spacing: 0.2em; transition-delay: 0.5s; background: linear-gradient(180deg, #ffdf99, #b9772f); -webkit-background-clip: text; }

/* Lens Flare */
.intro-lens-flare { position: absolute; top: 40%; left: -20%; width: 140%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent); box-shadow: 0 0 20px 4px rgba(255,255,255,0.4), 0 0 60px 10px rgba(233,181,88,0.4); opacity: 0; transform: rotate(-15deg) translateY(-50px) scaleX(0); pointer-events: none; mix-blend-mode: screen; }
.intro-lens-flare.fire { animation: lens-sweep 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards; }
@keyframes lens-sweep { 
  0% { opacity: 0; transform: rotate(-15deg) translateY(-80px) scaleX(0) translateX(-30%); }
  30% { opacity: 1; transform: rotate(-15deg) translateY(-20px) scaleX(1) translateX(0%); }
  100% { opacity: 0; transform: rotate(-15deg) translateY(60px) scaleX(0.2) translateX(30%); }
}

/* Presented By */
.intro-presented { display: grid; justify-items: center; gap: 14px; opacity: 0; transform: translateY(20px); transition: all 1.6s cubic-bezier(0.2, 0.8, 0.2, 1); margin-top: 2vh; }
.intro-presented.in { opacity: 1; transform: translateY(0); }
.intro-line-dec { display: flex; align-items: center; gap: 10px; opacity: 0.6; }
.intro-line-dec .line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-2), transparent); }
.intro-line-dec .diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); box-shadow: 0 0 10px var(--gold); }
.intro-presented .pre { color: rgba(255,255,255,0.5); font-size: clamp(0.7rem, 1.5vw, 0.85rem); text-transform: uppercase; letter-spacing: 0.3em; margin: 0; }
.intro-presented .who { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 12px; font-family: var(--f-display); font-size: clamp(1rem, 2.5vw, 1.6rem); color: var(--shankha); margin: 0; }
.intro-presented .who .cross { color: var(--gold-2); font-style: normal; font-size: 1.2em; opacity: 0.7; font-weight: 300; }

/* Skip Button */
.intro-skip { position: absolute; right: clamp(20px, 4vw, 40px); bottom: clamp(24px, 4vh, 40px); z-index: 20; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 40px; color: rgba(255,255,255,0.6); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); cursor: pointer; transition: all 0.3s ease; }
.intro-skip:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.3); transform: translateX(4px); }
.intro-skip svg { opacity: 0.7; transition: transform 0.3s ease; }
.intro-skip:hover svg { transform: translateX(4px); opacity: 1; }

`;

code = code.replace(oldIntroCSS, newIntroCSS);
fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Updated entrance.css with jaw-dropping UI.");
