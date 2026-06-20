# Case Study — École Canadienne

**Plateforme de gestion scolaire full-stack**  
React · TypeScript · Express · PostgreSQL · Prisma  
Novembre 2025 – Juin 2026

---

## Présentation du projet

École Canadienne est une plateforme web complète que j'ai conçue et développée pour un établissement scolaire privé africain fonctionnant selon un référentiel pédagogique canadien. L'application couvre l'intégralité du cycle de vie scolaire : inscription en ligne des nouveaux élèves, suivi administratif, gestion des paiements de scolarité, saisie des notes par les enseignants, diffusion des emplois du temps, et présence publique de l'institution.

Le projet est structuré autour de trois espaces distincts — un site public, un tableau de bord administratif, et des portails enseignant et élève — tous servis depuis une API REST unique sécurisée par JWT.

---

## Pourquoi j'ai créé ce projet

Ce projet est né d'une observation concrète. Lors de mes échanges avec l'équipe dirigeante, j'ai découvert que la scolarité d'environ 400 élèves était gérée intégralement à la main : feuilles de calcul Excel pour les inscriptions, cahiers pour les paiements, notes transmises sur papier par les enseignants, aucun moyen pour un parent de se renseigner ou d'initier une démarche en dehors des heures de bureau.

Mon objectif initial n'était pas de bâtir un système coûteux. Je voulais livrer quelque chose de directement utilisable, sans formation technique préalable, et qui règle en priorité les points de douleur les plus visibles : les doublons de saisie à la rentrée, les impayés difficiles à suivre, et l'absence de visibilité pour les parents.

---

## Le problème à résoudre

La situation que j'ai observée se décomposait en trois couches distinctes.

**Au niveau administratif**, la secrétaire gérait les inscriptions dans plusieurs fichiers Excel non synchronisés. Une réinscription ratée ou un doublon de dossier prenait une demi-journée à corriger. Le suivi des paiements partiels — fréquents dans ce contexte — était quasiment impossible à fiabiliser.

**Au niveau pédagogique**, chaque enseignant remettait ses notes en fin de trimestre sur une feuille A4. La direction les saisissait ensuite une par une pour produire les bulletins. En cas d'erreur, retrouver l'origine du problème prenait du temps.

**Au niveau institutionnel**, l'école n'avait aucune présence web. Un parent intéressé ne pouvait pas consulter les programmes, prendre contact facilement, ni déposer une demande d'inscription hors saison. L'école perdait probablement des inscriptions faute de visibilité.

---

## Ma réflexion avant de commencer

Avant d'écrire la première ligne de code, j'ai pris le temps de réfléchir aux alternatives.

La première option envisagée était un outil existant de type ERP scolaire (Pronote, School Assistant, ou des solutions africaines comme Mestro). J'y ai renoncé pour plusieurs raisons : coût de licence incompatible avec le budget, rigidité des interfaces qui auraient demandé une adaptation longue, et surtout absence de site web public intégré. Ces outils gèrent bien l'interne, mais ne règlent pas le problème de la présence institutionnelle.

La deuxième option était un CMS + plugin de gestion (WordPress + extension scolaire). J'ai rapidement écarté cette piste : trop fragile, difficile à sécuriser proprement, et inadapté à la gestion de rôles différenciés avec logique métier complexe.

J'ai donc décidé de construire une application sur mesure. Pas par goût de la complexité, mais parce que c'était la seule option qui permettait d'avoir exactement ce dont l'école avait besoin — ni plus, ni moins — avec la liberté d'évoluer.

La contrainte principale était la maintenabilité. L'école ne dispose pas d'équipe technique interne. J'avais besoin d'un stack classique, bien documenté, avec des outils qui ont une communauté active et des erreurs lisibles.

---

## Les choix techniques effectués

### React + Vite + TypeScript

J'ai choisi React parce que je le connais bien et parce que son écosystème est mature. Vite s'est imposé naturellement face à Create React App, qui est officiellement déprécié et dont les temps de build commençaient à devenir pénibles sur des projets de cette taille. TypeScript était non négociable : avec des modèles de données imbriqués (élève → paiements, élève → notes, emploi du temps → classes), les erreurs de typage au runtime auraient été coûteuses.

