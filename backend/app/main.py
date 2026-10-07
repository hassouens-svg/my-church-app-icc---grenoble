"""
Point d'entrée de l'API.

Lancer en local :  uvicorn app.main:app --reload
Documentation interactive : http://localhost:8000/docs
"""
import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import CORS_ORIGINS, SEED_DEMO_DATA
from .database import Base, SessionLocal, engine
from .routers import admin, affectations, agenda, auth, discipolat, familles, fideles, meta, public, stats
from .seed import seed


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed(db, demo=SEED_DEMO_DATA)
    yield


app = FastAPI(
    title="My Church ICC App — ICC Grenoble",
    description="Plateforme centralisée — une seule base de données : les fidèles au cœur du système.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👉 Pour ajouter un module : créer app/routers/mon_module.py puis l'ajouter ici.
for module in (auth, meta, fideles, familles, discipolat, affectations, agenda, stats, admin, public):
    app.include_router(module.router)


@app.get("/api/health", tags=["Système"])
def health():
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# En ligne : le backend sert aussi le site (frontend compilé avec `npm run build`).
# En développement, ce bloc est ignoré tant que frontend/dist n'existe pas.
# ---------------------------------------------------------------------------
DIST = Path(os.getenv("FRONTEND_DIST", Path(__file__).resolve().parents[2] / "frontend" / "dist")).resolve()

if (DIST / "index.html").is_file():
    app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")

    @app.get("/{chemin:path}", include_in_schema=False)
    def site(chemin: str):
        if chemin.startswith("api/"):
            raise HTTPException(404, "Route d'API inconnue")
        fichier = (DIST / chemin).resolve()
        if chemin and fichier.is_file() and DIST in fichier.parents:
            return FileResponse(fichier)
        return FileResponse(DIST / "index.html")  # les pages React gèrent elles-mêmes l'URL
