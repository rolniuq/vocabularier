'use client';

import { useState, useEffect, useCallback } from 'react';
import { extendedOxford3000 } from '@/data/extended-oxford';
import { evaluateAnswer } from '@/lib/gemini';

interface OxfordPracticeProps {
  onClose: () => void;
}

export function OxfordPractice({ onClose }: OxfordPracticeProps) {
  const [currentWord, setCurrentWord] = useState<typeof extendedOxford3000[number] | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [direction, setDirection] = useState<'en-to-vi' | 'vi-to-en'>('en-to-vi');
  const [isChecking, setIsChecking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * extendedOxford3000.length);
    return extendedOxford3000[randomIndex];
  };

  const handleNewWord = useCallback(() => {
    setCurrentWord(getRandomWord());
    setUserInput('');
    setFeedback(null);
    setShowAnswer(false);
  }, []);

  const toggleDirection = () => {
    setDirection(d => d === 'en-to-vi' ? 'vi-to-en' : 'en-to-vi');
    setUserInput('');
    setFeedback(null);
    setShowAnswer(false);
  };

  const handleCheckAnswer = async () => {
    if (!currentWord || !userInput.trim()) return;

    setIsChecking(true);
    const userAnswer = userInput.trim();

    const result = await evaluateAnswer(
      currentWord.word,
      userAnswer,
      direction,
      currentWord.vietnamese
    );

    setFeedback(result);
    setIsChecking(false);

    if (result.correct) {
      setTimeout(() => {
        handleNewWord();
      }, 1500);
    }
  };

  useEffect(() => {
    handleNewWord();
  }, [handleNewWord]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
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

        <div className="flex justify-center">
          <button
            onClick={toggleDirection}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            {direction === 'en-to-vi' ? 'English → Vietnamese' : 'Vietnamese → English'}
          </button>
        </div>

        {currentWord ? (
          <div className="text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {direction === 'en-to-vi'
                  ? 'Translate to Vietnamese:'
                  : 'Translate to English:'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {direction === 'en-to-vi' ? currentWord.word : currentWord.vietnamese}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your answer:
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              direction === 'en-to-vi'
                ? 'Type Vietnamese translation...'
                : 'Type English translation...'
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            disabled={isChecking}
          />
        </div>

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
                      <strong>Answer:</strong>{' '}
                      {direction === 'en-to-vi'
                        ? currentWord?.vietnamese
                        : currentWord?.word}
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.272 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}
