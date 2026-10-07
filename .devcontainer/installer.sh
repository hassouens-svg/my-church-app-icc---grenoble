#!/usr/bin/env bash
# Installation automatique dans GitHub Codespaces (exécuté une seule fois)
set -e
cd backend
python -m venv .venv
.venv/bin/pip install -q -r requirements.txt
[ -f .env ] || cp .env.example .env
cd ../frontend
npm install --no-audit --no-fund
npm run build
