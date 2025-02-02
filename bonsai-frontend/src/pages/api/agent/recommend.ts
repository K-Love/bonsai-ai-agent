import { NextApiRequest, NextApiResponse } from 'next';
import { BonsaiAIAgent } from '@/lib/ai/agent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { analysis } = req.body;
    const agent = new BonsaiAIAgent();
    const recommendation = await agent.recommend(analysis);
    
    res.status(200).json(recommendation);
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ message: 'Error generating recommendations' });
  }
}