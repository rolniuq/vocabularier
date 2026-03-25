'use client';

import { useState } from 'react';
import { Word, ReviewQuality } from '@/types';
import { useQuiz } from '@/hooks/useQuiz';

interface QuizModeProps {
  words: Word[];
  onComplete: (results: { wordId: string; correct: boolean }[]) => void;
}

export function QuizMode({ words, onComplete }: QuizModeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    submitAnswer,
    restartQuiz,
    isComplete,
    results,
    score,
    accuracy,
    averageTime,
  } = useQuiz({ words, questionCount: 10 });

  const handleSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      submitAnswer(answer);
      setSelectedAnswer(null);
      setShowResult(false);
      setFillAnswer('');
    }, 1500);
  };

  const handleRestart = () => {
    restartQuiz();
    onComplete(results.map((r) => ({
      wordId: currentQuestion?.word.id || '',
      correct: r.correct,
    })));
  };

  if (!currentQuestion && !isComplete) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Not enough words to create a quiz. Add more vocabulary first!
        </p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Great job practicing your vocabulary!
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {score}/{totalQuestions}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correct</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {accuracy}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {averageTime}s
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Time</p>
            </div>
          </div>

          {/* Results breakdown */}
          <div className="text-left mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Results</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={result.questionId}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.correct
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <span className="text-sm">
                    {result.correct ? '✓' : '✗'} Question {index + 1}
                  </span>
                  <span className="text-sm text-gray-500">
                    {result.correct ? result.correctAnswer : `${result.userAnswer} → ${result.correctAnswer}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          >
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentIndex) / totalQuestions) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Question type badge */}
        <div className="flex items-center justify-between mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentQuestion.type === 'definition'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : currentQuestion.type === 'synonym'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
          }`}>
            {currentQuestion.type === 'definition' && 'Definition Match'}
            {currentQuestion.type === 'synonym' && 'Synonym'}
            {currentQuestion.type === 'fillBlank' && 'Fill in the Blank'}
          </span>
        </div>

        {/* Question */}
        <div className="mb-8">
          <p className="text-lg text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {currentQuestion.question}
          </p>
          {currentQuestion.context && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 italic">
                &quot;{currentQuestion.context}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Answer options or input */}
        {currentQuestion.type === 'fillBlank' ? (
          <div className="space-y-4">
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && fillAnswer.trim()) {
                  handleSubmit(fillAnswer.trim());
                }
              }}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
              autoFocus
              disabled={showResult}
            />
            <button
              onClick={() => handleSubmit(fillAnswer.trim())}
              disabled={!fillAnswer.trim() || showResult}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-colors"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

              let buttonClass = 'p-4 rounded-xl border-2 font-medium transition-all text-left ';
              
              if (showResult) {
                if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400';
                } else {
                  buttonClass += 'border-gray-200 dark:border-gray-600 text-gray-400';
                }
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleSubmit(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="text-sm text-gray-400 mr-2">{index + 1}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div className={`mt-6 p-4 rounded-xl ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <p className={`font-medium ${
              isCorrect
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            }`}>
              {isCorrect ? '✓ Correct!' : `✗ The correct answer is: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Press 1-4 to select an answer, or Enter to submit</p>
      </div>
    </div>
  );
}
