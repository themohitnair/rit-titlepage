import { SubmissionParams } from './types'

export async function generateTitlePage(params: SubmissionParams): Promise<Blob> {
    const apiUrl = process.env.RIT_TITLEPAGE_API_URL;

    if (!apiUrl) {
        throw new Error('RIT_TITLEPAGE_API_URL is not defined in the environment variables');
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error('Failed to generate title page');
    }

    return await response.blob();
}
