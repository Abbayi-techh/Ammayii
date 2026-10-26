// Audio Synthesizer & Sound Effects using Web Audio API
// Self-contained, zero-external dependency ambient music & SFX engine

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.isMuted = false;
    this.musicTimer = null;
    this.currentChordIndex = 0;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;

    // Dreamy Lofi / Ambient Chord Progression (Frequencies in Hz)
    // Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 -> Em7
    this.chords = [
      [130.81, 196.00, 246.94, 293.66, 329.63], // Cmaj9 (C3, G3, B3, D4, E4)
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am9 (A2, E3, A3, C4, E4)
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7 (F3, A3, C4, E4, G4)
      [146.83, 196.00, 293.66, 392.00, 440.00], // Gsus4/add9 (D3, G3, D4, G4, A4)
      [164.81, 246.94, 293.66, 329.63, 392.00], // Em7 (E3, B3, D4, E4, G4)
    ];

    this.melodyNotes = [
      329.63, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMusic() {
    this.init();
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    this.playNextChord();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playNextChord() {
    if (!this.isPlayingMusic || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const chordDuration = 4.8; // seconds

    // Play pad voices for the chord
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for lush chorus feel
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 150, now);
      filter.Q.setValueAtTime(1.2, now);

      // Soft envelope (slow attack, sustained release)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + chordDuration);
    });

    // Random soft music chime note on top
    if (Math.random() > 0.3) {
      const delay = Math.random() * 2 + 0.8;
      const note = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      this.playPluckNote(note, now + delay, 0.08);
    }

    this.musicTimer = setTimeout(() => {
      this.playNextChord();
    }, 4000);
  }

  playPluckNote(freq, time, volume = 0.05) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 1.6);
  }

  // SFX: Heart Sparkle chime
  playSparkle() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + i * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  // SFX: Gift Box Unlocking / Fanfare
  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const fanfare = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.4 },
      { f: 880.00, d: 0.15 },
      { f: 1046.50, d: 0.8 }
    ];

    let t = now;
    fanfare.forEach((n) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + n.d + 0.05);

      t += n.d * 0.85;
    });
  }

  // SFX: Soft Pop
  playPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }
}

window.audioManager = new AudioManager();
