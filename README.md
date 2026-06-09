# École Canadienne Canadian School — Plateforme Web Complète

Site web complet avec gestion scolaire intégrée : inscriptions, paiements, notes, emploi du temps et portails élèves/enseignants.

---

## 🎨 Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite + TailwindCSS |
| Backend | Express 4 + TypeScript |
| Base de données | PostgreSQL + Prisma ORM |
| Auth | JWT (rôles : admin, teacher, student, parent) |
| PDF | jsPDF (reçus de paiement) |
| Graphiques | Recharts |
| Validation | Zod |

---

## 📁 Structure du projet

```
ecole-canadienne/
├── frontend/
│   ├── src/
│   │   ├── components/layout/    # Navbar, Footer, AdminLayout, StudentLayout, TeacherLayout
│   │   ├── context/              # AuthContext (JWT)
│   │   ├── services/api.ts       # Client Axios + tous les endpoints
│   │   └── pages/
│   │       ├── HomePage.tsx          # Accueil avec hero, stats, programmes, témoignages
│   │       ├── AboutPage.tsx         # Histoire, valeurs, équipe
│   │       ├── ProgramsPage.tsx      # Maternelle → Terminale + spécialités
│   │       ├── InscriptionPage.tsx   # Formulaire multi-étapes (4 étapes)
│   │       ├── ReinscriptionPage.tsx # Recherche élève → vérification → confirmation
│   │       ├── VieScolairePage.tsx   # Clubs, infrastructures, règlement
│   │       ├── BlogPage.tsx          # Actualités scolaires
│   │       ├── ContactPage.tsx       # Formulaire + réseaux sociaux
│   │       ├── auth/LoginPage.tsx    # Connexion avec comptes demo
│   │       ├── admin/                # Dashboard, Élèves, Enseignants, Paiements (PDF), Notes, EDT, Annonces, Inscriptions
│   │       ├── student/              # Dashboard, Notes, Emploi du temps
│   │       └── teacher/              # Dashboard, Saisie des notes
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma         # Tous les modèles (User, Student, Parent, Teacher, Grade, Payment, Schedule, Announcement, ContactMessage)
│   │   └── seed.ts               # Données initiales + comptes de démonstration
│   ├── src/
│   │   ├── index.ts              # Serveur Express, middleware, routes
│   │   ├── lib/prisma.ts         # Instance Prisma
│   │   ├── middleware/
│   │   │   ├── auth.ts           # authenticate + authorize (JWT)
│   │   │   └── errorHandler.ts
│   │   └── routes/
│   │       ├── auth.ts           # login, me, register, change-password
│   │       ├── students.ts       # CRUD + recherche
│   │       ├── teachers.ts       # CRUD
│   │       ├── inscriptions.ts   # Nouvelle inscription + réinscription
│   │       ├── payments.ts       # Gestion + confirmation + refus
│   │       ├── grades.ts         # Notes par élève/classe/trimestre
│   │       ├── schedule.ts       # Emploi du temps
│   │       ├── announcements.ts  # Annonces (publiques + admin)
│   │       ├── stats.ts          # Statistiques dashboard admin
│   │       └── contact.ts        # Formulaire de contact
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── README.md
```

---

## 🚀 Installation locale rapide

### Prérequis
- Node.js 18+ 
- PostgreSQL installé localement

### 1. Backend

```bash
cd backend
cp .env.example .env
# Éditer .env : remplir DATABASE_URL et JWT_SECRET

npm install
npx prisma generate
npx prisma db push         # Crée les tables
npx ts-node prisma/seed.ts # Insère les données de test
npm run dev                # Démarre sur http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev   # Démarre sur http://localhost:3000
```

### Comptes de démonstration

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|-------|
| Admin | admin@ecole.cg | admin123 | /admin |
| Enseignant | prof@ecole.cg | prof123 | /professeur |
| Élève | eleve@ecole.cg | eleve123 | /eleve |

---

## 🌐 Déploiement gratuit : Neon + Render + Vercel

### Étape 1 — Base de données : Neon PostgreSQL (gratuit)

