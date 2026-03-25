/**
 * Text-to-Speech utility using Web Speech API
 * Works natively in browsers without external dependencies
 */

export interface TTSOptions {
  rate?: number; // 0.1 to 10, default 1
  pitch?: number; // 0 to 2, default 1
  volume?: number; // 0 to 1, default 1
  voice?: SpeechSynthesisVoice;
}

class TextToSpeech {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      
      // Voices are loaded asynchronously in some browsers
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    
    this.voices = this.synth.getVoices();
    
    // Prefer English voices, ideally US or UK English
    const englishVoices = this.voices.filter((v) => 
      v.lang.startsWith('en')
    );

    // Prioritize native/premium voices
    const preferredVoices = englishVoices.filter((v) =>
      v.name.includes('Premium') ||
      v.name.includes('Enhanced') ||
      v.name.includes('Natural') ||
      v.localService
    );

    // Try to find US English first, then UK English
    this.preferredVoice = 
      preferredVoices.find((v) => v.lang === 'en-US') ||
      preferredVoices.find((v) => v.lang === 'en-GB') ||
      englishVoices.find((v) => v.lang === 'en-US') ||
      englishVoices.find((v) => v.lang === 'en-GB') ||
      englishVoices[0] ||
      this.voices[0] ||
      null;
  }

  /**
   * Check if TTS is available
   */
  isAvailable(): boolean {
    return this.synth !== null;
  }

  /**
   * Get all available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  /**
   * Get English voices only
   */
  getEnglishVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter((v) => v.lang.startsWith('en'));
  }

  /**
   * Speak the given text
   */
  speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not available'));
        return;
      }

      // Cancel any ongoing speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options
      utterance.rate = options.rate ?? 0.9; // Slightly slower for learning
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;
      utterance.voice = options.voice ?? this.preferredVoice;
      utterance.lang = 'en-US';

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      this.synth.speak(utterance);
    });
  }

  /**
   * Speak a word slowly (for pronunciation practice)
   */
  speakSlow(text: string): Promise<void> {
    return this.speak(text, { rate: 0.7 });
  }

  /**
   * Stop any current speech
   */
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Pause speech
   */
  pause(): void {
    if (this.synth) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.synth) {
      this.synth.resume();
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth?.speaking ?? false;
  }
}

// Singleton instance
let ttsInstance: TextToSpeech | null = null;

export function getTTS(): TextToSpeech {
  if (!ttsInstance) {
    ttsInstance = new TextToSpeech();
  }
  return ttsInstance;
}

export default TextToSpeech;
