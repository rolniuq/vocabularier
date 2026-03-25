'use client';

import { useState } from 'react';
import { Word, UserProgress } from '@/types';

interface ExportImportProps {
  words: Word[];
  userProgress: Record<string, UserProgress>;
  onImport: (words: Word[]) => void;
}

export function ExportImport({ words, userProgress, onImport }: ExportImportProps) {
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const exportVocabulary = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      words: words.filter((w) => w.source === 'user'), // Only export user-added words
      progress: userProgress,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocaburarier-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccess('Vocabulary exported successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const exportAsCSV = () => {
    const headers = ['Word', 'Part of Speech', 'Definition', 'Examples', 'Synonyms', 'Phonetic'];
    const rows = words.map((w) => [
      w.word,
      w.partOfSpeech,
      `"${w.definition.replace(/"/g, '""')}"`,
      `"${w.examples.join('; ').replace(/"/g, '""')}"`,
      `"${w.synonyms.join(', ')}"`,
      w.phonetic,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocaburarier-words-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccess('CSV exported successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleImport = () => {
    try {
      setError(null);
      const data = JSON.parse(importText);

      if (!data.words || !Array.isArray(data.words)) {
        throw new Error('Invalid format: missing words array');
      }

      // Validate words structure
      const validWords = data.words.filter((w: unknown) => {
        if (typeof w !== 'object' || w === null) return false;
        const word = w as Record<string, unknown>;
        return typeof word.word === 'string' && typeof word.definition === 'string';
      });

      if (validWords.length === 0) {
        throw new Error('No valid words found in import data');
      }

      onImport(validWords);
      setImportText('');
      setShowImport(false);
      setSuccess(`Successfully imported ${validWords.length} words!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse import data');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Export & Import
      </h3>

      {/* Success/Error messages */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Export buttons */}
      <div className="space-y-3 mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Export your vocabulary for backup or sharing
        </p>
        <div className="flex gap-3">
          <button
            onClick={exportVocabulary}
            className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={exportAsCSV}
            className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Import section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <button
          onClick={() => setShowImport(!showImport)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <UploadIcon className="w-4 h-4" />
          Import vocabulary
          <ChevronIcon className={`w-4 h-4 transition-transform ${showImport ? 'rotate-180' : ''}`} />
        </button>

        {showImport && (
          <div className="mt-4 space-y-4">
            {/* File upload */}
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Upload a JSON file
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
              />
            </div>

            {/* Or paste JSON */}
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Or paste JSON data
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono dark:bg-gray-700 dark:text-white"
                placeholder='{"words": [...]}'
              />
            </div>

            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Import Words
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function UploadIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
