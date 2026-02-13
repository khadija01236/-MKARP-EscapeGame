# MKARP : The Unit-Test Gauntlet

Escape Game de programmation pour le Capitole du Libre.

## Concept

Réparer un système en perdition en moins de 10 minutes via des exercices de code validés par tests unitaires.

## Installation (Mode Développeur)

## Lancer le projet en 1 commande

Depuis la racine :

`npm run install:all`

`npm run dev`

Note: si le port 5173 est déjà utilisé, Vite choisit automatiquement un autre port (ex: 5174).

### 1) Build de la sandbox Python (pytest)

Depuis la racine du projet :

`docker build -t kramp-sandbox -f sandbox/Dockerfile sandbox`

### 2) Backend (Node + Docker runner)

`cd app/backend`

`npm install`

`npm run start`

Par défaut, le backend écoute sur `http://localhost:5000`.

Variables utiles :

- `PORT` (défaut: 5000)
- `DOCKER_IMAGE` (défaut: `kramp-sandbox`)
- `MAX_CODE_CHARS` (défaut: 100000)

### 3) Frontend (Vite)

Dans un autre terminal :

`cd app/frontend`

`npm install`

`npm run dev`

Optionnel : définir `VITE_BACKEND_URL` (défaut: `http://localhost:5000`).

## Technologies

- Frontend: React / Monaco Editor
- Backend: Node.js
- Sandbox: Docker (Python)
