'use client';

import { useState } from 'react';
import { Word } from '@/types';
import { useTTS } from '@/hooks';

interface WritingPracticeProps {
  words: Word[];
  onComplete: (results: { wordId: string; correct: boolean }[]) => void;
}

interface WritingQuestion {
  word: Word;
  sentence: string;
  blankSentence: string;
  hint: string;
}

export function WritingPractice({ words, onComplete }: WritingPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ wordId: string; correct: boolean }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const { speak, isAvailable } = useTTS();

  // Create questions from words
  const questions: WritingQuestion[] = words.slice(0, 10).map((word) => {
    const sentence = word.examples[0] || `This word means: ${word.definition}`;
    const blankSentence = sentence.replace(
      new RegExp(`\\b${word.word}\\b`, 'gi'),
      '_'.repeat(word.word.length)
    );
    const hint = word.word.charAt(0) + '_'.repeat(word.word.length - 2) + word.word.charAt(word.word.length - 1);

    return {
      word,
      sentence,
      blankSentence,
      hint,
    };
  });

  const currentQuestion = questions[currentIndex];
  const isComplete = currentIndex >= questions.length;

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const isCorrect = userInput.toLowerCase().trim() === currentQuestion.word.word.toLowerCase();
    setShowAnswer(true);
    setResults((prev) => [...prev, { wordId: currentQuestion.word.id, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    setUserInput('');
    setShowAnswer(false);
    setShowHint(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showAnswer) {
        nextQuestion();
      } else {
        checkAnswer();
      }
    }
  };

  const restartPractice = () => {
    setCurrentIndex(0);
    setUserInput('');
    setShowAnswer(false);
    setShowHint(false);
    onComplete(results);
    setResults([]);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Not enough words for writing practice. Add more vocabulary first!
        </p>
      </div>
    );
  }

  if (isComplete) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? '🌟' : accuracy >= 60 ? '👏' : '📝'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Practice Complete!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Writing practice strengthens your memory retention!
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {correctCount}/{results.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correct Spellings</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {accuracy}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
            </div>
          </div>

          {/* Mistakes to review */}
          {results.some((r) => !r.correct) && (
            <div className="text-left mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Words to Review
              </h3>
              <div className="flex flex-wrap gap-2">
                {results
                  .filter((r) => !r.correct)
                  .map((r) => {
                    const word = words.find((w) => w.id === r.wordId);
                    return (
                      <span
                        key={r.wordId}
                        className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full text-sm"
                      >
                        {word?.word}
                      </span>
                    );
                  })}
              </div>
            </div>
          )}

          <button
            onClick={restartPractice}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = userInput.toLowerCase().trim() === currentQuestion.word.word.toLowerCase();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Word {currentIndex + 1} of {questions.length}</span>
          <span>Writing Practice</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Practice card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Word info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
              {currentQuestion.word.partOfSpeech}
            </span>
            {isAvailable && (
              <button
                onClick={() => speak(currentQuestion.word.word)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Listen to pronunciation"
              >
                <SpeakerIcon className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Definition:</strong> {currentQuestion.word.definition}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            <strong>Phonetic:</strong> {currentQuestion.word.phonetic}
          </p>
        </div>

        {/* Sentence with blank */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <p className="text-lg text-gray-800 dark:text-gray-200 italic">
            &quot;{currentQuestion.blankSentence}&quot;
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type the missing word..."
              disabled={showAnswer}
              className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-colors ${
                showAnswer
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-600 focus:border-purple-500'
              } dark:bg-gray-700 dark:text-white`}
              autoFocus
            />
            {showAnswer && (
              <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-2xl`}
              >
                {isCorrect ? '✓' : '✗'}
              </span>
            )}
          </div>

          {/* Hint */}
          {!showAnswer && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-purple-500 hover:text-purple-600"
            >
              {showHint ? `Hint: ${currentQuestion.hint}` : 'Show hint'}
            </button>
          )}

          {/* Feedback */}
          {showAnswer && !isCorrect && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-700 dark:text-red-400">
                Correct spelling: <strong>{currentQuestion.word.word}</strong>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!showAnswer ? (
              <button
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Word' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Press Enter to check your answer or continue</p>
      </div>
    </div>
  );
}

function SpeakerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
    </svg>
  );
}
