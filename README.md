# My Church ICC App — ICC Grenoble

> **Une seule base de données : les FIDÈLES au cœur de tout le système.**
> 1 fidèle = 1 fiche unique, partagée par tous les départements.

Plateforme centralisée de gestion de l'Église (Impact Centre Chrétien — Grenoble).

```
   ÉVANGÉLISATION ─┐                        ┌─ FAMILLES D'IMPACT
 ACCUEIL & INTÉGR. ─┼──►  BASE UNIQUE   ◄───┼─ STATISTIQUES
        DISCIPOLAT ─┘     LES FIDÈLES       └─ AUTRES DÉPARTEMENTS (STARS, MPI, Juniors, Agenda…)

Parcours :  Évangélisation → Accueil → Discipolat → Famille de disciple → Famille d'Impact → Membre actif
```

## 🌐 Voir l'application en ligne

GitHub stocke le code, mais l'application a besoin d'un serveur (pour la base de données).
Deux façons de la voir tourner « pour de vrai » :

### A. Directement depuis GitHub (Codespaces) : 1 clic, rien à installer

[![Ouvrir dans GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hassouens-svg/my-church-app-icc---grenoble?quickstart=1)

1. Cliquer sur le bouton ci-dessus (ou **Code → Codespaces → Create codespace on main**)
2. Attendre 2 à 3 minutes : tout s'installe et démarre tout seul
3. L'application s'ouvre dans un aperçu. Pour l'ouvrir dans un vrai onglet : onglet **PORTS** → port **8000** → icône 🌐
4. Se connecter avec `admin` / `admin123`

Idéal pour tester et pour **modifier le code** : le port **5173** affiche les modifications en direct.
Le Codespace s'éteint après 30 min d'inactivité (gratuit dans la limite du quota mensuel de GitHub).
Pour montrer l'app à quelqu'un : onglet PORTS → clic droit sur 8000 → **Port Visibility → Public**, puis partager l'adresse.

### B. Une adresse publique permanente (Render, gratuit)

[![Déployer sur Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/hassouens-svg/my-church-app-icc---grenoble)

1. Créer un compte sur https://render.com avec « Sign in with GitHub »
2. Cliquer sur le bouton ci-dessus (ou **New → Blueprint** → choisir ce dépôt), puis **Apply**
3. Après ~5 min, l'app est en ligne à une adresse du type `https://icc-grenoble.onrender.com`

À savoir sur l'offre gratuite : le site se met en veille après 15 min sans visite (≈ 1 min pour se réveiller),
et **les données sont remises à zéro à chaque redémarrage**. Parfait pour une démo ; pour de vraies données,
ajouter une base PostgreSQL (voir le guide de modification, § 7) ou un disque persistant (offre payante).

## Fonctionnalités

| Module | Ce qu'on peut faire |
|---|---|
| **Les Fidèles** | Fiche unique (identité, coordonnées, campus, statut spirituel, catégorie MR/MF), recherche, filtres, **détection des doublons** (même téléphone ou email) |
| **Fiche 360°** | Parcours cliquable, affectations & responsabilités, discipolat, Famille d'Impact, **historique de toutes les actions** de tous les départements |
| **Évangélisation** | Enregistrement des nouveaux convertis, phoning (compte rendu d'appel), passage à l'Accueil |
| **Accueil & Intégration** | Nouveaux arrivants, suivi, affectation initiale, **formulaire public** `/inscription` (lien / QR code) |
| **Discipolat** | Promotions, modules (PCNC, Au cœur de la Bible, STAR…), cases à cocher par disciple, mentor, statut |
| **Familles d'Impact** | Familles, pilotes, membres, réunions (présents / invités), liste des fidèles à intégrer |
| **Services & ministères** | STARS, MPI, Juniors, Louange… : qui sert où et avec quel rôle |
| **Statistiques** | MR / MF / ni MR ni MF, par étape, statut, campus, sexe, effectifs des cultes |
| **Agenda** | Événements de l'Église par département / campus |
| **Administration** | Comptes de connexion (rôles), campus |

## Technologies (simples et répandues)

- **Backend** : Python 3.11+ · [FastAPI](https://fastapi.tiangolo.com) · SQLAlchemy · SQLite par défaut (PostgreSQL possible)
- **Frontend** : React 18 · Vite · Tailwind CSS · icônes [lucide](https://lucide.dev/icons)

## Démarrage rapide

### Option 1 — avec Docker
```bash
docker compose up --build
```
Ouvrir http://localhost:5173

### Option 2 — sans Docker

**Backend** (terminal 1) :
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows : .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # Windows : copy .env.example .env
uvicorn app.main:app --reload
```
API : http://localhost:8000 · Documentation interactive : **http://localhost:8000/docs**

**Frontend** (terminal 2) :
```bash
cd frontend
npm install
npm run dev
```
Application : http://localhost:5173

### Comptes de démonstration

| Identifiant | Mot de passe | Rôle |
|---|---|---|
| `admin` | `admin123` | Super administrateur |
| `pasteur` | `pasteur123` | Pasteur |
| `accueil` | `accueil123` | Responsable Accueil |

⚠️ Les données de démonstration (personnes, campus…) sont **fictives**. En production : mettre `SEED_DEMO_DATA=false`, changer `SECRET_KEY` et le mot de passe `admin`, et passer `afficherComptesDemo` à `false` dans `frontend/src/config/site.js`.

### Mode « tout-en-un » (comme en ligne)
```bash
cd frontend && npm run build      # compile le site dans frontend/dist
cd ../backend && uvicorn app.main:app   # sert le site ET l'API sur http://localhost:8000
```

### Tests
```bash
cd backend && pytest
```

## Organisation du code

```
backend/
  app/
    constants.py     ← ⭐ listes : étapes du parcours, départements, statuts, rôles…
    models.py        ← tables de la base (Fidele au centre)
    schemas.py       ← formats des données de l'API
    routers/         ← un fichier par module (fideles.py, familles.py, discipolat.py…)
    historique.py    ← trace chaque action dans l'historique du fidèle
    seed.py          ← données initiales / démo
    main.py          ← point d'entrée
  tests/
frontend/
  src/
    config/site.js          ← ⭐ nom de l'Église, vision, annonce
    config/accueil.js       ← ⭐ contenu de la page d'accueil (modules, parcours, avantages, accès directs)
    pages/                  ← une page par écran
    components/             ← composants réutilisables (Layout, formulaires, tableaux)
    lib/api.js              ← appels au backend
Dockerfile           ← image tout-en-un pour la mise en ligne
render.yaml          ← configuration Render
.devcontainer/       ← configuration GitHub Codespaces
```

👉 Voir **[docs/GUIDE_MODIFICATION.md](docs/GUIDE_MODIFICATION.md)** pour les modifications courantes, pas à pas,
et **[CONTRIBUTING.md](CONTRIBUTING.md)** pour travailler à plusieurs sur GitHub.
