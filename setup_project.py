import os
import subprocess
import sys

class ProjectSetup:
    def __init__(self):
        self.base_dir = os.getcwd()

    def create_directory_structure(self):
        """Create the project directory structure"""
        directories = [
            'src',
            'src/market_research',
            'src/web3_integration',
            'src/seo',
            'src/branding',
            'src/launch_strategy',
            'src/ai_agent',
            'src/utils',
            'src/dropshipping',
            'src/dropshipping/suppliers',
            'src/dropshipping/products',
            'src/dropshipping/orders',
            'data',
            'data/raw',
            'data/processed',
            'tests',
            'config',
            'notebooks',
            'docs',
            'docs/conversations'
        ]

        print("Creating directory structure...")
        for directory in directories:
            dir_path = os.path.join(self.base_dir, directory)
            os.makedirs(dir_path, exist_ok=True)
            if directory.startswith('src'):
                with open(os.path.join(dir_path, '__init__.py'), 'w') as f:
                    pass

    def create_config_files(self):
        """Create configuration files"""
        print("Creating configuration files...")

        config = {
            'project_name': 'bonsai_ai_agent',
            'version': '0.1.0',
            'api_keys': {
                'openai_key': 'YOUR_OPENAI_KEY',
                'web3_provider': 'YOUR_WEB3_PROVIDER',
                'shopify_api_key': 'YOUR_SHOPIFY_KEY'
            },
            'database': {
                'host': 'localhost',
                'port': 5432,
                'name': 'bonsai_db'
            }
        }

        # Create config directory if it doesn't exist
        os.makedirs('config', exist_ok=True)

        # Write config template
        with open('config/config_template.yaml', 'w') as f:
            f.write(str(config))

    def create_env_file(self):
        """Create .env file"""
        print("Creating .env file...")
        env_content = '''
# API Keys
OPENAI_API_KEY=your_key_here
WEB3_PROVIDER_URL=your_provider_here
SHOPIFY_API_KEY=your_shopify_key_here
SHOPIFY_API_SECRET=your_shopify_secret_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bonsai_db

# Application
DEBUG=True
SECRET_KEY=your_secret_key_here
'''
        with open('.env', 'w') as f:
            f.write(env_content.strip())

    def create_requirements_file(self):
        """Create requirements.txt"""
        print("Creating requirements.txt...")
        requirements = [
            # Core dependencies
            'fastapi==0.68.1',
            'uvicorn==0.15.0',
            'python-dotenv==0.19.0',
            'pyyaml==5.4.1',

            # Database
            'sqlalchemy==1.4.23',
            'psycopg2-binary==2.9.1',

            # AI and Data Science
            'openai==0.27.0',
            'pandas==1.3.3',
            'numpy==1.21.2',

            # Web3
            'web3==5.24.0',

            # Dropshipping
            'shopify-python-api==5.5.1',

            # Development
            'black==21.8b0',
            'pylint==2.10.2',
            'pytest==6.2.5',
            'pytest-cov==2.12.1'
        ]

        with open('requirements.txt', 'w') as f:
            f.write('\n'.join(requirements))

    def setup_git(self):
        """Initialize git repository"""
        print("Setting up git...")
        gitignore_content = '''
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
ENV/

# Environment variables
.env

# IDEs
.idea/
.vscode/
*.swp
*.swo

# Data
data/raw/*
data/processed/*
!data/raw/.gitkeep
!data/processed/.gitkeep

# Logs
*.log

# System Files
.DS_Store
Thumbs.db
'''
        with open('.gitignore', 'w') as f:
            f.write(gitignore_content.strip())

    def setup_project(self):
        """Run all setup steps"""
        try:
            self.create_directory_structure()
            self.create_config_files()
            self.create_env_file()
            self.create_requirements_file()
            self.setup_git()

            print("\nProject setup completed successfully!")
            print("\nNext steps:")
            print("1. Install dependencies: pip install -r requirements.txt")
            print("2. Update the .env file with your API keys")
            print("3. Start developing!")

        except Exception as e:
            print(f"Error during project setup: {str(e)}")
            sys.exit(1)

if __name__ == "__main__":
    setup = ProjectSetup()
    setup.setup_project()