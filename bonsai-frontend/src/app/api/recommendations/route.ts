import { NextResponse } from 'next/server';
import { BonsaiAIAgent } from '@/lib/ai/agent';

export async function POST(req: Request) {
  try {
    const { productName } = await req.json();
    
    if (!productName) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    const agent = new BonsaiAIAgent();
    const recommendations = await agent.generateProductDescription(productName);
    
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}