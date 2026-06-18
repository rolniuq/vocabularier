export interface EvaluationResult {
  correct: boolean;
  message: string;
}

export async function evaluateAnswer(
  word: string,
  userAnswer: string,
  direction: 'en-to-vi' | 'vi-to-en',
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
        userAnswer,
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
    console.error('AI evaluation error:', error);
    return fallbackEvaluation(word, userAnswer, direction, vietnamese);
  }
}

function fallbackEvaluation(
  word: string,
  userAnswer: string,
  direction: 'en-to-vi' | 'vi-to-en',
  vietnamese?: string
): EvaluationResult {
  const normalizedUser = userAnswer.trim().toLowerCase();

  if (direction === 'en-to-vi') {
    const target = (vietnamese || '').toLowerCase();
    const isCorrect = normalizedUser === target;
    return {
      correct: isCorrect,
      message: isCorrect
        ? 'Correct! (Fallback evaluation)'
        : 'Incorrect. Try again.',
    };
  } else {
    const target = word.toLowerCase();
    const isCorrect = normalizedUser === target;
    return {
      correct: isCorrect,
      message: isCorrect
        ? 'Correct! (Fallback evaluation)'
        : 'Incorrect. Try again.',
    };
  }
}
