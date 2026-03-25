'use client';

import { Statistics } from '@/types';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: (stats: Statistics) => boolean;
  progress: (stats: Statistics) => number;
  maxProgress: number;
}

const achievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first review',
    icon: '🎯',
    requirement: (stats) => stats.totalReviews >= 1,
    progress: (stats) => Math.min(stats.totalReviews, 1),
    maxProgress: 1,
  },
  {
    id: 'vocab-starter',
    title: 'Vocabulary Starter',
    description: 'Learn 10 words',
    icon: '📚',
    requirement: (stats) => stats.totalWordsLearned >= 10,
    progress: (stats) => Math.min(stats.totalWordsLearned, 10),
    maxProgress: 10,
  },
  {
    id: 'vocab-builder',
    title: 'Vocabulary Builder',
    description: 'Learn 50 words',
    icon: '📖',
    requirement: (stats) => stats.totalWordsLearned >= 50,
    progress: (stats) => Math.min(stats.totalWordsLearned, 50),
    maxProgress: 50,
  },
  {
    id: 'vocab-master',
    title: 'Vocabulary Master',
    description: 'Learn 100 words',
    icon: '🏆',
    requirement: (stats) => stats.totalWordsLearned >= 100,
    progress: (stats) => Math.min(stats.totalWordsLearned, 100),
    maxProgress: 100,
  },
  {
    id: 'streak-3',
    title: 'Getting Consistent',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    requirement: (stats) => stats.streakDays >= 3,
    progress: (stats) => Math.min(stats.streakDays, 3),
    maxProgress: 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '💪',
    requirement: (stats) => stats.streakDays >= 7,
    progress: (stats) => Math.min(stats.streakDays, 7),
    maxProgress: 7,
  },
  {
    id: 'streak-30',
    title: 'Monthly Champion',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    requirement: (stats) => stats.streakDays >= 30,
    progress: (stats) => Math.min(stats.streakDays, 30),
    maxProgress: 30,
  },
  {
    id: 'review-50',
    title: 'Diligent Learner',
    description: 'Complete 50 reviews',
    icon: '✨',
    requirement: (stats) => stats.totalReviews >= 50,
    progress: (stats) => Math.min(stats.totalReviews, 50),
    maxProgress: 50,
  },
  {
    id: 'review-200',
    title: 'Review Champion',
    description: 'Complete 200 reviews',
    icon: '🌟',
    requirement: (stats) => stats.totalReviews >= 200,
    progress: (stats) => Math.min(stats.totalReviews, 200),
    maxProgress: 200,
  },
  {
    id: 'accuracy-90',
    title: 'Sharp Mind',
    description: 'Achieve 90% accuracy',
    icon: '🎯',
    requirement: (stats) => stats.averageAccuracy >= 90,
    progress: (stats) => Math.min(stats.averageAccuracy, 90),
    maxProgress: 90,
  },
];

interface AchievementsProps {
  statistics: Statistics;
}

export function Achievements({ statistics }: AchievementsProps) {
  const unlockedCount = achievements.filter((a) => a.requirement(statistics)).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🏅</div>
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-yellow-100">
              {unlockedCount} of {achievements.length} unlocked
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = achievement.requirement(statistics);
          const progress = achievement.progress(statistics);
          const progressPercent = (progress / achievement.maxProgress) * 100;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                isUnlocked
                  ? 'bg-white dark:bg-gray-800 border-yellow-400 dark:border-yellow-500'
                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`text-4xl ${
                    isUnlocked ? '' : 'grayscale opacity-50'
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-semibold ${
                        isUnlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">
                        Unlocked!
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </p>
                  {!isUnlocked && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>
                          {progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
