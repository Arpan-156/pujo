const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const newDhak = `  private dhak(t: number, amp: number, thump: boolean, soft = false, dest?: AudioNode) {
    const ctx = this.ctx!;
    
    // Hyper-Realistic Bengal Dhak Synthesis
    
    // 1. The Baya (Bass side - Hand/Stick)
    if (thump) {
      // Main deep resonance
      const o = ctx.createOscillator(); o.type = 'triangle'; // Triangle gives the loose skin rattle
      o.frequency.setValueAtTime(soft ? 130 : 200, t); 
      o.frequency.exponentialRampToValueAtTime(45, t + (soft ? 0.2 : 0.35));
      
      const g = ctx.createGain(); 
      o.connect(g);
      this.env(g, t, 0.8 * amp, 0.005, soft ? 0.3 : 0.6, dest);
      o.start(t); o.stop(t + 0.6);

      // Shell boom (Sine wave)
      const shell = ctx.createOscillator(); shell.type = 'sine';
      shell.frequency.setValueAtTime(80, t);
      shell.frequency.exponentialRampToValueAtTime(60, t + 0.4);
      
      const shellG = ctx.createGain();
      shell.connect(shellG);
      this.env(shellG, t, 0.9 * amp, 0.01, 0.5, dest);
      shell.start(t); shell.stop(t + 0.6);
    }

    // 2. The Kathi (Treble side - Bamboo stick on leather)
    if (!soft) {
      // The sharp bamboo crack (high frequency sine/triangle FM)
      const stick = ctx.createOscillator(); stick.type = 'square';
      stick.frequency.setValueAtTime(3200, t);
      stick.frequency.exponentialRampToValueAtTime(800, t + 0.05);
      
      const stickG = ctx.createGain();
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 2;
      stick.connect(bp).connect(stickG);
      this.env(stickG, t, 0.4 * amp, 0.001, 0.03, dest);
      stick.start(t); stick.stop(t + 0.1);

      // The leather slap (Filtered noise)
      const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true;
      const bpNoise = ctx.createBiquadFilter(); bpNoise.type = 'bandpass'; bpNoise.frequency.value = 1800; bpNoise.Q.value = 0.8;
      
      const noiseG = ctx.createGain(); src.connect(bpNoise).connect(noiseG);
      this.env(noiseG, t, 0.5 * amp, 0.002, 0.12, dest);
      src.start(t); src.stop(t + 0.15);
    }
  }`;

// Find the old dhak function and replace it
const oldDhakRegex = /private dhak\(t: number, amp: number, thump: boolean, soft = false, dest\?: AudioNode\) \{[\s\S]*?\n  \}/;

code = code.replace(oldDhakRegex, newDhak);
fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Injected Hyper-Realistic Dhak Synthesis");
