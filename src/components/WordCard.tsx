'use client';

import { Word, UserProgress } from '@/types';
import { useTTS } from '@/hooks';
import { calculateRetention } from '@/lib/srs';

interface WordCardProps {
  word: Word;
  progress?: UserProgress;
  showDetails?: boolean;
  onToggleDetails?: () => void;
  compact?: boolean;
}

export function WordCard({
  word,
  progress,
  showDetails = false,
  onToggleDetails,
  compact = false,
}: WordCardProps) {
  const { speak, isSpeaking, isAvailable } = useTTS();

  const handleSpeak = (text: string, slow = false) => {
    speak(text, slow);
  };

  const retention = progress ? calculateRetention(progress) : null;

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {word.word}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{word.phonetic}</p>
          </div>
          {isAvailable && (
            <button
              onClick={() => handleSpeak(word.word)}
              disabled={isSpeaking}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Pronounce word"
            >
              <SpeakerIcon className={isSpeaking ? 'text-blue-500 animate-pulse' : 'text-gray-500'} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">{word.word}</h2>
              <span className="px-2 py-1 bg-white/20 rounded-full text-sm text-white">
                {word.partOfSpeech}
              </span>
            </div>
            <p className="text-blue-100 mt-1 text-lg">{word.phonetic}</p>
          </div>
          <div className="flex gap-2">
            {isAvailable && (
              <>
                <button
                  onClick={() => handleSpeak(word.word)}
                  disabled={isSpeaking}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  aria-label="Pronounce word"
                  title="Normal speed"
                >
                  <SpeakerIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleSpeak(word.word, true)}
                  disabled={isSpeaking}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  aria-label="Pronounce slowly"
                  title="Slow speed"
                >
                  <SlowIcon className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Progress indicator */}
        {progress && (
          <div className="mt-4 flex items-center gap-4 text-sm text-blue-100">
            <span>Retention: {retention}%</span>
            <span>Reviews: {progress.correctCount + progress.incorrectCount}</span>
            <span>Streak: {progress.repetitions}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Definition */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Definition
          </h3>
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            {word.definition}
          </p>
        </div>

        {/* Examples */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Example Sentences
          </h3>
          <ul className="space-y-3">
            {word.examples.map((example, index) => (
              <li key={index} className="flex gap-3 group">
                <span className="text-blue-500 font-bold">{index + 1}.</span>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300 italic">{example}</p>
                  {isAvailable && (
                    <button
                      onClick={() => handleSpeak(example)}
                      className="mt-1 text-xs text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <SpeakerIcon className="w-3 h-3" />
                      Listen
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle for more details */}
        {onToggleDetails && (
          <button
            onClick={onToggleDetails}
            className="w-full py-2 text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center justify-center gap-1"
          >
            {showDetails ? 'Show less' : 'Show more'}
            <ChevronIcon className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Expanded details */}
        {showDetails && (
          <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            {/* Synonyms & Antonyms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Synonyms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((syn, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
              {word.antonyms.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Antonyms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {word.antonyms.map((ant, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full text-sm"
                      >
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Collocations */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Common Collocations
              </h3>
              <div className="flex flex-wrap gap-2">
                {word.collocations.map((col, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* IELTS Context */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                IELTS Usage Tips
              </h3>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-300">{word.ieltsContext}</p>
              </div>
            </div>

            {/* Topics & Difficulty */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Topics:</span>
                {word.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                word.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : word.difficulty === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {word.difficulty}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Icons
function SpeakerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}

function SlowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
