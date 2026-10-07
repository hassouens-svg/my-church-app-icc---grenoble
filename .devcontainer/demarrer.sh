#!/usr/bin/env bash
# Démarre l'application à chaque ouverture du Codespace.
#  - port 8000 : l'application complète (site + API)
#  - port 5173 : mode développement avec rechargement automatique des modifications
cd "$(dirname "$0")/.."
(cd backend && nohup .venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > /tmp/backend.log 2>&1 &)
(cd frontend && nohup npm run dev -- --host 0.0.0.0 > /tmp/frontend.log 2>&1 &)
echo "✅ ICC Grenoble démarre : onglet PORTS → port 8000 (application) ou 5173 (développement)."
