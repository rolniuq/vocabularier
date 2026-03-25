/**
 * Core vocabulary types for the IELTS Active Recall App
 */

export interface Word {
  id: string;
  word: string;
  phonetic: string; // IPA pronunciation
  partOfSpeech: string; // noun, verb, adjective, etc.
  definition: string; // English definition
  examples: string[]; // Example sentences
  synonyms: string[];
  antonyms: string[];
  collocations: string[]; // Common word combinations
  ieltsContext: string; // How this word is used in IELTS context
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[]; // IELTS topics: environment, technology, education, etc.
  source: 'official' | 'user'; // Where the word came from
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  wordId: string;
  // Spaced Repetition System (SRS) fields
  easeFactor: number; // Default 2.5, affects interval growth
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  nextReviewDate: string; // ISO date string
  lastReviewDate: string | null;
  // Performance tracking
  correctCount: number;
  incorrectCount: number;
  // Quality ratings from reviews (0-5 scale like Anki)
  lastQuality: number | null;
}

export interface DailySession {
  id: string;
  date: string; // YYYY-MM-DD
  wordIds: string[];
  completedWordIds: string[];
  createdAt: string;
}

export interface Statistics {
  totalWordsLearned: number;
  totalReviews: number;
  streakDays: number;
  lastStudyDate: string | null;
  averageAccuracy: number;
  wordsPerDay: number[];
  weeklyProgress: {
    date: string;
    newWords: number;
    reviewedWords: number;
  }[];
}

// SRS Quality ratings (similar to Anki's system)
export enum ReviewQuality {
  BLACKOUT = 0, // Complete blackout, no recall
  INCORRECT = 1, // Incorrect response, but remembered upon seeing answer
  HARD = 2, // Correct with serious difficulty
  GOOD = 3, // Correct with some hesitation
  EASY = 4, // Correct with little hesitation
  PERFECT = 5, // Perfect recall, instant response
}

export interface AppState {
  words: Word[];
  userProgress: Record<string, UserProgress>;
  dailySession: DailySession | null;
  statistics: Statistics;
  settings: AppSettings;
}

export interface AppSettings {
  dailyWordCount: number; // Default 5
  reviewMode: 'random' | 'srs' | 'mixed';
  showPhonetic: boolean;
  autoPlayAudio: boolean;
  theme: 'light' | 'dark' | 'system';
}
