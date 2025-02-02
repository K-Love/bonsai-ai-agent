from openai import OpenAI
from web3 import Web3
from shopify import Session, GraphQL
from config.api_config import APIConfig

class APIClientManager:
    def __init__(self):
        APIConfig.validate_config()
        self.setup_clients()

    def setup_clients(self):
        """Initialize API clients"""
        # OpenAI client
        self.openai_client = OpenAI(api_key=APIConfig.OPENAI_API_KEY)

        # Web3 client
        self.web3_client = Web3(Web3.HTTPProvider(APIConfig.WEB3_PROVIDER_URL))

        # Shopify client
        self.shopify_session = Session(
            shop_url=APIConfig.SHOPIFY_STORE_URL,
            version="2024-01",
            access_token=APIConfig.SHOPIFY_API_KEY
        )
        self.shopify_client = GraphQL(self.shopify_session)

    def test_connections(self):
        """Test all API connections"""
        try:
            # Test OpenAI
            self.openai_client.models.list()
            print("✓ OpenAI connection successful")

            # Test Web3
            if self.web3_client.is_connected():
                print("✓ Web3 connection successful")

            # Test Shopify
            self.shopify_client.execute("query { shop { name } }")
            print("✓ Shopify connection successful")

            return True

        except Exception as e:
            print(f"Error testing connections: {str(e)}")
            return False