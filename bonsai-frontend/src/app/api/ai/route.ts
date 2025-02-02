import { NextResponse } from 'next/server';
import { BonsaiAIAgent } from '@/lib/ai/agent';

export async function POST(req: Request) {
    try {
        const { action, query } = await req.json();
        const agent = new BonsaiAIAgent();

        let result;
        switch (action) {
            case 'analyze-market':
                result = await agent.analyzeMarket(query);
                break;
            case 'generate-description':
                result = await agent.generateProductDescription(query);
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.error('AI Agent error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}