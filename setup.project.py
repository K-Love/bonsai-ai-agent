import os
import subprocess
import sys

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")

def main():
    # Define project structure
    directories = [
        "src",
        "src/market_research",
        "src/web3_integration",
        "src/seo",
        "src/branding",
        "src/launch_strategy",
        "src/ai_agent",
        "src/utils",
        "src/dropshipping",
        "data",
        "tests",
        "config",
        "notebooks",
        "docs",
        ".vscode"
    ]

    # Create directories
    for directory in directories:
        create_directory(directory)

    # Create essential files
    files_to_create = {
        "src/main.py": "# Main application entry point\n",
        "requirements.txt": """
black
pylint
pytest
python-dotenv
fastapi
uvicorn
sqlalchemy
requests
pandas
numpy
""".strip(),
        ".env": "# Environment variables\nSECRET_KEY=your_secret_key_here\n",
        ".gitignore": """
venv/
__pycache__/
*.pyc
.env
.pytest_cache/
.coverage
htmlcov/
.DS_Store
""".strip(),
        ".vscode/settings.json": """
{
    "editor.formatOnSave": true,
    "python.formatting.provider": "black",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.analysis.typeCheckingMode": "basic",
    "files.trimTrailingWhitespace": true,
    "git.enableSmartCommit": true,
    "editor.rulers": [80, 100],
    "editor.suggestSelection": "first",
    "files.exclude": {
        "**/__pycache__": true,
        "**/.pytest_cache": true,
        "**/*.pyc": true
    },
    "[python]": {
        "editor.defaultFormatter": "ms-python.python",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": true
        }
    },
    "python.testing.pytestEnabled": true,
    "python.testing.unittestEnabled": false,
    "python.testing.nosetestsEnabled": false
}
""".strip()
    }

    for file_path, content in files_to_create.items():
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Created file: {file_path}")

    print("\nProject setup completed successfully!")
    print("\nNext steps:")
    print("1. Install requirements: pip install -r requirements.txt")
    print("2. Initialize git repository: git init")
    print("3. Make initial commit: git add . && git commit -m 'Initial project setup'")

if __name__ == "__main__":
    main()

# Created/Modified files during execution:
print("\nFiles created/modified:")
print("src/main.py")
print("requirements.txt")
print(".env")
print(".gitignore")
print(".vscode/settings.json")