TailwindCSS a été un choix pragmatique. Je n'avais pas besoin d'un design system complet, mais je voulais de la cohérence visuelle sans écrire du CSS personnalisé pour chaque composant. La couleur principale — Rouge Grenat `#9B1C1C` — correspond à l'identité visuelle de l'école.

### Express + TypeScript

Node.js avec Express était le choix naturel pour garder TypeScript côté serveur sans introduire un autre runtime. J'aurais pu regarder Fastify pour les performances, mais Express me semblait plus accessible pour un futur maintainer qui ne serait pas forcément familier avec le framework.

### PostgreSQL + Prisma

PostgreSQL s'imposait pour un système de ce type. Les données scolaires sont fortement relationnelles : un élève a plusieurs paiements, plusieurs notes, plusieurs inscriptions, un ou plusieurs parents. Une base documentaire aurait introduit de la complexité inutile pour modéliser ces relations.

Prisma a été mon ORM de choix. J'ai hésité avec Drizzle, plus léger, mais j'ai finalement opté pour Prisma parce que son système de migrations génère des fichiers SQL lisibles et versionnables. Dans un contexte où quelqu'un d'autre va peut-être reprendre le projet dans deux ans, avoir des migrations explicites vaut beaucoup.

### JWT stateless

J'ai délibérément choisi JWT sans session côté serveur. L'établissement héberge l'application sur un seul serveur modeste — pas de Redis, pas de gestion de session distribuée. JWT simplifie le déploiement et maintient la cohérence même si le serveur redémarre.

---

## Architecture du projet

L'application suit une architecture monolithique structurée en deux zones bien distinctes.

```
┌──────────────────────────────────────────────┐
│              FRONTEND (React SPA)             │
│                                               │
│  Site public     Admin      Teacher  Student  │
│  (non auth)   (role:admin) (teacher) (student)│
└────────────────────┬─────────────────────────-┘
                     │ REST / JWT
                     ▼
┌──────────────────────────────────────────────┐
│            BACKEND (Express + TS)             │
│                                               │
│  Middleware: Helmet → CORS → Rate Limit       │
│           → JWT Auth → Role Guard             │
│                                               │
│  Routes: /auth /students /teachers /grades    │
│  /payments /inscriptions /schedule            │
│  /announcements /contact /stats               │
└────────────────────┬─────────────────────────-┘
                     │ Prisma
                     ▼
┌──────────────────────────────────────────────┐
│           POSTGRESQL (Prisma ORM)             │
│                                               │
│  User · Student · Parent · Teacher           │
│  Grade · Payment · Inscription · Schedule    │
│  Announcement · ContactMessage               │
└──────────────────────────────────────────────┘
```

Le frontend est une SPA (Single Page Application) avec routage côté client. Chaque rôle accède à son propre espace cloisonné — l'`AuthContext.tsx` stocke le token JWT et le rôle, les routes protégées vérifient ce rôle avant de rendre quoi que ce soit.

Le backend expose 10 modules de routes, chacun gérant un domaine fonctionnel. Chaque route passe d'abord par la pile middleware complète avant d'atteindre le handler.

Le schéma Prisma est la source de vérité absolue pour la structure des données. Toute modification de modèle passe par une migration explicite — aucun changement de schéma à la volée.

---

## Les défis techniques rencontrés

### 1. La suppression d'un élève avec des paiements associés

Le premier bug qui m'a vraiment ralenti était une erreur 500 silencieuse quand l'administrateur tentait de supprimer un élève ayant des paiements enregistrés. Prisma lève une contrainte de clé étrangère dans ce cas. Ce n'est pas un bug dans le sens strict — c'est le comportement attendu — mais l'erreur n'était pas gérée proprement.

J'ai mis en place une vérification préalable : la route lit d'abord les paiements liés. Si des paiements confirmés existent, la suppression est bloquée avec un message explicite. Si uniquement des paiements en attente ou annulés sont présents, la cascade est autorisée. Le comportement est maintenant déterministe et compréhensible.

