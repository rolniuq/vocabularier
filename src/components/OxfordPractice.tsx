'use client';

import { useState, useEffect } from 'react';
import { oxford3000, OxfordWord } from '@/data/oxford-3000';

interface OxfordPracticeProps {
  onClose: () => void;
}

export function OxfordPractice({ onClose }: OxfordPracticeProps) {
  const [currentWord, setCurrentWord] = useState<OxfordWord | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [mode, setMode] = useState<'translation' | 'synonym'>('translation');
  const [direction, setDirection] = useState<'en-to-vi' | 'vi-to-en'>('en-to-vi');
  const [isChecking, setIsChecking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Initialize with a random word
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * oxford3000.length);
    return oxford3000[randomIndex];
  };

  const handleNewWord = () => {
    setCurrentWord(getRandomWord());
    setUserInput('');
    setFeedback(null);
    setShowAnswer(false);
    // Randomly choose direction for translation mode
    if (mode === 'translation') {
      setDirection(Math.random() > 0.5 ? 'en-to-vi' : 'vi-to-en');
    }
  };

  const handleCheckAnswer = () => {
    if (!currentWord || !userInput.trim()) return;

    setIsChecking(true);
    const userAnswer = userInput.trim().toLowerCase();
    let isCorrect = false;
    let message = '';

    if (mode === 'translation') {
      if (direction === 'en-to-vi') {
        // English to Vietnamese: check if user input matches Vietnamese translation
        const vietnamese = currentWord.vietnamese?.toLowerCase() || '';
        isCorrect = userAnswer === vietnamese;
        if (isCorrect) {
          message = 'Correct! 🎉';
        } else {
          message = 'Incorrect. Click the light bulb to see the answer.';
        }
      } else {
        // Vietnamese to English: check if user input matches English word
        const english = currentWord.word.toLowerCase();
        isCorrect = userAnswer === english;
        if (isCorrect) {
          message = 'Correct! 🎉';
        } else {
          message = 'Incorrect. Click the light bulb to see the answer.';
        }
      }
    } else if (mode === 'synonym') {
      // Synonym mode: check if user input matches any of the synonyms
      const synonyms = currentWord.synonyms?.map(s => s.toLowerCase()) || [];
      isCorrect = synonyms.includes(userAnswer);
      
      if (isCorrect) {
        message = 'Correct! 🎉 That is indeed a synonym.';
      } else {
        message = 'Incorrect. Click the light bulb to see the answer.';
      }
    }

    setFeedback({ correct: isCorrect, message });
    setIsChecking(false);
    
    // If correct, automatically go to new word after a short delay
    if (isCorrect) {
      setTimeout(() => {
        handleNewWord();
      }, 1500);
    }
  };

  // Initialize with a random word on mount
  useEffect(() => {
    handleNewWord();
  }, [mode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oxford 3000 Practice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ×
          </button>
        </div>

        {/* Mode selector */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setMode('translation')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'translation'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Translation
          </button>
          <button
            onClick={() => setMode('synonym')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'synonym'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Synonyms
          </button>
        </div>

        {/* Word to translate or find synonyms for */}
        {currentWord ? (
          <div className="text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              {mode === 'translation' ? (
                <>
                  {direction === 'en-to-vi' ? (
                    <>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Translate to Vietnamese:
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentWord.word}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Translate to English:
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentWord.vietnamese}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Give a synonym for:
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentWord.word}
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          </div>
        )}

        {/* Input */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Your answer:
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={mode === 'translation' ? 'Type your translation here...' : 'Type a synonym here...'}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            disabled={isChecking}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCheckAnswer}
            disabled={isChecking || !userInput.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? 'Checking...' : 'Check Answer'}
          </button>
          <button
            onClick={handleNewWord}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            New Word
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mt-4 p-3 rounded-lg ${
            feedback.correct
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
          }`}>
            {feedback.correct ? (
              feedback.message
            ) : (
              <>
                <p>{feedback.message}</p>
                {!showAnswer && (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700"
                  >
                    <LightBulbIcon className="w-4 h-4" />
                    Show answer
                  </button>
                )}
                {showAnswer && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Answer:</strong> 
                      {mode === 'translation' 
                        ? (direction === 'en-to-vi' 
                          ? currentWord.vietnamese 
                          : currentWord.word)
                        : currentWord.synonyms?.join(', ')}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
     </div>
   );
 }

function LightBulbIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 14a5 5 0 01-10 0m0 0a8 8 0 005.657 2.143M10 14a5 5 0 0110 0m-9 4a1 1 0 100-2m9 2a1 1 0 1000-2m9 2a1 1 0 1000-2m5-6a1 1 0 1000-2m9 4a1 1 0 1000-2m9-4a1 1 0 1000-2m5-6a1 1 0 1000-2m9 4a1 1 0 1000 2z" />
    </svg>
  );
}