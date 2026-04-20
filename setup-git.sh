#!/usr/bin/env bash
#
# One-shot setup script for The Sauna Host.
# Run this from Terminal with:
#   bash "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/setup-git.sh"
#
# It will:
#   1. Clean up any accidental .git in your home folder
#   2. Move to the project folder automatically
#   3. Initialize git, stage, and commit
#   4. Print the exact next commands to run for GitHub

set -e  # stop on any error

echo ""
echo "=============================================="
echo "  The Sauna Host — Git Setup"
echo "=============================================="
echo ""

# Step 1: Clean up any accidental git init in home folder
if [ -d "$HOME/.git" ]; then
  echo "→ Cleaning up accidental .git in your home folder..."
  rm -rf "$HOME/.git"
  echo "  Done."
  echo ""
fi

# Step 2: Move to the project folder (the folder this script is in)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
echo "→ Working in this folder:"
echo "  $SCRIPT_DIR"
echo ""

# Step 3: Initialize git if needed
if [ -d .git ]; then
  echo "→ Git is already set up in this folder. Skipping init."
else
  echo "→ Initializing git..."
  git init --initial-branch=main > /dev/null 2>&1 || {
    git init > /dev/null 2>&1
    git branch -M main > /dev/null 2>&1
  }
  echo "  Done."
fi
echo ""

# Step 4: Stage + commit
echo "→ Staging all files..."
git add .
echo "  Done."
echo ""

if git diff --cached --quiet; then
  echo "→ Nothing new to commit. Repo is clean."
else
  echo "→ Committing..."
  git commit -m "Initial commit: The Sauna Host site" > /dev/null
  echo "  Done."
fi
echo ""

# Step 5: Print next steps
echo "=============================================="
echo "  Next: push to GitHub"
echo "=============================================="
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: sauna-host"
echo "3. Private"
echo "4. Do NOT add a README or .gitignore"
echo "5. Click Create repository"
echo ""
echo "Then copy the lines GitHub shows and paste them here."
echo "They look like this (yours will have your username):"
echo ""
echo "  git remote add origin https://github.com/YOUR-USERNAME/sauna-host.git"
echo "  git push -u origin main"
echo ""
echo "=============================================="
echo ""