### 2. Le calcul de moyenne pondérée

La première version calculait une moyenne arithmétique simple pour les notes trimestrielles. C'est une erreur classique qui passait inaperçue en développement parce que les données de test avaient des coefficients uniformes à 1.

En production, avec de vraies matières (Mathématiques coeff. 4, Éducation physique coeff. 1), les moyennes affichées étaient fausses. J'ai corrigé en appliquant la formule pondérée : `Σ(valeur × coefficient) / Σ(coefficient)`. La modification était dans `StudentGrades.tsx` mais révélait une lacune dans les données de test initiales — leçon retenue pour les prochains projets.

### 3. Le token JWT et la "session fantôme"

Après l'expiration d'un JWT, les utilisateurs continuaient à naviguer dans l'application sans recevoir d'erreur visible. Axios retournait des erreurs 401, mais elles étaient silencieusement ignorées faute d'intercepteur configuré.

J'ai ajouté un intercepteur de réponse global dans `api.ts` qui vide le localStorage et redirige vers la page de connexion sur tout retour 401. Ce type de bug est subtil parce qu'il ne casse rien de façon visible immédiatement — l'application semble fonctionner, mais les données affichées peuvent être incohérentes.

### 4. La génération PDF avec des champs nulls

jsPDF lève une erreur à l'exécution si on lui passe une valeur `undefined` là où il attend une chaîne. Le champ `reference` d'un paiement est optionnel dans le schéma — ce qui est tout à fait normal, tous les paiements n'ont pas de référence externe. La solution était triviale (`reference || 'N/A'`) mais elle illustre un point général : les données optionnelles dans un schéma doivent être traitées explicitement partout où elles sont affichées, pas seulement là où elles sont saisies.

### 5. CORS entre environnements

En développement, le frontend tourne sur le port 5173 (Vite) et le backend sur 5000 (Express). En production, tout passe par le même domaine. J'avais initialement configuré CORS avec une liste d'origines fixe — ce qui bloquait les requêtes en développement local. J'ai résolu ça proprement en lisant `FRONTEND_URL` depuis les variables d'environnement, avec une valeur par défaut `localhost:5173` quand `NODE_ENV=development`.

### 6. Le calcul du taux d'inscription

La route `/api/stats` calculait le taux d'inscription comme `(inscriptions actives / total élèves) × 100`. Ce calcul était incorrect parce qu'il ne tenait pas compte de l'année scolaire en cours — il agrégait des données de toutes les années. J'ai filtré les requêtes sur `anneeScolaire` avant de calculer les ratios.

---

## Comment j'ai résolu ces difficultés

La plupart des problèmes que j'ai rencontrés relevaient de deux catégories : les cas limites dans les données (champs nulls, données optionnelles, coefficients à 0) et les comportements implicites des bibliothèques que j'avais sous-estimés (Prisma foreign key constraints, JWT expiration, jsPDF type requirements).

Ma méthode de résolution a été systématique : reproduire le bug avec des données réelles, identifier la couche exacte où l'erreur se produit (base de données, ORM, API, frontend), puis apporter un correctif ciblé sans restructurer du code qui fonctionnait.

Ce que j'ai appris sur la gestion des erreurs : les erreurs 500 non gérées sur une API REST sont particulièrement difficiles à diagnostiquer côté frontend. J'ai passé du temps à améliorer le `errorHandler.ts` pour que chaque erreur retourne un message structuré avec un code et une description, pas seulement un statut HTTP.

---

## Ce que ce projet m'a appris

**Sur la conception des schémas de données.** J'ai conçu le schéma en plusieurs itérations plutôt qu'en une seule passe. Certains champs qui semblaient évidents au départ se sont révélés inutiles (j'avais prévu un champ `nationalite` sur `Student` qui n'a jamais été utilisé), d'autres ont dû être ajoutés après coup (`coefficient` sur `Grade`). J'aurais gagné du temps à impliquer l'équipe administrative dès le début pour lister les données qu'elle consulte réellement.

