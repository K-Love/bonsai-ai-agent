import { NextResponse } from 'next/server';
import { BonsaiAIAgent } from '@/lib/ai/agent';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const agent = new BonsaiAIAgent();
    const analysis = await agent.analyzeMarket(query);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Market analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze market' },
      { status: 500 }
    );
  }
}