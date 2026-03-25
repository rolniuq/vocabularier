'use client';

import { useState, useRef } from 'react';
import { Word } from '@/types';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopics: string[];
  onToggleTopic: (topic: string) => void;
  allTopics: string[];
  selectedDifficulty: string | null;
  onDifficultyChange: (difficulty: string | null) => void;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedTopics,
  onToggleTopic,
  allTopics,
  selectedDifficulty,
  onDifficultyChange,
  onClearFilters,
  resultCount,
  totalCount,
}: SearchFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasActiveFilters = searchQuery || selectedTopics.length > 0 || selectedDifficulty;

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search words, definitions, synonyms..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <XIcon className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filter toggle and clear */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          <FilterIcon className="w-4 h-4" />
          Filters
          {(selectedTopics.length > 0 || selectedDifficulty) && (
            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              {selectedTopics.length + (selectedDifficulty ? 1 : 0)}
            </span>
          )}
        </button>

        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {resultCount} of {totalCount} words
          </span>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
          {/* Difficulty filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </h4>
            <div className="flex gap-2">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    onDifficultyChange(selectedDifficulty === level ? null : level)
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === level
                      ? level === 'beginner'
                        ? 'bg-green-500 text-white'
                        : level === 'intermediate'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Topics filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => onToggleTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function FilterIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
