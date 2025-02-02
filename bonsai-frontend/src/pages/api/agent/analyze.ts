import { NextApiRequest, NextApiResponse } from 'next';
import { BonsaiAIAgent } from '@/lib/ai/agent';
import { BonsaiData } from '@/types/bonsai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bonsaiData: BonsaiData = req.body;
    const agent = new BonsaiAIAgent();
    const analysis = await agent.analyze(bonsaiData);
    
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ message: 'Error analyzing bonsai data' });
  }
}