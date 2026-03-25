'use client';

import { useState, useMemo } from 'react';
import { Word } from '@/types';

interface UseSearchFilterOptions {
  words: Word[];
}

interface UseSearchFilterResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopics: string[];
  toggleTopic: (topic: string) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  filteredWords: Word[];
  allTopics: string[];
  clearFilters: () => void;
}

export function useSearchFilter({ words }: UseSearchFilterOptions): UseSearchFilterResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Get all unique topics
  const allTopics = useMemo(() => {
    const topicSet = new Set<string>();
    words.forEach((word) => {
      word.topics.forEach((topic) => topicSet.add(topic));
    });
    return Array.from(topicSet).sort();
  }, [words]);

  // Filter words based on search and filters
  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          word.word.toLowerCase().includes(query) ||
          word.definition.toLowerCase().includes(query) ||
          word.synonyms.some((s) => s.toLowerCase().includes(query)) ||
          word.examples.some((e) => e.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Topic filter
      if (selectedTopics.length > 0) {
        const hasMatchingTopic = selectedTopics.some((topic) =>
          word.topics.includes(topic)
        );
        if (!hasMatchingTopic) return false;
      }

      // Difficulty filter
      if (selectedDifficulty && word.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [words, searchQuery, selectedTopics, selectedDifficulty]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopics([]);
    setSelectedDifficulty(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTopics,
    toggleTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredWords,
    allTopics,
    clearFilters,
  };
}
