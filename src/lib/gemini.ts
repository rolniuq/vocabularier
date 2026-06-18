export interface EvaluationResult {
  correct: boolean;
  message: string;
}

export async function evaluateAnswer(
  word: string,
  expectedAnswer: string,
  userAnswer: string,
  mode: 'translation' | 'synonym',
  direction?: 'en-to-vi' | 'vi-to-en',
  vietnamese?: string
): Promise<EvaluationResult> {
  try {
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word,
        expectedAnswer,
        userAnswer,
        mode,
        direction,
        vietnamese,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to evaluate answer');
    }

    return await response.json();
  } catch (error) {
    console.error('Gemini evaluation error:', error);
    // Fallback to strict comparison if the API call fails
    return fallbackEvaluation(word, expectedAnswer, userAnswer, mode, direction);
  }
}

function fallbackEvaluation(
  word: string,
  expectedAnswer: string,
  userAnswer: string,
  mode: 'translation' | 'synonym',
  direction?: 'en-to-vi' | 'vi-to-en'
): EvaluationResult {
  const normalizedUser = userAnswer.trim().toLowerCase();
  let isCorrect = false;
  let message = '';

  if (mode === 'translation') {
    if (direction === 'en-to-vi') {
      const vietnamese = expectedAnswer.toLowerCase();
      isCorrect = normalizedUser === vietnamese;
    } else {
      const english = word.toLowerCase();
      isCorrect = normalizedUser === english;
    }
  } else if (mode === 'synonym') {
    // Expected answer is expected to be a comma separated list of synonyms
    const synonyms = expectedAnswer.toLowerCase().split(',').map(s => s.trim());
    isCorrect = synonyms.includes(normalizedUser);
  }

  if (isCorrect) {
    message = 'Correct! 🎉 (Fallback evaluation)';
  } else {
    message = 'Incorrect. Click the light bulb to see the answer. (Fallback evaluation)';
  }

  return { correct: isCorrect, message };
}
