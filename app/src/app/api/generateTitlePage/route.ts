import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const apiUrl = process.env.RIT_TITLEPAGE_API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('Missing env variables:', { apiUrl, apiKey });
      return NextResponse.json(
        { error: 'API configuration missing' },
        { status: 500 }
      );
    }

    const fastApiResponse = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Origin': 'https://ritlepage.pages.dev',
      },
      body: JSON.stringify(body),
    });

    if (!fastApiResponse.ok) {
      const errorDetails = await fastApiResponse.text();
      console.error('Error from FastAPI:', errorDetails);
      return NextResponse.json(
        { error: 'Failed to generate file', details: errorDetails },
        { status: 500 }
      );
    }

    const arrayBuffer = await fastApiResponse.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="submission.docx"',
      },
    });
  } catch (error) {
    console.error('Next.js API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}