/**
 * Audio Service for Jaanu's Apology Experience
 * Features:
 * 1. Automatic autoplay with robust user-gesture fallback (plays immediately or on first touch anywhere).
 * 2. Plays Arctic Monkeys - I Wanna Be Yours.
 * 3. Fallback to Web Audio romantic piano synthesizer if media format fails.
 * 4. Reactive listeners for UI updates.
 */

type AudioStateListener = (isPlaying: boolean) => void;

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private synthTimer: number | null = null;
  private gainNode: GainNode | null = null;
  private listeners: Set<AudioStateListener> = new Set();
  private gestureAttached: boolean = false;

  private melodyNotes: { freq: number; dur: number; delay: number }[] = [
    { freq: 329.63, dur: 1.8, delay: 0 },
    { freq: 392.00, dur: 1.8, delay: 600 },
    { freq: 493.88, dur: 2.2, delay: 1200 },
    { freq: 587.33, dur: 2.5, delay: 1800 },
    { freq: 440.00, dur: 2.0, delay: 2600 },
    { freq: 523.25, dur: 2.0, delay: 3200 },
    { freq: 659.25, dur: 3.0, delay: 3800 },
    { freq: 587.33, dur: 2.0, delay: 4800 },
    { freq: 493.88, dur: 2.2, delay: 5600 },
    { freq: 440.00, dur: 2.2, delay: 6400 },
    { freq: 392.00, dur: 2.5, delay: 7200 },
    { freq: 329.63, dur: 3.5, delay: 8000 },
  ];

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public init(customUrl?: string) {
    if (customUrl && customUrl.trim() !== "") {
      this.customAudio = new Audio(customUrl);
      this.customAudio.loop = true;
      this.customAudio.volume = 0.55;
      this.customAudio.preload = "auto";
    }
  }

  public enableAutoplay(customUrl?: string) {
    // Attempt instant autoplay
    const playPromise = this.play(customUrl);

    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy: attach one-time user gesture trigger
        this.attachGestureListener(customUrl);
      });
    }
  }

  private attachGestureListener(customUrl?: string) {
    if (this.gestureAttached) return;
    this.gestureAttached = true;

    const triggerPlay = () => {
      if (!this.isPlaying) {
        this.play(customUrl);
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', triggerPlay);
      window.removeEventListener('touchstart', triggerPlay);
      window.removeEventListener('pointerdown', triggerPlay);
      window.removeEventListener('keydown', triggerPlay);
    };

    window.addEventListener('click', triggerPlay, { once: true });
    window.addEventListener('touchstart', triggerPlay, { once: true });
    window.addEventListener('pointerdown', triggerPlay, { once: true });
    window.addEventListener('keydown', triggerPlay, { once: true });
  }

  public toggle(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(customUrl);
      return true;
    }
  }

  public play(customUrl?: string): Promise<void> | undefined {
    const url = customUrl || (this.customAudio ? this.customAudio.src : "");

    if (url && url.trim() !== "") {
      if (!this.customAudio) {
        this.customAudio = new Audio(url);
        this.customAudio.loop = true;
        this.customAudio.volume = 0.55;
      }

      const p = this.customAudio.play();
      if (p !== undefined) {
        return p.then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch((err) => {
          this.isPlaying = false;
          this.notify();
          throw err;
        });
      }

      this.isPlaying = true;
      this.notify();
      return undefined;
    }

    this.playSynthesizer();
    return undefined;
  }

  private playSynthesizer() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      } else if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.notify();
      this.scheduleNextArpeggio();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Ignore
    }
  }

  private scheduleNextArpeggio = () => {
    if (!this.isPlaying) return;

    this.melodyNotes.forEach(note => {
      window.setTimeout(() => {
        if (this.isPlaying) {
          this.playTone(note.freq, note.dur);
        }
      }, note.delay);
    });

    this.synthTimer = window.setTimeout(this.scheduleNextArpeggio, 9600);
  };

  public pause() {
    this.isPlaying = false;
    if (this.synthTimer) {
      window.clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioManager();
