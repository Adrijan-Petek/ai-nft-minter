import { NextRequest, NextResponse } from 'next/server';
import { pinJSONToIPFS } from '@/lib/pinata';

export async function POST(req: NextRequest) {
  try {
    const { name, description, imageUrl } = await req.json();

    if (!name || !description || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const metadata = {
      name,
      description,
      image: imageUrl,
      attributes: [
        {
          trait_type: "AI Generated",
          value: "true"
        },
        {
          trait_type: "Generator",
          value: "Stable Diffusion XL"
        }
      ]
    };

    const ipfsHash = await pinJSONToIPFS(metadata);
    const tokenURI = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    return NextResponse.json({ tokenURI });
  } catch (error) {
    console.error('Metadata storage error:', error);
    return NextResponse.json({ error: 'Failed to store metadata' }, { status: 500 });
  }
}