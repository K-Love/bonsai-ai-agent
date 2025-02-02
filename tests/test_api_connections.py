import pytest
from src.utils.api_client import APIClientManager

def test_api_connections():
    client_manager = APIClientManager()
    assert client_manager.test_connections() == True

def test_missing_config():
    # This should raise ValueError if environment variables are missing
    with pytest.raises(ValueError):
        APIConfig.validate_config()