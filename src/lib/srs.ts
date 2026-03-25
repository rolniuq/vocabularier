/**
 * Spaced Repetition System (SRS) Algorithm
 * Based on SM-2 algorithm (SuperMemo 2)
 * 
 * This is the same algorithm used by Anki and is proven to be highly effective
 * for long-term memory retention.
 */

import { UserProgress, ReviewQuality } from '@/types';

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export interface SRSResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
}

/**
 * Calculate the next review schedule based on user's performance
 * 
 * @param progress - Current progress data for the word
 * @param quality - Quality of recall (0-5)
 * @returns Updated SRS values
 */
export function calculateNextReview(
  progress: UserProgress | null,
  quality: ReviewQuality
): SRSResult {
  const now = new Date();
  
  // Initialize default values for new words
  let easeFactor = progress?.easeFactor ?? DEFAULT_EASE_FACTOR;
  let interval = progress?.interval ?? 0;
  let repetitions = progress?.repetitions ?? 0;

  // If quality is below 3, reset the repetitions (failed recall)
  if (quality < ReviewQuality.GOOD) {
    repetitions = 0;
    interval = 1; // Review again tomorrow
  } else {
    // Successful recall - increase interval
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor based on quality
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Ensure ease factor doesn't go below minimum
  if (easeFactor < MIN_EASE_FACTOR) {
    easeFactor = MIN_EASE_FACTOR;
  }

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
    interval,
    repetitions,
    nextReviewDate: nextReview.toISOString(),
  };
}

/**
 * Get words that are due for review today
 * 
 * @param wordIds - List of all word IDs
 * @param progress - User progress for all words
 * @returns Array of word IDs due for review
 */
export function getWordsDueForReview(
  wordIds: string[],
  progress: Record<string, UserProgress>
): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return wordIds.filter((wordId) => {
    const wordProgress = progress[wordId];
    
    // New words (no progress) should be included
    if (!wordProgress) {
      return true;
    }

    // Check if review is due
    const nextReviewDate = new Date(wordProgress.nextReviewDate);
    nextReviewDate.setHours(0, 0, 0, 0);
    
    return nextReviewDate <= today;
  });
}

/**
 * Sort words by review priority
 * Words that are more overdue and have lower ease factors get higher priority
 * 
 * @param wordIds - List of word IDs to sort
 * @param progress - User progress for all words
 * @returns Sorted array of word IDs (highest priority first)
 */
export function sortByReviewPriority(
  wordIds: string[],
  progress: Record<string, UserProgress>
): string[] {
  const today = new Date().getTime();

  return [...wordIds].sort((a, b) => {
    const progressA = progress[a];
    const progressB = progress[b];

    // New words get medium priority
    if (!progressA && !progressB) return 0;
    if (!progressA) return -1;
    if (!progressB) return 1;

    // Calculate overdue days
    const overdueA = (today - new Date(progressA.nextReviewDate).getTime()) / (1000 * 60 * 60 * 24);
    const overdueB = (today - new Date(progressB.nextReviewDate).getTime()) / (1000 * 60 * 60 * 24);

    // Combine overdue days with ease factor for priority
    // Lower ease factor = harder word = higher priority
    const priorityA = overdueA / progressA.easeFactor;
    const priorityB = overdueB / progressB.easeFactor;

    return priorityB - priorityA; // Higher priority first
  });
}

/**
 * Calculate retention rate based on review history
 * 
 * @param progress - User progress data
 * @returns Retention percentage (0-100)
 */
export function calculateRetention(progress: UserProgress): number {
  const total = progress.correctCount + progress.incorrectCount;
  if (total === 0) return 0;
  return Math.round((progress.correctCount / total) * 100);
}

/**
 * Estimate the optimal review time based on forgetting curve
 * 
 * @param interval - Current interval in days
 * @param easeFactor - Current ease factor
 * @returns Estimated retention percentage at next review
 */
export function estimateRetentionAtReview(interval: number, easeFactor: number): number {
  // Simplified forgetting curve estimation
  // Based on Ebbinghaus forgetting curve: R = e^(-t/S)
  // Where R is retention, t is time, S is stability
  const stability = interval * easeFactor;
  const retention = Math.exp(-interval / stability) * 100;
  return Math.round(retention);
}
