import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Make sure to set GEMINI_API_KEY in your .env.local file
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in the environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { word, expectedAnswer, userAnswer, mode, direction, vietnamese } = body;

    if (!word || !expectedAnswer || !userAnswer || !mode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let prompt = '';

    if (mode === 'translation') {
      if (direction === 'en-to-vi') {
        prompt = `
You are a strict but fair language teacher grading a translation test.
The user was asked to translate the English word "${word}" into Vietnamese.
The exact textbook answer is "${expectedAnswer}".
The user's answer is: "${userAnswer}".

Evaluate if the user's answer is a correct and natural translation for the word "${word}". 
Minor spelling mistakes or different words with the exact same semantic meaning should be accepted.
Respond ONLY with a JSON object containing "correct" (boolean) and "message" (string giving short feedback).
Format: {"correct": true, "message": "Good job! 'rời bỏ' is also correct."}
`;
      } else {
        const vietnameseText = vietnamese || expectedAnswer;
        prompt = `
You are a strict but fair language teacher grading a translation test.
The user was asked to translate the Vietnamese word/phrase "${vietnameseText}" into English.
The exact textbook answer is "${word}".
The user's answer is: "${userAnswer}".

Evaluate if the user's answer is a correct and natural translation. 
Minor spelling mistakes or valid synonyms should be accepted.
Respond ONLY with a JSON object containing "correct" (boolean) and "message" (string giving short feedback).
Format: {"correct": true, "message": "Good job! 'leave' is also correct."}
`;
      }
    } else if (mode === 'synonym') {
      prompt = `
You are a strict but fair language teacher grading a vocabulary test.
The user was asked to provide a synonym for the English word "${word}".
Some textbook synonyms are: ${expectedAnswer}.
The user's answer is: "${userAnswer}".

Evaluate if the user's answer is a valid synonym for the word "${word}". 
Respond ONLY with a JSON object containing "correct" (boolean) and "message" (string giving short feedback).
Format: {"correct": true, "message": "Yes, 'quit' is a great synonym."}
`;
    } else {
      return NextResponse.json(
        { error: 'Invalid mode' },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for more deterministic grading
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error('Empty response from Gemini');
    }

    const jsonResponse = JSON.parse(textResponse);
    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error('Error evaluating answer:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to evaluate answer' },
      { status: 500 }
    );
  }
}