**Sur la gestion des rôles.** Implémenter un système de rôles côté frontend est plus complexe qu'il n'y paraît. Il ne suffit pas de cacher des boutons — il faut aussi protéger les routes, intercepter les navigations directes par URL, et s'assurer que le token ne donne pas accès à des données d'un autre rôle côté API. J'ai finalement centralisé toute cette logique dans `AuthContext.tsx` et les wrappers de routes dans `App.tsx`.

**Sur les performances Prisma.** Les premières versions des requêtes `findMany` retournaient les objets complets avec toutes leurs relations. Ça fonctionnait, mais les payloads étaient inutilement lourds. J'ai ensuite systématisé l'utilisation de `select` pour ne retourner que les champs affichés à l'écran. Ce n'est pas une optimisation spectaculaire, mais c'est une bonne habitude que je garde.

**Sur le PDF côté client.** jsPDF est puissant mais fragile sur les données dynamiques. Les erreurs n'apparaissent qu'à l'exécution, pas à la compilation. Pour un prochain projet similaire, je mettrais en place une génération PDF côté serveur (avec Puppeteer ou PDFKit) — c'est plus robuste et permet de gérer les polices, le HTML et les images de façon bien plus fiable.

**Sur la séparation des environnements.** Ce projet m'a confirmé que les variables d'environnement doivent être définies dès le premier jour, pas configurées "plus tard". J'ai eu des surprises en développement parce que certaines valeurs avaient des valeurs par défaut implicites dans le code — ce genre de choses est invisible jusqu'au moment où ça casse en production.

---

## Si je devais recommencer aujourd'hui

**Ce que je garderais.** Le choix de la stack (React + Express + PostgreSQL + Prisma) s'est avéré solide. La structure monorepo frontend/backend dans un seul dépôt a simplifié le développement et le déploiement. Le système de migrations Prisma a bien fonctionné — chaque évolution du schéma est tracée et réversible.

**Ce que j'améliorerais dès le départ.** J'aurais intégré des tests dès le début, même minimaux. Le calcul de moyenne pondérée, la logique de suppression en cascade, et la gestion des états de paiement sont des comportements qui méritent des tests unitaires. Les déboguer en production n'était pas grave ici, mais dans un contexte de croissance, ça le serait.

**Ce que je refactoriserais.** La gestion des formulaires est dispersée — certaines pages utilisent `useState` local, d'autres React Hook Form. J'aurais dû standardiser sur React Hook Form dès le départ. La cohérence des validations entre frontend et backend pourrait aussi être améliorée : actuellement, certaines règles sont vérifiées côté client et côté serveur de façon indépendante, ce qui crée de la duplication.

**Ce que je remplacerais.** Pour la génération PDF, je passerais à une solution serveur. jsPDF côté client est pratique pour démarrer vite, mais il ne passe pas à l'échelle quand les templates deviennent complexes. Puppeteer ou une bibliothèque dédiée comme `@react-pdf/renderer` offrent beaucoup plus de contrôle.

