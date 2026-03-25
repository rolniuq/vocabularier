'use client';

import { useState } from 'react';
import { Word, ReviewQuality } from '@/types';
import { useTTS } from '@/hooks';

interface FlashCardProps {
  word: Word;
  onReview: (quality: ReviewQuality) => void;
  showNext?: () => void;
}

type FlashCardSide = 'front' | 'back';

export function FlashCard({ word, onReview, showNext }: FlashCardProps) {
  const [side, setSide] = useState<FlashCardSide>('front');
  const [isFlipping, setIsFlipping] = useState(false);
  const { speak, isAvailable } = useTTS();

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setSide(side === 'front' ? 'back' : 'front');
      setIsFlipping(false);
    }, 150);
  };

  const handleReview = (quality: ReviewQuality) => {
    onReview(quality);
    setSide('front');
    showNext?.();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card */}
      <div
        onClick={handleFlip}
        className={`relative min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ${
          isFlipping ? 'scale-95 opacity-80' : 'hover:shadow-2xl'
        }`}
      >
        {side === 'front' ? (
          /* Front of card - Word only */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <p className="text-sm text-gray-400 mb-4">What does this word mean?</p>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {word.word}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">{word.phonetic}</p>
            <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
              {word.partOfSpeech}
            </span>
            
            {isAvailable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(word.word);
                }}
                className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Pronounce"
              >
                <SpeakerIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            )}

            <p className="absolute bottom-6 text-sm text-gray-400">
              Click to reveal answer
            </p>
          </div>
        ) : (
          /* Back of card - Definition and examples */
          <div className="absolute inset-0 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{word.word}</h2>
                <p className="text-gray-500">{word.phonetic}</p>
              </div>
              {isAvailable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(word.word);
                  }}
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <SpeakerIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Definition */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Definition
                </h3>
                <p className="text-lg text-gray-800 dark:text-gray-200">{word.definition}</p>
              </div>

              {/* Example */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Example
                </h3>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  &quot;{word.examples[0]}&quot;
                </p>
              </div>

              {/* Synonyms */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Synonyms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.slice(0, 4).map((syn, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Click card to flip back
            </p>
          </div>
        )}
      </div>

      {/* Rating buttons - only show on back */}
      {side === 'back' && (
        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            How well did you know this word?
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleReview(ReviewQuality.INCORRECT)}
              className="py-4 px-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
            >
              <span className="block text-2xl mb-1">😓</span>
              <span className="text-sm">Didn&apos;t know</span>
            </button>
            <button
              onClick={() => handleReview(ReviewQuality.HARD)}
              className="py-4 px-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors"
            >
              <span className="block text-2xl mb-1">🤔</span>
              <span className="text-sm">Hard</span>
            </button>
            <button
              onClick={() => handleReview(ReviewQuality.GOOD)}
              className="py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
            >
              <span className="block text-2xl mb-1">😊</span>
              <span className="text-sm">Good</span>
            </button>
          </div>
          <button
            onClick={() => handleReview(ReviewQuality.PERFECT)}
            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          >
            <span className="text-xl mr-2">🎯</span>
            <span>Perfect - Knew it instantly!</span>
          </button>
        </div>
      )}
    </div>
  );
}

function SpeakerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}
