/**
 * Zustand store for vocabulary app state management
 * Uses localStorage for persistence (perfect for personal use)
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { format, isToday, differenceInDays } from 'date-fns';
import {
  Word,
  UserProgress,
  DailySession,
  Statistics,
  AppSettings,
  ReviewQuality,
} from '@/types';
import { calculateNextReview, getWordsDueForReview, sortByReviewPriority } from '@/lib/srs';
import allVocabulary from '@/data/ielts-vocabulary';

interface VocabularyStore {
  // State
  words: Word[];
  userProgress: Record<string, UserProgress>;
  dailySession: DailySession | null;
  statistics: Statistics;
  settings: AppSettings;
  isInitialized: boolean;

  // Actions
  initialize: () => void;
  addWord: (word: Omit<Word, 'id' | 'source' | 'createdAt' | 'updatedAt'>) => void;
  updateWord: (id: string, updates: Partial<Word>) => void;
  deleteWord: (id: string) => void;
  
  // Daily session
  createDailySession: () => void;
  refreshDailyWords: () => void;
  markWordCompleted: (wordId: string) => void;
  
  // SRS & Reviews
  recordReview: (wordId: string, quality: ReviewQuality) => void;
  getWordsForReview: () => Word[];
  getDailyWords: () => Word[];
  
  // Statistics
  updateStatistics: () => void;
  
  // Settings
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  dailyWordCount: 5,
  reviewMode: 'mixed',
  showPhonetic: true,
  autoPlayAudio: false,
  theme: 'system',
};

const defaultStatistics: Statistics = {
  totalWordsLearned: 0,
  totalReviews: 0,
  streakDays: 0,
  lastStudyDate: null,
  averageAccuracy: 0,
  wordsPerDay: [],
  weeklyProgress: [],
};

export const useVocabularyStore = create<VocabularyStore>()(
  persist(
    (set, get) => ({
      // Initial state
      words: [],
      userProgress: {},
      dailySession: null,
      statistics: defaultStatistics,
      settings: defaultSettings,
      isInitialized: false,

      // Initialize the store with seed data if empty
      initialize: () => {
        const state = get();
        if (state.isInitialized) return;

        // Add seed vocabulary if no words exist
        if (state.words.length === 0) {
          set({ words: allVocabulary });
        }

        // Create daily session if needed
        const today = format(new Date(), 'yyyy-MM-dd');
        if (!state.dailySession || state.dailySession.date !== today) {
          get().createDailySession();
        }

        set({ isInitialized: true });
      },

      // Add a new word (user-defined)
      addWord: (wordData) => {
        const newWord: Word = {
          ...wordData,
          id: uuidv4(),
          source: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          words: [...state.words, newWord],
        }));
      },

      // Update an existing word
      updateWord: (id, updates) => {
        set((state) => ({
          words: state.words.map((word) =>
            word.id === id
              ? { ...word, ...updates, updatedAt: new Date().toISOString() }
              : word
          ),
        }));
      },

      // Delete a word
      deleteWord: (id) => {
        set((state) => ({
          words: state.words.filter((word) => word.id !== id),
          userProgress: Object.fromEntries(
            Object.entries(state.userProgress).filter(([key]) => key !== id)
          ),
        }));
      },

      // Create a new daily session
      createDailySession: () => {
        const state = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        const wordCount = state.settings.dailyWordCount;

        // Get words based on review mode
        let selectedWordIds: string[];
        const allWordIds = state.words.map((w) => w.id);

        switch (state.settings.reviewMode) {
          case 'srs':
            // Prioritize words due for review
            const dueWordIds = getWordsDueForReview(allWordIds, state.userProgress);
            const sortedDue = sortByReviewPriority(dueWordIds, state.userProgress);
            selectedWordIds = sortedDue.slice(0, wordCount);
            break;

          case 'random':
            // Purely random selection
            const shuffled = [...allWordIds].sort(() => Math.random() - 0.5);
            selectedWordIds = shuffled.slice(0, wordCount);
            break;

          case 'mixed':
          default:
            // Mix of due words and random new words
            const due = getWordsDueForReview(allWordIds, state.userProgress);
            const sorted = sortByReviewPriority(due, state.userProgress);
            const dueCount = Math.min(Math.ceil(wordCount * 0.6), sorted.length);
            const dueSelection = sorted.slice(0, dueCount);

            // Get random words for the remaining slots
            const remaining = allWordIds.filter((id) => !dueSelection.includes(id));
            const randomRemaining = remaining
              .sort(() => Math.random() - 0.5)
              .slice(0, wordCount - dueSelection.length);

            selectedWordIds = [...dueSelection, ...randomRemaining];
            break;
        }

        // Ensure we have enough words
        if (selectedWordIds.length < wordCount && allWordIds.length >= wordCount) {
          const additional = allWordIds
            .filter((id) => !selectedWordIds.includes(id))
            .sort(() => Math.random() - 0.5)
            .slice(0, wordCount - selectedWordIds.length);
          selectedWordIds = [...selectedWordIds, ...additional];
        }

        const newSession: DailySession = {
          id: uuidv4(),
          date: today,
          wordIds: selectedWordIds,
          completedWordIds: [],
          createdAt: new Date().toISOString(),
        };

        set({ dailySession: newSession });
      },

      // Refresh daily words (get new random selection)
      refreshDailyWords: () => {
        get().createDailySession();
      },

      // Mark a word as completed in today's session
      markWordCompleted: (wordId) => {
        set((state) => {
          if (!state.dailySession) return state;

          return {
            dailySession: {
              ...state.dailySession,
              completedWordIds: state.dailySession.completedWordIds.includes(wordId)
                ? state.dailySession.completedWordIds
                : [...state.dailySession.completedWordIds, wordId],
            },
          };
        });
      },

      // Record a review and update SRS
      recordReview: (wordId, quality) => {
        const state = get();
        const currentProgress = state.userProgress[wordId] || null;
        const srsResult = calculateNextReview(currentProgress, quality);

        const isCorrect = quality >= ReviewQuality.GOOD;

        const newProgress: UserProgress = {
          wordId,
          easeFactor: srsResult.easeFactor,
          interval: srsResult.interval,
          repetitions: srsResult.repetitions,
          nextReviewDate: srsResult.nextReviewDate,
          lastReviewDate: new Date().toISOString(),
          correctCount: (currentProgress?.correctCount || 0) + (isCorrect ? 1 : 0),
          incorrectCount: (currentProgress?.incorrectCount || 0) + (isCorrect ? 0 : 1),
          lastQuality: quality,
        };

        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [wordId]: newProgress,
          },
          statistics: {
            ...state.statistics,
            totalReviews: state.statistics.totalReviews + 1,
          },
        }));

        // Update statistics after review
        get().updateStatistics();
      },

      // Get words that are due for review
      getWordsForReview: () => {
        const state = get();
        const allWordIds = state.words.map((w) => w.id);
        const dueIds = getWordsDueForReview(allWordIds, state.userProgress);
        const sortedIds = sortByReviewPriority(dueIds, state.userProgress);

        return sortedIds.map((id) => state.words.find((w) => w.id === id)!).filter(Boolean);
      },

      // Get today's daily words
      getDailyWords: () => {
        const state = get();
        if (!state.dailySession) return [];

        return state.dailySession.wordIds
          .map((id) => state.words.find((w) => w.id === id)!)
          .filter(Boolean);
      },

      // Update statistics
      updateStatistics: () => {
        const state = get();
        const today = format(new Date(), 'yyyy-MM-dd');

        // Calculate streak
        let streak = state.statistics.streakDays;
        if (state.statistics.lastStudyDate) {
          const lastDate = new Date(state.statistics.lastStudyDate);
          const daysDiff = differenceInDays(new Date(), lastDate);

          if (daysDiff === 0) {
            // Same day, keep streak
          } else if (daysDiff === 1) {
            // Consecutive day, increment streak
            streak += 1;
          } else {
            // Streak broken
            streak = 1;
          }
        } else {
          streak = 1;
        }

        // Calculate total words learned (words with at least one successful review)
        const wordsLearned = Object.values(state.userProgress).filter(
          (p) => p.correctCount > 0
        ).length;

        // Calculate average accuracy
        const progressValues = Object.values(state.userProgress);
        const totalCorrect = progressValues.reduce((sum, p) => sum + p.correctCount, 0);
        const totalAttempts = progressValues.reduce(
          (sum, p) => sum + p.correctCount + p.incorrectCount,
          0
        );
        const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

        set((state) => ({
          statistics: {
            ...state.statistics,
            totalWordsLearned: wordsLearned,
            streakDays: streak,
            lastStudyDate: today,
            averageAccuracy: accuracy,
          },
        }));
      },

      // Update settings
      updateSettings: (updates) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...updates,
          },
        }));
      },
    }),
    {
      name: 'vocaburarier-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        words: state.words,
        userProgress: state.userProgress,
        dailySession: state.dailySession,
        statistics: state.statistics,
        settings: state.settings,
      }),
    }
  )
);