**Les évolutions naturelles.** Un portail parent est l'extension logique évidente — les parents sont les premiers bénéficiaires du suivi scolaire mais n'ont aucun accès direct dans la version actuelle. Les notifications par email (confirmation d'inscription, rappel de paiement) manquent aussi. Et les tests automatisés, evidemment.

---

## Impact du projet

Concrètement, l'application remplace environ 6 à 8 heures de travail administratif hebdomadaire pour une équipe de deux personnes. Les inscriptions qui prenaient une journée entière de paperasse se font maintenant en 10 minutes via le formulaire en ligne. Le suivi des paiements partiels, qui générait des erreurs régulières, est maintenant fiable parce que l'état de chaque paiement est tracé en base de données.

Pour les enseignants, la saisie des notes se fait depuis n'importe quel appareil sans déplacement physique. Pour les élèves, accéder à son emploi du temps ou ses moyennes ne nécessite plus de demander une impression papier.

Du point de vue institutionnel, l'école dispose maintenant d'une présence web professionnelle avec un formulaire d'inscription en ligne opérationnel — un canal d'acquisition qu'elle n'avait pas avant.

---

## Les compétences démontrées

### Frontend
- Architecture d'une SPA React avec routage protégé par rôle
- Gestion d'état d'authentification avec Context API et localStorage
- Développement de composants complexes (formulaires multi-étapes, tableaux paginés, modals, graphiques)
- Responsive design avec TailwindCSS
- Génération de documents PDF côté client avec jsPDF
- Gestion des intercepteurs Axios pour les erreurs globales

### Backend
- API REST Express structurée en modules de routes
- Authentification JWT avec middleware de vérification de rôle
- Gestion d'erreurs globale centralisée
- Rate limiting ciblé sur les endpoints sensibles
- Configuration CORS différenciée par environnement

### Base de données
- Modélisation de données relationnelles complexes avec Prisma
- Migrations versionnées avec historique des évolutions de schéma
- Optimisation des requêtes avec `select` explicite
- Gestion des contraintes de clés étrangères et de l'intégrité référentielle
- Seed de données de démonstration idempotent

### Sécurité
- Hachage bcrypt pour les mots de passe
- Headers HTTP sécurisés via Helmet
- JWT avec expiration courte et détection côté client
- Contrôle d'accès RBAC (Role-Based Access Control) appliqué côté API
- Filtrage des contenus non publiés au niveau SQL

### Architecture
- Monorepo frontend/backend avec séparation claire des responsabilités
- Définition du schéma en source de vérité unique (Prisma)
- Conception itérative du modèle de données
- Gestion des environnements (dev / production) via variables d'environnement

### Gestion de projet
- Livraison d'un produit complet en 7 mois de développement en solo
- Priorisation des fonctionnalités par impact métier
- Résolution autonome de bugs en production
- Documentation technique complète (README bilingue, schéma de données, endpoints API)

---

## Ce qu'un recruteur devrait retenir

Ce projet illustre la capacité à concevoir, développer et livrer une application complète en autonomie — de l'analyse du besoin métier jusqu'à la mise en production.

La stack utilisée (React, TypeScript, Express, PostgreSQL, Prisma) représente aujourd'hui un des standards les plus répandus dans les équipes de développement produit. Le fait de l'avoir appliquée sur un problème réel, avec des utilisateurs réels et des contraintes concrètes (budget limité, équipe non technique, besoin de maintenabilité à long terme), donne au projet une crédibilité que les projets purement d'exercice n'ont pas.

Les défis rencontrés — gestion des suppressions en cascade, calcul de moyenne pondérée, session fantôme après expiration du JWT, configuration CORS multi-environnement — sont des problèmes que tout développeur full-stack rencontre tôt ou tard. Le fait de les avoir identifiés et résolus de façon documentée montre une capacité de débogage méthodique et une compréhension réelle de la chaîne technique, pas seulement de ses parties isolées.

Ce développeur est capable de prendre en charge un projet de bout en bout : comprendre un besoin métier, concevoir une architecture adaptée, écrire du code maintenable, gérer des bugs en conditions réelles, et livrer quelque chose qui fonctionne.

---

## Résumé exécutif

École Canadienne est une plateforme web full-stack développée en solo sur 7 mois pour digitaliser la gestion d'un établissement scolaire privé. L'application remplace des processus papier et Excel par un système unifié couvrant les inscriptions, les paiements, les notes, les emplois du temps et la présence publique de l'école. La stack — React, TypeScript, Express, PostgreSQL, Prisma — a été choisie pour sa maturité et sa maintenabilité dans un contexte sans équipe technique dédiée. Le projet démontre une maîtrise complète du cycle de développement full-stack : modélisation des données, API REST sécurisée, authentification JWT avec contrôle d'accès par rôle, interface responsive multi-portail, et génération de documents PDF. Les défis rencontrés (gestion des contraintes relationnelles, calcul de moyennes pondérées, expiration de tokens, configuration CORS) ont été résolus de façon méthodique et documentée. La version 1.0.0 est opérationnelle et déployée en production locale.

---

*Document rédigé dans le cadre d'un portfolio professionnel — Juin 2026*
