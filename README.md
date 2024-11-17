# Tp_API_REST

## Description

Ce projet est une application **Node.js** utilisant **TypeScript** et **Express** pour créer un serveur API REST. Il est structuré avec des dossiers pour les contrôleurs, les services, les modèles, et utilise Postman pour les tests.

## Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/en/) (v12 ou supérieure)
- [npm](https://www.npmjs.com/)

## Installation

1. Clonez le projet :

   ```bash
   git clone https://github.com/2060485/Tp_API_REST.git
   cd mon-projet-express-typescript

   ```

2. Installez les dépendances du projet :

   ```bash
   npm install
   ```

## Configuration

Créez un fichier `.env` à la racine du projet pour stocker les variables d'environnement, par exemple :

```bash
PORT=3000
JWT_SECRET=votre_secret_jwt
```

## Scripts disponibles

- **Démarrer le projet en développement :**

   ```bash
   npm run start
   ```

   Utilise `ts-node-dev` pour démarrer le serveur avec hot-reload.

## Structure du projet

Voici la structure des dossiers du projet :

```
├── certs                                 # Clés permettant une connexion HTTPS
├── logs                                  # Logs des opérations /GET /POST /PUT /DELETE
├── src/
│   ├── controllers/                      # Contrôleurs Express pour gérer les routes
│   ├── interfaces/                       # Interfaces TypeScript
│   ├── middlewares/                      # Middlewares Express
│   ├── models/                           # Modèles de données
│   ├── routes/                           # Définition des routes Express
│   ├── services/                         # Services pour la logique métier
│   ├── utils/                            # Utilitaires du projet
│   ├── app.ts                            # Configuration de l'application Express
├── tests/
│   ├── test-load.yaml                    # Test de performance
│   ├── test.ts                           # Tests de fonctionalité et sécurité
│   ├── TestsAPI.postman_collection.json  # Tests postman
├── package.json                          # Fichier de configuration des dépendances et scripts
├── tsconfig.json                         # Configuration de TypeScript
```

## Démarrage

1. Démarrez le serveur avec la commande suivante :

   ```bash
   npm run start
   ```

2. Par défaut, le serveur est disponible sur [http://localhost:3000](http://localhost:3000).

## Tests

Pour exécuter les tests avec Postman, ouvrez l'application Postman et importer un nouvelle collection avec le fichier `TestsAPI.postman_collection.json` situé dans le dossier `tests/`.

V2 : 
   ```bash
      npm run test
   ```

Puisque je n'ai pas réussi à faire les tests avec artillery avec https, il faut modifier .env afin d'y ajouter:

```bash
PERF=true
```

Ensuite, lancer le serveur avec npm start et lancer les tests de performance avec:

```bash
npx artillery run ./tests/test-load.yaml
```
