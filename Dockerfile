# Image unique « tout-en-un » pour mettre l'application en ligne (Render, Railway, Fly.io…)
# 1) Compilation du site React
FROM node:20-alpine AS site
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# 2) API Python qui sert aussi le site compilé
FROM python:3.12-slim
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
COPY --from=site /frontend/dist /app/frontend/dist
RUN mkdir -p /data
ENV DATABASE_URL=sqlite:////data/icc.db
EXPOSE 8000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
