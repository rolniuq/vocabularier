'use client';

import { Statistics, UserProgress } from '@/types';

interface StatsDisplayProps {
  statistics: Statistics;
  progress: Record<string, UserProgress>;
  totalWords: number;
}

export function StatsDisplay({ statistics, progress, totalWords }: StatsDisplayProps) {
  const progressValues = Object.values(progress);
  
  // Calculate words by mastery level
  const masteredWords = progressValues.filter((p) => p.repetitions >= 5 && p.easeFactor >= 2.3).length;
  const learningWords = progressValues.filter((p) => p.repetitions > 0 && p.repetitions < 5).length;
  const newWords = totalWords - progressValues.length;

  // Calculate today's reviews
  const today = new Date().toISOString().split('T')[0];
  const todayReviews = progressValues.filter(
    (p) => p.lastReviewDate?.startsWith(today)
  ).length;

  return (
    <div className="space-y-6">
      {/* Main stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FireIcon />}
          label="Streak"
          value={`${statistics.streakDays} days`}
          color="orange"
        />
        <StatCard
          icon={<BookIcon />}
          label="Words Learned"
          value={statistics.totalWordsLearned.toString()}
          color="blue"
        />
        <StatCard
          icon={<CheckIcon />}
          label="Total Reviews"
          value={statistics.totalReviews.toString()}
          color="green"
        />
        <StatCard
          icon={<TargetIcon />}
          label="Accuracy"
          value={`${statistics.averageAccuracy}%`}
          color="purple"
        />
      </div>

      {/* Progress breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Vocabulary Progress
        </h3>
        
        {/* Progress bar */}
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
          <div
            className="bg-green-500 transition-all duration-500"
            style={{ width: `${(masteredWords / totalWords) * 100}%` }}
          />
          <div
            className="bg-yellow-500 transition-all duration-500"
            style={{ width: `${(learningWords / totalWords) * 100}%` }}
          />
          <div
            className="bg-gray-300 dark:bg-gray-600 transition-all duration-500"
            style={{ width: `${(newWords / totalWords) * 100}%` }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              Mastered ({masteredWords})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              Learning ({learningWords})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              New ({newWords})
            </span>
          </div>
        </div>
      </div>

      {/* Today's activity */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Today&apos;s Activity</h3>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-4xl font-bold">{todayReviews}</p>
            <p className="text-blue-100 text-sm">Words reviewed</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div>
            <p className="text-4xl font-bold">
              {statistics.lastStudyDate === today ? '✓' : '—'}
            </p>
            <p className="text-blue-100 text-sm">Daily goal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

// Icons
function FireIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
