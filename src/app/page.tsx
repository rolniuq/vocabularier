'use client';

import { useEffect, useState, useCallback } from 'react';
import { useVocabularyStore } from '@/lib/store';
import {
  WordCard,
  FlashCard,
  StatsDisplay,
  AddWordForm,
  QuizMode,
  WritingPractice,
  SearchFilterBar,
  ThemeToggle,
  ExportImport,
  Achievements,
  KeyboardShortcutsHelp,
} from '@/components';
import { useHydration, useKeyboardShortcuts, useSearchFilter } from '@/hooks';
import { ReviewQuality, Word } from '@/types';

type ViewMode = 'daily' | 'flashcard' | 'quiz' | 'writing' | 'stats' | 'browse' | 'add' | 'achievements' | 'settings';

export default function Home() {
  const isHydrated = useHydration();
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  const {
    words,
    userProgress,
    dailySession,
    statistics,
    isInitialized,
    initialize,
    getDailyWords,
    refreshDailyWords,
    recordReview,
    addWord,
    markWordCompleted,
    getWordsForReview,
  } = useVocabularyStore();

  // Search and filter
  const {
    searchQuery,
    setSearchQuery,
    selectedTopics,
    toggleTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredWords,
    allTopics,
    clearFilters,
  } = useSearchFilter({ words });

  // Keyboard shortcuts
  const handleKeyboardNav = useCallback((tabIndex: number) => {
    const tabs: ViewMode[] = ['daily', 'flashcard', 'quiz', 'writing', 'stats', 'browse'];
    if (tabIndex >= 0 && tabIndex < tabs.length) {
      setViewMode(tabs[tabIndex]);
      setCurrentCardIndex(0);
    }
  }, []);

  useKeyboardShortcuts([
    { key: '1', action: () => handleKeyboardNav(0), description: 'Go to Daily Words' },
    { key: '2', action: () => handleKeyboardNav(1), description: 'Go to Flashcards' },
    { key: '3', action: () => handleKeyboardNav(2), description: 'Go to Quiz' },
    { key: '4', action: () => handleKeyboardNav(3), description: 'Go to Writing' },
    { key: '5', action: () => handleKeyboardNav(4), description: 'Go to Stats' },
    { key: '6', action: () => handleKeyboardNav(5), description: 'Go to Browse' },
    { key: 'r', action: () => refreshDailyWords(), description: 'Refresh daily words' },
    { key: '?', action: () => setShowShortcutsHelp(true), description: 'Show shortcuts' },
    { key: 'Escape', action: () => setShowShortcutsHelp(false), description: 'Close modal' },
  ]);

  // Initialize store on mount
  useEffect(() => {
    if (isHydrated && !isInitialized) {
      initialize();
    }
  }, [isHydrated, isInitialized, initialize]);

  // Show loading state during hydration
  if (!isHydrated || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading your vocabulary...</p>
        </div>
      </div>
    );
  }

  const dailyWords = getDailyWords();
  const wordsForReview = getWordsForReview();
  const completedToday = dailySession?.completedWordIds.length || 0;

  const handleReview = (wordId: string, quality: ReviewQuality) => {
    recordReview(wordId, quality);
    markWordCompleted(wordId);
    
    // Move to next card in flashcard mode
    if (viewMode === 'flashcard' && currentCardIndex < wordsForReview.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleImportWords = (importedWords: Word[]) => {
    importedWords.forEach((w) => {
      addWord({
        word: w.word,
        phonetic: w.phonetic,
        partOfSpeech: w.partOfSpeech,
        definition: w.definition,
        examples: w.examples,
        synonyms: w.synonyms,
        antonyms: w.antonyms,
        collocations: w.collocations,
        ieltsContext: w.ieltsContext,
        difficulty: w.difficulty,
        topics: w.topics,
      });
    });
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'daily':
        return (
          <div className="space-y-6">
            {/* Daily progress */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Today&apos;s Words</h2>
                  <p className="text-blue-100">
                    {completedToday} of {dailyWords.length} completed
                  </p>
                </div>
                <button
                  onClick={refreshDailyWords}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RefreshIcon />
                  Refresh
                </button>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${dailyWords.length > 0 ? (completedToday / dailyWords.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Word cards */}
            <div className="space-y-6">
              {dailyWords.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  progress={userProgress[word.id]}
                  showDetails={expandedWordId === word.id}
                  onToggleDetails={() =>
                    setExpandedWordId(expandedWordId === word.id ? null : word.id)
                  }
                />
              ))}
            </div>

            {dailyWords.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No words for today. Click refresh to get new words!
                </p>
              </div>
            )}
          </div>
        );

      case 'flashcard':
        const currentWord = wordsForReview[currentCardIndex];
        return (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400">
                Card {currentCardIndex + 1} of {wordsForReview.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                  disabled={currentCardIndex === 0}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentCardIndex(Math.min(wordsForReview.length - 1, currentCardIndex + 1))
                  }
                  disabled={currentCardIndex === wordsForReview.length - 1}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-50"
                >
                  Skip
                </button>
              </div>
            </div>

            {currentWord ? (
              <FlashCard
                word={currentWord}
                onReview={(quality) => handleReview(currentWord.id, quality)}
                showNext={() =>
                  setCurrentCardIndex(Math.min(wordsForReview.length - 1, currentCardIndex + 1))
                }
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  All caught up!
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No more words to review. Come back tomorrow!
                </p>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <QuizMode
            words={words}
            onComplete={(results) => {
              results.forEach((r) => {
                if (r.correct) {
                  recordReview(r.wordId, ReviewQuality.GOOD);
                } else {
                  recordReview(r.wordId, ReviewQuality.INCORRECT);
                }
              });
            }}
          />
        );

      case 'writing':
        return (
          <WritingPractice
            words={words}
            onComplete={(results) => {
              results.forEach((r) => {
                if (r.correct) {
                  recordReview(r.wordId, ReviewQuality.GOOD);
                } else {
                  recordReview(r.wordId, ReviewQuality.HARD);
                }
              });
            }}
          />
        );

      case 'stats':
        return (
          <StatsDisplay
            statistics={statistics}
            progress={userProgress}
            totalWords={words.length}
          />
        );

      case 'achievements':
        return <Achievements statistics={statistics} />;

      case 'browse':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Words
              </h2>
              <button
                onClick={() => setViewMode('add')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                + Add Word
              </button>
            </div>

            {/* Search and Filter */}
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTopics={selectedTopics}
              onToggleTopic={toggleTopic}
              allTopics={allTopics}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              onClearFilters={clearFilters}
              resultCount={filteredWords.length}
              totalCount={words.length}
            />

            <div className="grid gap-4">
              {filteredWords.map((word) => (
                <WordCard key={word.id} word={word} progress={userProgress[word.id]} compact />
              ))}
            </div>

            {filteredWords.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No words match your search criteria.
                </p>
              </div>
            )}
          </div>
        );

      case 'add':
        return (
          <AddWordForm
            onAdd={(wordData) => {
              addWord(wordData);
              setViewMode('browse');
            }}
            onCancel={() => setViewMode('browse')}
          />
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            
            {/* Export/Import */}
            <ExportImport
              words={words}
              userProgress={userProgress}
              onImport={handleImportWords}
            />

            {/* Keyboard shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcutsHelp(true)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                View All Shortcuts
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'daily', label: 'Daily', icon: '📚' },
    { id: 'flashcard', label: 'Flashcards', icon: '🃏' },
    { id: 'quiz', label: 'Quiz', icon: '❓' },
    { id: 'writing', label: 'Writing', icon: '✍️' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'browse', label: 'Browse', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vocaburarier
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                IELTS 6.5+ Vocabulary Builder
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('achievements')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'achievements'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Achievements"
              >
                🏅
              </button>
              <button
                onClick={() => setViewMode('settings')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'settings'
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Settings"
              >
                ⚙️
              </button>
              <ThemeToggle />
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium flex items-center gap-1">
                🔥 {statistics.streakDays}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-40 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setViewMode(tab.id as ViewMode);
                  setCurrentCardIndex(0);
                }}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  viewMode === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">{renderContent()}</main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Keep learning, keep growing! 🚀{' '}
          <button
            onClick={() => setShowShortcutsHelp(true)}
            className="text-blue-500 hover:underline"
          >
            Keyboard shortcuts (?)
          </button>
        </p>
      </footer>

      {/* Keyboard shortcuts help modal */}
      <KeyboardShortcutsHelp
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}
