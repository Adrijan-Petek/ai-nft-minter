import { NextRequest, NextResponse } from 'next/server';

const STABILITY_API_KEY = 'sk-V8F2GnlrDpuC2tIGCb3Xwg32wfecWznXtMDLzKSWcMEvW20D';
if (!STABILITY_API_KEY) {
  throw new Error('STABILITY_API_KEY is not defined');
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    console.log('Generating image with prompt:', prompt);

    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stability AI API Error: ${error}`);
    }

    const data = await response.json();
    const imageUrl = `data:image/png;base64,${data.artifacts[0].base64}`;
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Stability AI API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}