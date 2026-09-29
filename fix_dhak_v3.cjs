const fs = require('fs');
let code = fs.readFileSync('src/audio/engine.ts', 'utf8');

const betterDhak = `  private dhak(t: number, amp: number, thump: boolean, soft = false, dest?: AudioNode) {
    const ctx = this.ctx!;
    
    // THE BENGAL DHAK - Physically modeled using FM synthesis and layered noise
    
    if (thump) {
      // 1. The Deep Bass Resonance (Bayan)
      // Two oscillators slightly detuned to create the vibrating leather "wobble"
      const osc1 = ctx.createOscillator(); osc1.type = 'sine';
      const osc2 = ctx.createOscillator(); osc2.type = 'sine';
      
      const startFreq = soft ? 120 : 160;
      const endFreq = 50;
      const dropTime = soft ? 0.3 : 0.45;
      
      osc1.frequency.setValueAtTime(startFreq, t); 
      osc1.frequency.exponentialRampToValueAtTime(endFreq, t + dropTime);
      
      osc2.frequency.setValueAtTime(startFreq * 1.05, t); // Detuned for wobble
      osc2.frequency.exponentialRampToValueAtTime(endFreq * 1.02, t + dropTime);
      
      const bassGain = ctx.createGain();
      osc1.connect(bassGain);
      osc2.connect(bassGain);
      
      this.env(bassGain, t, 0.6 * amp, 0.005, dropTime + 0.1, dest);
      osc1.start(t); osc1.stop(t + dropTime + 0.2);
      osc2.start(t); osc2.stop(t + dropTime + 0.2);

      // 2. The Bass Skin Slap (Impact)
      const slapNoise = ctx.createBufferSource(); slapNoise.buffer = this.noise; slapNoise.loop = true;
      const slapLpf = ctx.createBiquadFilter(); slapLpf.type = 'lowpass'; slapLpf.frequency.value = 400;
      const slapGain = ctx.createGain();
      
      slapNoise.connect(slapLpf).connect(slapGain);
      this.env(slapGain, t, 0.3 * amp, 0.001, 0.08, dest);
      slapNoise.start(t); slapNoise.stop(t + 0.1);
    }

    if (!soft) {
      // 3. The Kathi (Bamboo Stick Hit)
      // A sharp, metallic/woody "Tak" sound
      
      // The fundamental wood resonance
      const wood = ctx.createOscillator(); wood.type = 'triangle';
      wood.frequency.setValueAtTime(800, t);
      wood.frequency.exponentialRampToValueAtTime(600, t + 0.1);
      
      const woodGain = ctx.createGain();
      wood.connect(woodGain);
      this.env(woodGain, t, 0.25 * amp, 0.001, 0.06, dest);
      wood.start(t); wood.stop(t + 0.1);
      
      // The stick friction/rattle (High bandpass noise)
      const kathiNoise = ctx.createBufferSource(); kathiNoise.buffer = this.noise; kathiNoise.loop = true;
      const kathiBpf = ctx.createBiquadFilter(); kathiBpf.type = 'bandpass'; 
      kathiBpf.frequency.value = 3500; kathiBpf.Q.value = 1.5;
      
      const kathiGain = ctx.createGain();
      kathiNoise.connect(kathiBpf).connect(kathiGain);
      this.env(kathiGain, t, 0.4 * amp, 0.001, 0.05, dest);
      kathiNoise.start(t); kathiNoise.stop(t + 0.08);
    }
  }`;

const oldDhakRegex = /private dhak\(t: number, amp: number, thump: boolean, soft = false, dest\?: AudioNode\) \{[\s\S]*?\n  \}/;
code = code.replace(oldDhakRegex, betterDhak);
fs.writeFileSync('src/audio/engine.ts', code, 'utf8');
console.log("Injected V3 Dhak Synthesis");
