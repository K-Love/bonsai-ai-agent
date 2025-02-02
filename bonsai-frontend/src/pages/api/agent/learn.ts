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
    const { feedback } = req.body;
    const agent = new BonsaiAIAgent();
    await agent.learn(feedback);
    
    res.status(200).json({ message: 'Feedback processed successfully' });
  } catch (error) {
    console.error('Learning error:', error);
    res.status(500).json({ message: 'Error processing feedback' });
  }
}