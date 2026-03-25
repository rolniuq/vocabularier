'use client';

import { useState, useCallback, useEffect } from 'react';
import { getTTS } from '@/lib/tts';

interface UseTTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function useTTS(options: UseTTSOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const tts = getTTS();
    setIsAvailable(tts.isAvailable());
  }, []);

  const speak = useCallback(async (text: string, slow = false) => {
    const tts = getTTS();
    
    if (!tts.isAvailable()) {
      options.onError?.('Text-to-speech not available');
      return;
    }

    try {
      setIsSpeaking(true);
      options.onStart?.();
      
      if (slow) {
        await tts.speakSlow(text);
      } else {
        await tts.speak(text);
      }
      
      options.onEnd?.();
    } catch (error) {
      options.onError?.(error instanceof Error ? error.message : 'Speech error');
    } finally {
      setIsSpeaking(false);
    }
  }, [options]);

  const stop = useCallback(() => {
    const tts = getTTS();
    tts.stop();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isAvailable,
  };
}
