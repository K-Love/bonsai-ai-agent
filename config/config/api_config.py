from dotenv import load_dotenv
import os

load_dotenv()

class APIConfig:
    # OpenAI for AI agent
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

    # Stripe for payments
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
    STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')

    # Database
    DATABASE_URL = os.getenv('DATABASE_URL')

    @classmethod
    def validate_config(cls):
        """Validate that all required API keys are present"""
        required_vars = [
            'OPENAI_API_KEY',
            'STRIPE_SECRET_KEY',
            'STRIPE_PUBLIC_KEY',
            'DATABASE_URL'
        ]

        missing_vars = [var for var in required_vars if not getattr(cls, var)]

        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

        return True