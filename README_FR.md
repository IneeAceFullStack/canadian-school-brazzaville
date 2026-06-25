# École Canadienne — Plateforme de Gestion Scolaire

> Application web full-stack pour la gestion des inscriptions, dossiers académiques, emplois du temps et paiements d'une école privée à référentiel pédagogique canadien.

![Stack technique](https://img.shields.io/badge/stack-React%20%7C%20Express%20%7C%20PostgreSQL-blue)
![Licence](https://img.shields.io/badge/licence-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
![Statut](https://img.shields.io/badge/statut-prêt%20production-success)

---

## Table des matières

1. [Contexte et problème résolu](#contexte-et-problème-résolu)
2. [Objectifs du projet](#objectifs-du-projet)
3. [Fonctionnalités principales](#fonctionnalités-principales)
4. [Technologies utilisées](#technologies-utilisées)
5. [Architecture](#architecture)
6. [Structure du projet](#structure-du-projet)
7. [Modèle de données](#modèle-de-données)
8. [Authentification et sécurité](#authentification-et-sécurité)
9. [Endpoints API](#endpoints-api)
10. [Prérequis](#prérequis)
11. [Installation](#installation)
12. [Configuration de l'environnement](#configuration-de-lenvironnement)
13. [Utilisation](#utilisation)
14. [Défis techniques rencontrés](#défis-techniques-rencontrés)
15. [Optimisations réalisées](#optimisations-réalisées)
16. [Améliorations futures](#améliorations-futures)
17. [Auteur](#auteur)

---

## Contexte et problème résolu

L'École Canadienne est un établissement privé fonctionnant selon un référentiel pédagogique canadien. Avant ce projet, l'administration gérait l'ensemble de ses opérations à travers des tableurs Excel et des processus papier : fiches d'inscription manuscrites, carnets de paiement, relevés de notes transmis à la main, sans aucune présence web institutionnelle.

Les problèmes étaient chroniques et bien identifiés : doublons de saisie lors des périodes de réinscription, impossibilité de suivre les soldes impayés en temps réel, notes remises sur papier par les enseignants avant d'être consolidées manuellement par la direction, et une absence totale d'interface publique permettant aux parents de s'informer ou d'initier une inscription en ligne.

J'ai conçu cette plateforme pour remplacer ce fonctionnement fragmenté par un système unifié et différencié par rôle, couvrant l'ensemble du cycle de vie d'un élève — du formulaire d'inscription rempli à domicile par un parent jusqu'au rapport financier mensuel consulté par le directeur.

---

## Objectifs du projet

- Numériser le cycle complet de l'élève : inscription → admission → actif → archivé
- Proposer des tableaux de bord différenciés selon le rôle : administrateur, enseignant, élève
- Automatiser le suivi des paiements avec génération de reçus PDF
- Remplacer les bulletins papier par un système de saisie de notes structuré par trimestre
- Offrir à l'école une présence web professionnelle avec formulaire d'inscription en ligne
- Centraliser les annonces et la communication institutionnelle

---

## Fonctionnalités principales

### Site public

| Fonctionnalité | Description |
|----------------|-------------|
| **Page d'accueil** | Section hero, statistiques dynamiques, présentation des programmes, témoignages |
| **Page À propos** | Histoire de l'école, valeurs, équipe de direction avec modals de biographie |
| **Page Programmes** | Cursus de la Maternelle au Lycée avec filières et spécialités |
| **Vie scolaire** | Activités parascolaires et galerie d'infrastructures avec modals de détail |
| **Actualités / Blog** | Fil d'annonces avec vue détaillée de chaque article |
| **Formulaire de contact** | Prise de contact publique redirigée vers l'administration |
| **Inscription en ligne** | Formulaire d'inscription en 4 étapes avec validation email |
| **Réinscription** | Recherche de l'élève existant + confirmation de réinscription |

### Tableau de bord administrateur

| Fonctionnalité | Description |
|----------------|-------------|
| **Vue d'ensemble** | Graphique des encaissements mensuels (Recharts), taux d'inscription, indicateurs clés |
| **Gestion des élèves** | CRUD complet avec recherche, pagination et affichage du solde restant dû |
| **Gestion des enseignants** | Fiches enseignants liées aux classes assignées |
| **Gestion des inscriptions** | Workflow d'inscription multi-étapes avec filtres par statut |
| **Gestion des paiements** | Saisie, confirmation, filtres par statut, génération de reçus PDF |
| **Gestion des notes** | Saisie par matière, classe et trimestre avec prise en compte du coefficient |
| **Emploi du temps** | Constructeur de grille hebdomadaire par classe, affiché jour par jour |
| **Annonces** | Création et publication d'annonces visibles sur le site public |
| **Statistiques** | Taux d'inscription, récapitulatifs financiers, ventilation mensuelle |

### Portail enseignant

| Fonctionnalité | Description |
|----------------|-------------|
| **Tableau de bord** | Statistiques par classe et notes récemment saisies |
| **Saisie des notes** | Interface de soumission par matière et par trimestre |

### Portail élève

| Fonctionnalité | Description |
|----------------|-------------|
| **Tableau de bord** | Vue d'ensemble académique personnelle |
| **Mes notes** | Moyennes trimestrielles avec pondération par coefficient |
| **Mon emploi du temps** | Grille hebdomadaire de cours |

---

## Technologies utilisées

### Frontend

| Outil | Version | Usage |
|-------|---------|-------|
| React | 18.x | Bibliothèque de composants UI |
| Vite | 5.x | Bundler et serveur de développement |
| TypeScript | 5.x | Typage statique sur l'ensemble du frontend |
| TailwindCSS | 3.x | Styles utilitaires — couleur principale : Rouge Grenat `#9B1C1C` |
| React Router DOM | 6.x | Routage côté client avec routes protégées |
| Axios | 1.x | Client HTTP avec service API centralisé |
| Recharts | 2.x | Graphique des encaissements mensuels |
| jsPDF | 2.x | Génération de reçus PDF côté client |
| React Hook Form | — | Gestion de l'état des formulaires |
| React Hot Toast | — | Notifications de succès et d'erreur |

### Backend

| Outil | Version | Usage |
|-------|---------|-------|
| Node.js | 20.x | Environnement d'exécution |
| Express | 4.x | Serveur HTTP et routage |
| TypeScript | 5.x | Code serveur typé |
| JSON Web Tokens (JWT) | — | Authentification sans état |
| Bcrypt | — | Hachage des mots de passe |
| Helmet | — | En-têtes HTTP de sécurité |
| CORS | — | Gestion des requêtes cross-origin |
| express-rate-limit | — | Limitation de taux sur les routes d'authentification |

### Base de données

| Outil | Usage |
|-------|-------|
| PostgreSQL | Base de données relationnelle principale |
| Prisma ORM | Définition du schéma, migrations et requêtes typées |

---

## Architecture

L'application adopte une architecture monolithique classique avec une séparation claire frontend/backend, reliés via une API REST. J'ai délibérément écarté les microservices : l'école ne dispose pas d'équipe technique dédiée, et la maintenabilité compte autant que les performances dans ce contexte.

```
┌─────────────────────────────────────────────────────┐
│                    NAVIGATEUR CLIENT                  │
│                                                       │
│   React SPA (Vite)                                    │
│   ├── Site public (non authentifié)                   │
│   ├── Tableau de bord admin (rôle : admin)            │
│   ├── Portail enseignant (rôle : teacher)             │
│   └── Portail élève (rôle : student)                 │
└───────────────────┬─────────────────────────────────-┘
                    │ HTTPS / REST
                    ▼
┌─────────────────────────────────────────────────────┐
│                 SERVEUR API EXPRESS                   │
│                                                       │
│   Pile middleware :                                   │
│   Helmet → CORS → Rate Limiter → JSON parser          │
│   → Auth JWT → Garde de rôle → Gestionnaire de route │
│   → Gestionnaire d'erreurs global                     │
│                                                       │
│   Modules de routes :                                 │
│   /api/auth   /api/students   /api/teachers           │
│   /api/grades /api/payments   /api/inscriptions       │
│   /api/schedule /api/announcements /api/contact       │
│   /api/stats                                          │
└───────────────────┬─────────────────────────────────-┘
                    │ Prisma ORM
                    ▼
┌─────────────────────────────────────────────────────┐
│                 BASE DE DONNÉES POSTGRESQL             │
│                                                       │
│   Users · Students · Parents · Teachers              │
│   Grades · Payments · Inscriptions · Schedule        │
│   Announcements · ContactMessages                    │
└─────────────────────────────────────────────────────┘
```

### Pourquoi ces choix d'architecture ?

J'ai opté pour un monorepo avec `frontend/` et `backend/` séparés plutôt que deux dépôts distincts. Cela simplifie le déploiement pour un établissement sans ingénieur DevOps — un seul `git pull` et `npm run build` suffit à mettre à jour l'ensemble de l'application.

Prisma a été préféré à une couche SQL brute ou à un ORM plus léger pour son système de migrations, qui offre aux futurs mainteneurs un historique versionné et lisible de chaque évolution du schéma. Les types TypeScript générés automatiquement permettent de détecter les inadéquations de données à la compilation, ce qui compte particulièrement dans un contexte où des développeurs non spécialisés peuvent être amenés à intervenir ponctuellement.

---

## Structure du projet

```
ecole-canadienne/
│
├── frontend/
│   ├── src/
│   │   ├── assets/                  # Logo, images
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AdminLayout.tsx   # Sidebar admin + navigation
│   │   │       ├── StudentLayout.tsx
│   │   │       ├── TeacherLayout.tsx
│   │   │       ├── Navbar.tsx        # Navigation publique (responsive mobile)
│   │   │       └── Footer.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Stockage JWT, redirect par rôle, expiration token
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminStudents.tsx
│   │   │   │   ├── AdminTeachers.tsx
│   │   │   │   ├── AdminInscriptions.tsx
│   │   │   │   ├── AdminPayments.tsx
│   │   │   │   ├── AdminGrades.tsx
│   │   │   │   ├── AdminSchedule.tsx
│   │   │   │   └── AdminAnnouncements.tsx
│   │   │   ├── teacher/
│   │   │   │   ├── TeacherDashboard.tsx
│   │   │   │   └── TeacherGrades.tsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.tsx
│   │   │   │   ├── StudentGrades.tsx
│   │   │   │   └── StudentSchedule.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ProgramsPage.tsx
│   │   │   ├── VieScolairePage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── BlogDetailPage.tsx
│   │   │   ├── InscriptionPage.tsx
│   │   │   ├── ReinscriptionPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── services/
│   │   │   └── api.ts                # Instance Axios + formatDate + formatMontant
│   │   ├── types/
│   │   │   └── index.ts              # Interfaces TypeScript partagées
│   │   ├── utils/
│   │   │   └── formatters.ts
│   │   ├── App.tsx                   # Router + wrappers de routes protégées
│   │   └── index.css                 # Base TailwindCSS + variables personnalisées
│   ├── tailwind.config.js            # Couleur primaire : Rouge Grenat #9B1C1C
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts             # Client Prisma singleton
│   │   ├── middleware/
│   │   │   ├── auth.ts               # Vérification JWT + garde de rôle
│   │   │   └── errorHandler.ts       # Gestionnaire d'erreurs global
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── students.ts
│   │   │   ├── teachers.ts
│   │   │   ├── grades.ts
│   │   │   ├── payments.ts
│   │   │   ├── inscriptions.ts
│   │   │   ├── schedule.ts
│   │   │   ├── announcements.ts
│   │   │   ├── contact.ts
│   │   │   └── stats.ts
│   │   └── index.ts                  # Bootstrap de l'application Express
│   ├── prisma/
│   │   ├── schema.prisma             # Source de vérité pour tous les modèles
│   │   ├── seed.ts                   # Comptes de démonstration + données d'exemple
│   │   └── migrations/
│   ├── .env.example
│   └── package.json
│
├── README.md
└── README_FR.md
```

---

## Modèle de données

Le schéma a évolué de façon itérative, avec des modèles ajoutés au fil des fonctionnalités plutôt que d'être figé dès le départ.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hachage bcrypt — jamais exposé dans les réponses API
  role      Role     // ADMIN | TEACHER | STUDENT
  createdAt DateTime @default(now())
}

model Student {
  id            Int           @id @default(autoincrement())
  nom           String
  prenom        String
  dateNaissance DateTime
  classe        String
  anneeScolaire String
  statut        StatutEleve
  parents       Parent[]
  payments      Payment[]
  grades        Grade[]
  inscriptions  Inscription[]
}

model Parent {
  id        Int     @id @default(autoincrement())
  nom       String
  prenom    String
  telephone String
  email     String?
  student   Student @relation(fields: [studentId], references: [id])
  studentId Int
}

model Teacher {
  id       Int    @id @default(autoincrement())
  nom      String
  prenom   String
  matiere  String
  email    String @unique
}

model Grade {
  id          Int     @id @default(autoincrement())
  valeur      Float
  matiere     String
  trimestre   Int     // 1, 2 ou 3
  coefficient Float   @default(1)
  student     Student @relation(fields: [studentId], references: [id])
  studentId   Int
}

model Payment {
  id        Int            @id @default(autoincrement())
  montant   Float
  reference String?
  statut    StatutPaiement // CONFIRME | EN_ATTENTE | ANNULE
  type      String         // INSCRIPTION | SCOLARITE | AUTRE
  date      DateTime       @default(now())
  student   Student        @relation(fields: [studentId], references: [id])
  studentId Int
}

model Inscription {
  id            Int               @id @default(autoincrement())
  type          TypeInscription   // NOUVELLE | REINSCRIPTION
  statut        StatutInscription
  anneeScolaire String
  student       Student           @relation(fields: [studentId], references: [id])
  studentId     Int
  createdAt     DateTime          @default(now())
}

model Schedule {
  id         Int    @id @default(autoincrement())
  classe     String
  jour       String
  heureDebut String
  heureFin   String
  matiere    String
  teacher    String
}

model Announcement {
  id        Int      @id @default(autoincrement())
  titre     String
  contenu   String
  publie    Boolean  @default(false)
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        Int      @id @default(autoincrement())
  nom       String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

---

## Authentification et sécurité

L'authentification repose entièrement sur des tokens JWT stockés en localStorage côté client. J'ai choisi une approche sans état (stateless) plutôt qu'une gestion de sessions serveur pour conserver la scalabilité du backend sans exiger de stockage de session partagé.

### Flux d'authentification

1. L'utilisateur soumet ses identifiants → `POST /api/auth/login`
2. Le serveur vérifie le mot de passe avec bcrypt, génère un JWT contenant `{ id, email, role }`
3. Le client stocke le token et l'envoie en en-tête `Authorization: Bearer <token>` sur chaque requête
4. Le middleware `auth.ts` décode et valide le token sur les routes protégées
5. Le middleware de garde de rôle (`verifyRole`) vérifie `req.user.role` face au niveau de permission requis
6. `AuthContext.tsx` intercepte les réponses 401 et vide le token pour prévenir les sessions fantômes

### Mesures de sécurité

| Mesure | Mise en œuvre |
|--------|--------------|
| Hachage des mots de passe | bcrypt avec salt dynamique |
| En-têtes HTTP | Helmet (X-Content-Type-Options, X-Frame-Options, HSTS, etc.) |
| Limitation de taux | `express-rate-limit` appliqué exclusivement sur `/api/auth/*` |
| Politique CORS | Liste blanche d'origines explicite, credentials autorisés uniquement pour les origines connues |
| Contrôle d'accès par rôle | Système à trois niveaux appliqué côté serveur sur chaque route protégée |
| Validation des entrées | Contraintes du schéma Prisma + vérifications au niveau de chaque route |
| Expiration du token | JWT à durée de vie courte ; le client détecte l'expiration et force la reconnexion |
| Filtrage des annonces | Côté serveur uniquement — `publie: true` obligatoire pour l'API publique |

---

## Endpoints API

### Authentification

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/auth/login` | Public | Connexion, retourne un JWT |
| GET | `/api/auth/me` | Authentifié | Profil de l'utilisateur courant |
| PUT | `/api/auth/password` | Authentifié | Changement de mot de passe |

### Élèves

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/students` | Admin | Liste avec recherche + pagination |
| POST | `/api/students` | Admin | Créer un élève |
| PUT | `/api/students/:id` | Admin | Mettre à jour un élève |
| DELETE | `/api/students/:id` | Admin | Supprimer (cascade sécurisée) |

### Enseignants

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/teachers` | Admin | Liste de tous les enseignants |
| POST | `/api/teachers` | Admin | Créer un enseignant |
| PUT | `/api/teachers/:id` | Admin | Mettre à jour un enseignant |
| DELETE | `/api/teachers/:id` | Admin | Supprimer un enseignant |

### Notes

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/grades` | Admin / Enseignant | Toutes les notes (filtrables) |
| GET | `/api/grades/student/:id` | Admin / Élève | Notes d'un élève |
| POST | `/api/grades` | Admin / Enseignant | Saisir une note |
| PUT | `/api/grades/:id` | Admin / Enseignant | Modifier une note |

### Paiements

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/payments` | Admin | Liste avec filtre par statut |
| POST | `/api/payments` | Admin | Enregistrer un paiement |
| PUT | `/api/payments/:id/confirm` | Admin | Confirmer un paiement |

### Inscriptions

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/inscriptions` | Admin | Liste avec filtre par statut |
| POST | `/api/inscriptions` | Public / Admin | Soumettre une inscription |
| PUT | `/api/inscriptions/:id` | Admin | Mettre à jour le statut |

### Emploi du temps

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/schedule` | Authentifié | Emploi du temps (filtrable par classe) |
| POST | `/api/schedule` | Admin | Créer une entrée |
| DELETE | `/api/schedule/:id` | Admin | Supprimer une entrée |

### Statistiques (Administrateur uniquement)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/stats` | Taux d'inscription, totaux financiers, ventilation mensuelle des encaissements |

### Annonces

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/announcements` | Public | Annonces publiées uniquement |
| GET | `/api/announcements/all` | Admin | Toutes les annonces y compris brouillons |
| POST | `/api/announcements` | Admin | Créer une annonce |
| PUT | `/api/announcements/:id` | Admin | Publier / mettre à jour |

---

## Prérequis

- **Node.js** ≥ 18.x
- **PostgreSQL** ≥ 14
- **npm** ou **yarn**

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/IneeAceFullStack/canadian-school-brazzaville.git
cd canadian-school-brazzaville

# 2. Installer les dépendances frontend
cd frontend && npm install

# 3. Installer les dépendances backend
cd ../backend && npm install

# 4. Configurer les variables d'environnement (voir ci-dessous)
cp .env.example .env

# 5. Exécuter les migrations de base de données
npx prisma migrate deploy

# 6. Alimenter la base avec les comptes de démonstration
npx ts-node prisma/seed.ts
```

---

## Configuration de l'environnement

Créer `backend/.env` à partir du fichier exemple fourni :

```env
# Base de données
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/ecole_canadienne"

# Authentification
JWT_SECRET="votre-clé-secrète-robuste-ici"
JWT_EXPIRES_IN="24h"

# Serveur
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"
```

Créer `frontend/.env` :

```env
VITE_API_URL="http://localhost:5000/api"
```

---

## Utilisation

### Développement

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### Production

```bash
# Build du frontend
cd frontend && npm run build

# Démarrer le backend
cd backend && npm start
```

### Comptes de démonstration (après exécution du seed)

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Administrateur | admin@ecole-canadienne.com | Admin@2025 |
| Enseignant | prof@ecole-canadienne.com | Teacher@2025 |
| Élève | eleve@ecole-canadienne.com | Student@2025 |

---

## Défis techniques rencontrés

### Suppression en cascade avec des paiements liés

L'un des premiers bugs réels a été une erreur 500 lors de la tentative de suppression d'un élève ayant des paiements associés. Le comportement par défaut de Prisma lève une violation de clé étrangère dans ce cas. J'ai résolu le problème en introduisant une vérification préalable à la suppression : la route interroge d'abord les paiements liés, puis bloque l'opération ou effectue la cascade selon le statut du paiement. Une logique explicite, sans comportement implicite.

### Calcul de moyenne avec coefficients

Le calcul initial était une moyenne arithmétique simple, ce qui produisait des résultats incorrects lorsque les matières avaient des coefficients différents. J'ai corrigé cela avec une moyenne pondérée : `Σ(note × coefficient) / Σ(coefficient)`. La correction a été apportée dans `StudentGrades.tsx` et impacte l'affichage des récapitulatifs trimestriels.

### Gestion de l'expiration du token JWT

En phase de test, les utilisateurs continuaient à recevoir des données en silence après l'expiration de leur token JWT, parce que l'intercepteur Axios ne traitait pas correctement les réponses 401. J'ai ajouté un intercepteur de réponse dans `api.ts` qui vide le localStorage et redirige vers la page de connexion sur tout retour 401, éliminant le problème de "session fantôme".

### Génération PDF avec une référence vide

Le générateur de reçus jsPDF levait une erreur à l'exécution lorsque le champ référence du paiement était vide — il tentait d'afficher `undefined` comme chaîne. J'ai ajouté un fallback systématique : `reference || 'N/A'` sur tous les champs avant leur transmission à jsPDF.

### CORS en développement

En développement, le frontend sur le port 5173 était bloqué par la politique CORS d'Express configurée pour la production. J'ai ajouté une origine conditionnelle selon l'environnement, autorisant `localhost:5173` quand `NODE_ENV=development`, sans assouplir la politique en production.

---

## Optimisations réalisées

- **Sélections Prisma explicites** : Au lieu de laisser Prisma retourner des objets de modèle complets (incluant les hachages de mots de passe, les relations lourdes), toutes les requêtes de liste utilisent `select` pour ne retourner que les champs réellement nécessaires. Cela a sensiblement réduit la taille des payloads sur les listes d'élèves et de paiements.
- **Pagination côté serveur** : La route de liste des élèves accepte des paramètres `?page=` et `?limit=`, évitant le renvoi de toute la table pour un filtrage côté client.
- **Rate limiting ciblé sur les routes d'authentification** : Plutôt qu'une limitation globale (qui affecterait le site public), j'ai scopé `express-rate-limit` exclusivement sur `/api/auth/*`. Cela protège contre les attaques par force brute sans surcharge inutile sur les endpoints publics à lecture intensive.
- **Filtrage des annonces non publiées côté serveur** : L'endpoint public des annonces applique `WHERE publie = true` au niveau de la base de données, et non en JavaScript. Une version antérieure récupérait tous les enregistrements et filtrait en mémoire — corrigé dès que le volume d'annonces l'a rendu visible.
- **Chargement paresseux des composants React** : Les pages publiques, potentiellement volumineuses avec images et modals, sont découpées via `React.lazy()` et `Suspense` pour alléger le bundle initial.

---

## Améliorations futures

Voici les évolutions que j'envisagerais si le projet entrait en développement actif :

- **Notifications par email** : Envoyer des confirmations aux parents lors de l'approbation d'une inscription ou de l'enregistrement d'un paiement. Cela nécessiterait une intégration SMTP (Nodemailer + un fournisseur transactionnel comme Brevo ou Postmark).
- **Génération automatique de bulletins** : Bulletins PDF par élève et par trimestre, regroupant toutes les matières, les moyennes et les appréciations des enseignants dans un document mis en forme.
- **Portail parents** : Actuellement, les parents n'ont pas d'accès direct. Un rôle parent en lecture seule permettrait de consulter les notes, l'emploi du temps et le solde de leur enfant sans passer par l'administration.
- **Tableaux de bord temps réel via WebSocket** : Notification en temps réel lors d'une nouvelle inscription ou de la confirmation d'un paiement, plutôt que le rechargement manuel actuel du tableau de bord administrateur.
- **Journal d'audit** : Historique horodaté des modifications (notes corrigées, paiements confirmés) pour des raisons de conformité et de traçabilité.
- **Support multi-établissement** : Le modèle de données suppose actuellement un seul établissement. Une architecture multi-tenant avec données scopées par école permettrait à la même plateforme de servir plusieurs institutions.
- **Tests automatisés** : Les tests unitaires du calcul des moyennes et les tests d'intégration du flux d'authentification sont les manques les plus critiques. Le backend ne dispose d'aucune couverture de tests automatisés.

---

## Compétences techniques démontrées

Ce projet illustre la capacité à :

- Concevoir et implémenter une API REST complète avec Express et TypeScript
- Modéliser des données relationnelles complexes avec Prisma et PostgreSQL
- Mettre en place une authentification JWT sécurisée avec gestion des rôles
- Développer une application React avec routage protégé et contexte d'authentification
- Appliquer des mesures de sécurité concrètes (Helmet, rate limiting, CORS, bcrypt)
- Générer des documents PDF côté client avec jsPDF
- Construire une interface responsive mobile avec TailwindCSS
- Livrer un projet complet, documenté et prêt à l'emploi en environnement réel

---

## Auteur

**Pascale Perspicasse Destinée OLOLO**  
Développeuse Full-Stack — Node.js · React · PostgreSQL  

📧 [ololoppd@gmail.com](mailto:ololoppd@gmail.com)  
🔗 [Pascale Pesrpicasse Destinée OLOLO](https://www.linkedin.com/in/pascale-perspicasse-destinée-ololo-07474b374)  
🐙 [IneeAceFullStack](https://github.com/IneeAceFullStack)  

---

*Projet développé entre novembre 2025 et juin 2026. La version 1.0.0 est prête pour la production et en ligne sur [canadian-school-brazzaville.vercel.app](https://canadian-school-brazzaville.vercel.app) .*
