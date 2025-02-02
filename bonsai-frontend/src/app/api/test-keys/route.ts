import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Stripe from 'stripe';

export async function GET() {
  try {
    // Test OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Test Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });

    const results = {
      openai: false,
      stripe: false,
    };

    try {
      await openai.models.list();
      results.openai = true;
    } catch (e) {
      console.error('OpenAI test failed:', e);
    }

    try {
      await stripe.paymentIntents.list({ limit: 1 });
      results.stripe = true;
    } catch (e) {
      console.error('Stripe test failed:', e);
    }

    return NextResponse.json({
      message: 'API Key test results',
      results
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Error testing API keys' },
      { status: 500 }
    );
  }
}
