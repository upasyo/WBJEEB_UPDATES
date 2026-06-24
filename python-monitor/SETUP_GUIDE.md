# Deployment & Setup Guide

This guide explains how to deploy the WBJEE Monitoring System to GitHub and set up GitHub Actions for 24/7 automated monitoring.

## 1. Local Setup (Testing)
1. Ensure you have Python 3.12 installed.
2. Navigate to the project directory: `cd python-monitor`
3. Install the required dependencies: `pip install -r requirements.txt`
4. Set the necessary environment variables in your terminal:
   - `export GEMINI_API_KEY="your-gemini-api-key"`
   - `export NTFY_TOPIC="your-custom-ntfy-topic-name"`
5. Run the script manually: `python monitor.py`

## 2. Notification Setup (ntfy.sh)
1. Download the ntfy app on your phone (iOS/Android).
2. Open the app and subscribe to a unique topic name (e.g., `my_secret_wbjee_alerts_99`).
3. Use this topic name as your `NTFY_TOPIC` secret. No sign-up is required!

## 3. GitHub Deployment
To run this script automatically every hour using the GitHub Actions Free Tier:

1. Create a new repository on GitHub.
2. Push this entire codebase to your new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WBJEE Monitor"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

## 4. GitHub Secrets Setup
1. Go to your GitHub repository in the browser.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret**.
4. Add the following secrets:
   - Name: `GEMINI_API_KEY`, Secret: `your-gemini-api-key`
   - Name: `NTFY_TOPIC`, Secret: `your-custom-ntfy-topic-name`
5. Note: Ensure under **Settings** > **Actions** > **General**, under "Workflow permissions", that **Read and write permissions** is selected so the bot can commit the snapshot data back to the repo.

## 5. Execution
- The GitHub Actions workflow (`.github/workflows/wbjee-monitor.yml`) is scheduled to run at the start of every hour.
- You can manually trigger it by going to the **Actions** tab in your repository, selecting the "WBJEE Monitor" workflow, and clicking **Run workflow**.
