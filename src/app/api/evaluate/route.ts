import { NextResponse } from 'next/server';

const apiKey = process.env.GROQ_API_KEY;

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured in the environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { word, userAnswer, direction, vietnamese } = body;

    if (!word || !userAnswer || !direction) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const isEnToVi = direction === 'en-to-vi';
    const sourceText = isEnToVi ? word : (vietnamese || '');
    const targetLanguage = isEnToVi ? 'Vietnamese' : 'English';

    const prompt = `You are a strict but fair language teacher grading a translation test.
The user was asked to translate "${sourceText}" into ${targetLanguage}.
The user's answer is: "${userAnswer}".

Evaluate if the user's answer is a correct and natural translation.
- Accept minor spelling mistakes and different words with the same semantic meaning.
- For English to Vietnamese: accept common alternative translations.
- For Vietnamese to English: accept valid synonyms or close equivalents.
- Be generous — if the meaning is clearly conveyed, mark as correct.
Respond ONLY with a JSON object containing "correct" (boolean) and "message" (string giving short feedback in English).
Format: {"correct": true, "message": "Correct! Natural translation."}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: 'AI evaluation service failed' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const textResponse = data.choices?.[0]?.message?.content;
    if (!textResponse) {
      throw new Error('Empty response from Groq');
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
