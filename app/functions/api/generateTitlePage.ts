interface CloudflareContext {
  request: Request;
  env: {
    RIT_TITLEPAGE_API_URL?: string;
    API_KEY?: string;
    [key: string]: string | undefined;
  };
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void; 
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}

export async function onRequestPost(context: CloudflareContext) {
  try {
    const body = await context.request.json();
    
    // Environment variables accessed via context.env, not process.env
    const apiUrl = context.env.RIT_TITLEPAGE_API_URL;
    const apiKey = context.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('Missing env variables:', { apiUrl, apiKey });
      return new Response(JSON.stringify({ error: 'API configuration missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
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
      return new Response(JSON.stringify({ error: 'Failed to generate file', details: errorDetails }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const arrayBuffer = await fastApiResponse.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="submission.docx"',
      },
    });
  } catch (error) {
    console.error('Pages Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
