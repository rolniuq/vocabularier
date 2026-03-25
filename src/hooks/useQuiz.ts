'use client';

import { useState, useEffect, useMemo } from 'react';
import { Word } from '@/types';

interface QuizQuestion {
  id: string;
  word: Word;
  type: 'definition' | 'synonym' | 'fillBlank' | 'audio';
  question: string;
  correctAnswer: string;
  options: string[];
  context?: string; // For fill in the blank
}

interface UseQuizOptions {
  words: Word[];
  questionCount?: number;
  types?: ('definition' | 'synonym' | 'fillBlank')[];
}

interface QuizResult {
  questionId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeTaken: number; // in seconds
}

export function useQuiz({ words, questionCount = 10, types = ['definition', 'synonym', 'fillBlank'] }: UseQuizOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Generate quiz questions
  const questions = useMemo(() => {
    if (words.length === 0) return [];

    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, Math.min(questionCount, words.length));
    
    return selectedWords.map((word, index): QuizQuestion => {
      const type = types[index % types.length];
      
      switch (type) {
        case 'definition':
          return createDefinitionQuestion(word, words);
        case 'synonym':
          return createSynonymQuestion(word, words);
        case 'fillBlank':
          return createFillBlankQuestion(word);
        default:
          return createDefinitionQuestion(word, words);
      }
    });
  }, [words, questionCount, types]);

  const currentQuestion = questions[currentIndex] || null;

  const submitAnswer = (answer: string) => {
    if (!currentQuestion || !startTime) return;

    const timeTaken = (Date.now() - startTime) / 1000;
    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

    const result: QuizResult = {
      questionId: currentQuestion.id,
      correct: isCorrect,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      timeTaken,
    };

    setResults((prev) => [...prev, result]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStartTime(Date.now());
    } else {
      setIsComplete(true);
    }

    return isCorrect;
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setResults([]);
    setStartTime(Date.now());
    setIsComplete(false);
  };

  // Start timer when quiz begins
  useEffect(() => {
    if (questions.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [questions, startTime]);

  const score = results.filter((r) => r.correct).length;
  const totalQuestions = questions.length;
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const averageTime = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.timeTaken, 0) / results.length)
    : 0;

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    submitAnswer,
    restartQuiz,
    isComplete,
    results,
    score,
    accuracy,
    averageTime,
  };
}

// Helper functions to create different question types
function createDefinitionQuestion(word: Word, allWords: Word[]): QuizQuestion {
  const wrongAnswers = allWords
    .filter((w) => w.id !== word.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.word);

  const options = [...wrongAnswers, word.word].sort(() => Math.random() - 0.5);

  return {
    id: `def-${word.id}`,
    word,
    type: 'definition',
    question: `Which word matches this definition?\n\n"${word.definition}"`,
    correctAnswer: word.word,
    options,
  };
}

function createSynonymQuestion(word: Word, allWords: Word[]): QuizQuestion {
  if (word.synonyms.length === 0) {
    return createDefinitionQuestion(word, allWords);
  }

  const correctSynonym = word.synonyms[0];
  
  // Get random words as wrong answers
  const wrongAnswers = allWords
    .filter((w) => w.id !== word.id && !word.synonyms.includes(w.word))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.synonyms[0] || w.word)
    .filter((w) => w !== correctSynonym);

  // Ensure we have 3 wrong answers
  while (wrongAnswers.length < 3) {
    wrongAnswers.push(allWords[Math.floor(Math.random() * allWords.length)].word);
  }

  const options = [...wrongAnswers.slice(0, 3), correctSynonym].sort(() => Math.random() - 0.5);

  return {
    id: `syn-${word.id}`,
    word,
    type: 'synonym',
    question: `Which word is a synonym of "${word.word}"?`,
    correctAnswer: correctSynonym,
    options,
  };
}

function createFillBlankQuestion(word: Word): QuizQuestion {
  const example = word.examples[0] || `The concept is very ${word.word} in this context.`;
  const blankExample = example.replace(new RegExp(word.word, 'gi'), '_____');

  return {
    id: `fill-${word.id}`,
    word,
    type: 'fillBlank',
    question: `Fill in the blank with the correct word:`,
    correctAnswer: word.word,
    options: [], // No options for fill in the blank - user types the answer
    context: blankExample,
  };
}