1. Aller sur **[neon.tech](https://neon.tech)** → Créer un compte
2. Cliquer **New Project** → Nommer le projet `ecole-canadienne`
3. Copier la **Connection string** (format `postgresql://user:pwd@ep-xxx.neon.tech/ecole_canadienne`)
4. Coller dans le fichier `.env` du backend sous `DATABASE_URL`

---

### Étape 2 — Backend : Render (gratuit)

1. Aller sur **[render.com](https://render.com)** → Créer un compte
2. **New > Web Service** → Connecter votre dépôt GitHub (pusher le dossier `backend/`)
3. Configurer :
   - **Build Command** : `npm install && npx prisma generate && npx prisma db push`
   - **Start Command** : `npm run build && node dist/index.js`
   - **Runtime** : Node
4. Ajouter les **Environment Variables** :
   ```
   DATABASE_URL     = [URL Neon copiée à l'étape 1]
   JWT_SECRET       = [chaîne aléatoire, ex: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]
   JWT_EXPIRES_IN   = 7d
   NODE_ENV         = production
   PORT             = 10000
   CORS_ORIGIN      = https://votre-site.vercel.app
   ```
5. Déployer → Notez l'URL (ex: `https://ecole-canadienne-api.onrender.com`)
6. **Seed (une seule fois)** — dans le Shell de Render :
   ```bash
   npx ts-node prisma/seed.ts
   ```

---

### Étape 3 — Frontend : Vercel (gratuit)

1. Aller sur **[vercel.com](https://vercel.com)** → Créer un compte
2. **Add New Project** → Importer votre dépôt (dossier `frontend/`)
3. Configurer :
   - **Framework** : Vite
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. Ajouter la variable d'environnement :
   ```
   VITE_API_URL = https://ecole-canadienne-api.onrender.com
   ```
5. Déployer → Vercel fournit une URL (ex: `https://ecole-canadienne.vercel.app`)
6. Retourner sur **Render** → Mettre à jour `CORS_ORIGIN` avec cette URL Vercel

---

### Résultat final

```
Frontend  → https://ecole-canadienne.vercel.app       (Vercel, gratuit)
Backend   → https://ecole-canadienne-api.onrender.com (Render, gratuit)
Database  → Neon PostgreSQL                           (Neon, gratuit)
```

---

## ✨ Fonctionnalités complètes

### Pages publiques (accessibles sans connexion)
- 🏠 **Accueil** — Hero animé, statistiques, programmes, témoignages, CTA
- 📖 **À propos** — Histoire 20 ans, valeurs, équipe de direction
- 🎓 **Programmes** — Maternelle/Primaire/Collège/Lycée avec spécialités détaillées
- 📝 **Inscription** — Formulaire 4 étapes avec sélection spécialités (max 3 pour 1ère/Terminale)
- 🔄 **Réinscription** — Recherche par nom/ID → vérification passage → confirmation → succès
- 🌟 **Vie scolaire** — Clubs, activités, infrastructures, règlement
- 📰 **Actualités** — Blog avec catégories et filtres
- 📞 **Contact** — Formulaire + Facebook/Instagram/WhatsApp + carte

### Portail Admin (/admin)
- 📊 **Dashboard** — KPIs, graphiques (Recharts), effectif par classe, paiements
- 👥 **Élèves** — Liste + recherche + CRUD complet + filtre par classe
- 👩‍🏫 **Enseignants** — Cartes avec matières et classes assignées
- 📋 **Inscriptions** — Vue des demandes, acceptation/refus
- 💳 **Paiements** — Confirmation/refus + génération reçu PDF (jsPDF, rouge professionnel)
- ⭐ **Notes** — Saisie par élève/matière/trimestre + mentions automatiques
- 📅 **Emploi du temps** — Grille hebdomadaire par classe + ajout/suppression créneaux
- 📢 **Annonces** — Création/édition/suppression avec priorité et destinataires

### Espace Élève (/eleve)
- 📊 **Dashboard** — Cours du jour, annonces récentes, aperçu des notes
- ⭐ **Notes** — Par trimestre avec barre de progression, mention, moyenne générale
- 🗓️ **Emploi du temps** — Grille hebdomadaire avec jour actuel surligné

### Espace Enseignant (/professeur)
- 📊 **Dashboard** — Statistiques, rappels, accès rapide
- ⭐ **Notes** — Saisie et suppression des notes par classe et trimestre

---

## 🛡️ Sécurité

- JWT avec expiration configurable
- Helmet.js (en-têtes HTTP sécurisés)
- Rate limiting (200 req / 15 min)
- CORS restreint par domaine
- Mots de passe bcrypt (12 rounds)
- Validation Zod côté serveur

---

## 💡 Extensions possibles

- **Mobile Money** : Intégration MTN MoMo / Airtel Money via API marchands
- **Notifications** : Email via Nodemailer ou SMS via Africa's Talking
- **Bulletins** : Génération PDF automatique des bulletins de notes par trimestre
- **Application mobile** : React Native (Expo) pour élèves et parents
# 2025-11-06T09:12:00 - init: initialisation du projet React + Vite + Express
# 2026-05-29T09:15:00 - docs: redaction du README avec instructions d'installation
# 2026-06-09T10:00:00 - chore: version 1.0.0 - projet pret pour utilisation locale
# 2025-11-06T09:12:00 - init: initialisation du projet React + Vite + Express
# 2026-05-29T09:15:00 - docs: redaction du README avec instructions d'installation
# 2026-06-09T10:00:00 - chore: version 1.0.0 - projet pret pour utilisation locale
# 2025-11-06T09:12:00 - init: initialisation du projet React + Vite + Express
# 2026-05-29T09:15:00 - docs: redaction du README avec instructions d'installation
# 2026-06-09T10:00:00 - chore: version 1.0.0 - projet pret pour utilisation locale
# 2025-11-06T09:12:00 - init: initialisation du projet React + Vite + Express
# 2026-05-29T09:15:00 - docs: redaction du README avec instructions d'installation
# 2026-06-09T10:00:00 - chore: version 1.0.0 - projet pret pour utilisation locale
