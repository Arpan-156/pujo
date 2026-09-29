const fs = require('fs');
let css = fs.readFileSync('src/styles/entrance.css', 'utf8');

const regex = /\.loader-tap \{[\s\S]*?@keyframes pulse \{[\s\S]*?\}/;

const newCss = `.loader-tap { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; opacity: 0; pointer-events: none; transition: opacity 0.7s; padding: 24px; background: radial-gradient(circle at center, rgba(15, 5, 6, 0.6) 0%, rgba(10, 3, 4, 0.95) 100%); backdrop-filter: blur(8px); }
.loader-tap.in { opacity: 1; pointer-events: auto; }

.tap-ring-wrap { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.tap-ring-wrap:hover { transform: scale(1.15) translateY(-5px); }
.tap-ring-wrap:active { transform: scale(0.95); }

.tap-ring { position: absolute; inset: -20px; border-radius: 50%; border: 2px solid rgba(233, 181, 88, 0.4); animation: tap-ripple 2.5s cubic-bezier(0.21, 0.53, 0.56, 0.8) infinite; pointer-events: none; }
.tap-ring::after { content: ''; position: absolute; inset: -20px; border-radius: 50%; border: 1px solid rgba(233, 181, 88, 0.2); animation: tap-ripple 2.5s cubic-bezier(0.21, 0.53, 0.56, 0.8) infinite; animation-delay: 1.25s; }

.tap-ring-inner { width: 100%; height: 100%; background: linear-gradient(135deg, rgba(255, 222, 130, 0.95) 0%, rgba(212, 149, 39, 0.85) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 50px rgba(233, 181, 88, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.6), inset 0 -10px 20px rgba(0,0,0,0.2); border: 2px solid rgba(255, 255, 255, 0.4); position: relative; z-index: 2; transition: all 0.3s ease; }
.tap-ring-wrap:hover .tap-ring-inner { box-shadow: 0 15px 60px rgba(233, 181, 88, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.8); border-color: rgba(255, 255, 255, 0.8); }

.tap-play { width: 48px; height: 48px; color: #fff; margin-left: 6px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); transition: transform 0.3s ease; }
.tap-ring-wrap:hover .tap-play { transform: scale(1.1); }

@keyframes tap-ripple {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}

.tap-content { text-align: center; display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 2; }
.tap-main { font-family: var(--f-display); font-size: clamp(3rem, 8vw, 5.5rem); color: var(--gold); text-shadow: 0 0 40px rgba(233, 181, 88, 0.7), 0 4px 10px rgba(0,0,0,0.5); animation: float-text 5s ease-in-out infinite; letter-spacing: 3px; line-height: 1; margin: 0; }
.tap-sub { color: var(--shankha); font-size: clamp(0.9rem, 2vw, 1.1rem); opacity: 0.9; letter-spacing: 2px; margin: 0; text-transform: uppercase; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

@keyframes float-text {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); text-shadow: 0 15px 50px rgba(233, 181, 88, 0.9), 0 8px 20px rgba(0,0,0,0.4); }
}

.tap-skip { margin-top: 20px; color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.15); padding: 14px 36px; font-size: 0.85rem; border-radius: 40px; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); text-transform: uppercase; letter-spacing: 3px; background: rgba(255,255,255,0.02); cursor: pointer; position: relative; overflow: hidden; font-weight: bold; }
.tap-skip::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transform: translateX(-100%); transition: transform 0.6s; }
.tap-skip:hover { color: #fff; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.4); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
.tap-skip:hover::before { transform: translateX(100%); }`;

if (css.match(regex)) {
    css = css.replace(regex, newCss);
    fs.writeFileSync('src/styles/entrance.css', css, 'utf8');
    console.log("Replaced CSS");
} else {
    console.log("Regex didn't match.");
}
