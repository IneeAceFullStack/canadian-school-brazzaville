# École Canadienne — School Management Platform

> A full-stack web application for managing student enrollment, academic records, scheduling, and payments at a private Canadian-affiliated school in Africa.

!\[Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Express%20%7C%20PostgreSQL-blue)
!\[License](https://img.shields.io/badge/license-MIT-green)
!\[Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
!\[Status](https://img.shields.io/badge/status-production--ready-success)

\---

## Table of Contents

1. [Context and Problem Statement](#context-and-problem-statement)
2. [Project Objectives](#project-objectives)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [Architecture](#architecture)
6. [Project Structure](#project-structure)
7. [Data Model](#data-model)
8. [Authentication and Security](#authentication-and-security)
9. [API Endpoints](#api-endpoints)
10. [Prerequisites](#prerequisites)
11. [Installation](#installation)
12. [Environment Configuration](#environment-configuration)
13. [Usage](#usage)
14. [Technical Challenges](#technical-challenges)
15. [Optimizations](#optimizations)
16. [Future Improvements](#future-improvements)
17. [Author](#author)

\---

## Context and Problem Statement

École Canadienne is a private school operating under a Canadian pedagogical model. Before this platform existed, the administration relied entirely on spreadsheets and paper-based processes to track student enrollment, collect payments, manage grades, and communicate with parents.

The pain points were real and recurring: double entries during re-enrollment seasons, no reliable way to track outstanding payment balances, teachers submitting handwritten grade sheets that had to be manually consolidated, and a public-facing web presence that didn't exist at all.

I built this application to replace that fragmented workflow with a unified, role-aware platform that covers every aspect of the school's operations — from the public enrollment form a parent fills out at home, to the finance report the director reviews at the end of the month.

\---

## Project Objectives

* Digitize the complete student lifecycle: inscription → enrollment → active → archived
* Provide role-differentiated dashboards for administrators, teachers, and students
* Automate payment tracking with PDF receipt generation
* Replace paper grade sheets with a structured, trimester-aware grading system
* Give the school a professional public web presence with an online enrollment form
* Centralize announcements and internal communications

\---

## Key Features

### Public-Facing Site

|Feature|Description|
|-|-|
|**Home page**|Hero section, live statistics, program overview, testimonials|
|**About page**|School history, values, leadership team with biography modals|
|**Programs page**|Curriculum from Maternelle to Lycée, with specialization tracks|
|**School life page**|Extracurricular activities and infrastructure gallery with detail modals|
|**News / Blog**|Announcement feed with full-article detail view|
|**Contact form**|Public contact form routed to administration|
|**Online enrollment**|4-step public enrollment form with email validation|
|**Re-enrollment**|Student lookup + re-enrollment confirmation flow|

### Admin Dashboard

|Feature|Description|
|-|-|
|**Overview**|Monthly revenue chart (Recharts), enrollment rate, key indicators|
|**Student management**|Full CRUD with search, pagination, outstanding balance display|
|**Teacher management**|Teacher records linked to assigned classes|
|**Inscription management**|Multi-step enrollment workflow with status filters|
|**Payment management**|Payment creation, confirmation, filters by status, PDF receipt generation|
|**Grade management**|Grade entry by subject, class, and trimester with coefficient support|
|**Schedule management**|Weekly schedule builder by class, displayed day-by-day|
|**Announcements**|Create/publish announcements visible on the public site|
|**Statistics**|Enrollment rates, payment summaries, monthly breakdowns|

### Teacher Portal

|Feature|Description|
|-|-|
|**Dashboard**|Class statistics and recent grade entries|
|**Grade entry**|Subject/trimester-based grade submission interface|

### Student Portal

|Feature|Description|
|-|-|
|**Dashboard**|Personal academic overview|
|**My grades**|Trimester-averaged grades with per-subject coefficient weighting|
|**My schedule**|Weekly class schedule|

\---

## Technology Stack

### Frontend

|Tool|Version|Purpose|
|-|-|-|
|React|18.x|UI component library|
|Vite|5.x|Build tool and dev server|
|TypeScript|5.x|Static typing throughout the frontend|
|TailwindCSS|3.x|Utility-first styling|
|React Router DOM|6.x|Client-side routing with protected routes|
|Axios|1.x|HTTP client with centralized API service|
|Recharts|2.x|Monthly revenue chart on admin dashboard|
|jsPDF|2.x|Client-side PDF receipt generation|
|React Hook Form|—|Form state management|
|React Hot Toast|—|Success/error feedback toasts|

### Backend

|Tool|Version|Purpose|
|-|-|-|
|Node.js|20.x|Runtime environment|
|Express|4.x|HTTP server and routing|
|TypeScript|5.x|Typed server-side code|
|JSON Web Tokens (JWT)|—|Stateless authentication|
|Bcrypt|—|Password hashing|
|Helmet|—|HTTP security headers|
|CORS|—|Cross-origin request handling|
|express-rate-limit|—|Rate limiting on auth routes|

### Database

|Tool|Purpose|
|-|-|
|PostgreSQL|Primary relational database|
|Prisma ORM|Schema definition, migrations, and type-safe queries|

\---

## Architecture

The application follows a classic monolithic architecture with a clear frontend/backend separation, connected via a RESTful API. I deliberately avoided microservices for this project — the school has a small technical team and needs something maintainable without infrastructure overhead.

```
┌─────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                   │
│                                                       │
│   React SPA (Vite)                                    │
│   ├── Public site (unauthenticated)                   │
│   ├── Admin dashboard (role: admin)                   │
│   ├── Teacher portal (role: teacher)                  │
│   └── Student portal (role: student)                  │
└───────────────────┬─────────────────────────────────-┘
                    │ HTTPS / REST
                    ▼
┌─────────────────────────────────────────────────────┐
│                   EXPRESS API SERVER                  │
│                                                       │
│   Middleware stack:                                   │
│   Helmet → CORS → Rate Limiter → JSON parser          │
│   → JWT Auth → Role Guard → Route Handler             │
│   → Global Error Handler                              │
│                                                       │
│   Route modules:                                      │
│   /api/auth   /api/students   /api/teachers           │
│   /api/grades /api/payments   /api/inscriptions       │
│   /api/schedule /api/announcements /api/contact       │
│   /api/stats                                          │
└───────────────────┬─────────────────────────────────-┘
                    │ Prisma ORM
                    ▼
┌─────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                │
│                                                       │
│   Users · Students · Parents · Teachers              │
│   Grades · Payments · Inscriptions · Schedule        │
│   Announcements · ContactMessages                    │
└─────────────────────────────────────────────────────┘
```

### Why this architecture?

I chose a monorepo with a shared `frontend/` and `backend/` structure rather than separate repositories. This simplifies deployment for an institution that doesn't have a dedicated DevOps engineer — a single `git pull` and `npm run build` gets the whole thing updated.

Prisma was chosen over raw SQL or a lighter ORM because its migration system gives the school's future maintainers a clear, versioned record of every schema change. The generated TypeScript types also catch data mismatches at compile time, which matters when non-technical staff might eventually be asking developers to add quick patches.

\---

## Project Structure

```
ecole-canadienne/
│
├── frontend/
│   ├── src/
│   │   ├── assets/                  # Logo, images
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AdminLayout.tsx   # Admin sidebar + navigation wrapper
│   │   │       ├── StudentLayout.tsx
│   │   │       ├── TeacherLayout.tsx
│   │   │       ├── Navbar.tsx        # Public site navigation (mobile-aware)
│   │   │       └── Footer.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # JWT storage, role-based redirect, token expiry
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
│   │   │   └── api.ts                # Axios instance + formatDate + formatMontant
│   │   ├── types/
│   │   │   └── index.ts              # Shared TypeScript interfaces
│   │   ├── utils/
│   │   │   └── formatters.ts
│   │   ├── App.tsx                   # Router + protected route wrappers
│   │   └── index.css                 # TailwindCSS base + custom variables
│   ├── tailwind.config.js            # Primary color: Rouge Grenat #9B1C1C
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts             # Singleton Prisma client
│   │   ├── middleware/
│   │   │   ├── auth.ts               # JWT verification + role guard
│   │   │   └── errorHandler.ts       # Global error handler
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
│   │   └── index.ts                  # Express app bootstrap
│   ├── prisma/
│   │   ├── schema.prisma             # Source of truth for all data models
│   │   ├── seed.ts                   # Demo accounts + sample data
│   │   └── migrations/
│   ├── .env.example
│   └── package.json
│
├── README.md
└── README\\\_FR.md
```

\---

## Data Model

The schema was designed iteratively, with models added as features were built rather than trying to predict everything upfront.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // bcrypt hash
  role      Role     // ADMIN | TEACHER | STUDENT
  createdAt DateTime @default(now())
}

model Student {
  id           Int           @id @default(autoincrement())
  nom          String
  prenom       String
  dateNaissance DateTime
  classe       String
  anneeScolaire String
  statut       StatutEleve
  parents      Parent\\\[]
  payments     Payment\\\[]
  grades       Grade\\\[]
  inscriptions Inscription\\\[]
}

model Parent {
  id        Int     @id @default(autoincrement())
  nom       String
  prenom    String
  telephone String
  email     String?
  student   Student @relation(fields: \\\[studentId], references: \\\[id])
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
  id        Int     @id @default(autoincrement())
  valeur    Float
  matiere   String
  trimestre Int     // 1, 2, or 3
  coefficient Float @default(1)
  student   Student @relation(fields: \\\[studentId], references: \\\[id])
  studentId Int
}

model Payment {
  id          Int            @id @default(autoincrement())
  montant     Float
  reference   String?
  statut      StatutPaiement // CONFIRME | EN\\\_ATTENTE | ANNULE
  type        String         // INSCRIPTION | SCOLARITE | AUTRE
  date        DateTime       @default(now())
  student     Student        @relation(fields: \\\[studentId], references: \\\[id])
  studentId   Int
}

model Inscription {
  id          Int               @id @default(autoincrement())
  type        TypeInscription   // NOUVELLE | REINSCRIPTION
  statut      StatutInscription
  anneeScolaire String
  student     Student           @relation(fields: \\\[studentId], references: \\\[id])
  studentId   Int
  createdAt   DateTime          @default(now())
}

model Schedule {
  id       Int    @id @default(autoincrement())
  classe   String
  jour     String
  heureDebut String
  heureFin   String
  matiere  String
  teacher  String
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

\---

## Authentication and Security

Authentication is handled entirely via JWT tokens stored in localStorage on the client side. I chose stateless JWT over session-based auth to keep the backend horizontally scalable without requiring shared session storage.

### Token Flow

1. User submits credentials → `POST /api/auth/login`
2. Server verifies password with bcrypt, generates JWT including `{ id, email, role }`
3. Client stores token, includes it as `Authorization: Bearer <token>` on every request
4. `auth.ts` middleware decodes and validates the token on protected routes
5. Role guard middleware (`verifyRole`) checks `req.user.role` against the required permission level
6. `AuthContext.tsx` intercepts 401 responses and clears the token, preventing stale sessions

### Security Measures

|Measure|Implementation|
|-|-|
|Password hashing|bcrypt with salt rounds|
|HTTP headers|Helmet (X-Content-Type-Options, X-Frame-Options, HSTS, etc.)|
|Rate limiting|`express-rate-limit` applied specifically to `/api/auth/\\\*` routes|
|CORS policy|Explicit origin whitelist, credentials allowed only for known origins|
|Role-based access|Three-tier role system enforced server-side on every protected route|
|Input validation|Prisma schema constraints + route-level checks|
|Token expiry|JWT short-lived tokens; client detects expiry and forces re-login|
|Unpublished content|Announcements filtered server-side — `publie: true` required for public API|

\---

## API Endpoints

### Authentication

|Method|Endpoint|Access|Description|
|-|-|-|-|
|POST|`/api/auth/login`|Public|Login, returns JWT|
|GET|`/api/auth/me`|Authenticated|Current user profile|
|PUT|`/api/auth/password`|Authenticated|Change password|

### Students

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/students`|Admin|List with search + pagination|
|POST|`/api/students`|Admin|Create student|
|PUT|`/api/students/:id`|Admin|Update student|
|DELETE|`/api/students/:id`|Admin|Delete (cascades safely)|

### Teachers

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/teachers`|Admin|List all teachers|
|POST|`/api/teachers`|Admin|Create teacher|
|PUT|`/api/teachers/:id`|Admin|Update teacher|
|DELETE|`/api/teachers/:id`|Admin|Delete teacher|

### Grades

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/grades`|Admin / Teacher|All grades (filterable)|
|GET|`/api/grades/student/:id`|Admin / Student|Grades for one student|
|POST|`/api/grades`|Admin / Teacher|Submit grade|
|PUT|`/api/grades/:id`|Admin / Teacher|Update grade|

### Payments

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/payments`|Admin|List with status filter|
|POST|`/api/payments`|Admin|Record payment|
|PUT|`/api/payments/:id/confirm`|Admin|Confirm payment|

### Inscriptions

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/inscriptions`|Admin|List with status filter|
|POST|`/api/inscriptions`|Public / Admin|Submit new enrollment|
|PUT|`/api/inscriptions/:id`|Admin|Update inscription status|

### Schedule

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/schedule`|Authenticated|Schedule (filterable by class)|
|POST|`/api/schedule`|Admin|Create schedule entry|
|DELETE|`/api/schedule/:id`|Admin|Delete entry|

### Statistics (Admin only)

|Method|Endpoint|Description|
|-|-|-|
|GET|`/api/stats`|Enrollment rates, payment totals, monthly revenue breakdown|

### Announcements

|Method|Endpoint|Access|Description|
|-|-|-|-|
|GET|`/api/announcements`|Public|Published announcements only|
|GET|`/api/announcements/all`|Admin|All announcements including drafts|
|POST|`/api/announcements`|Admin|Create announcement|
|PUT|`/api/announcements/:id`|Admin|Publish / update|

\---

## Prerequisites

* **Node.js** ≥ 18.x
* **PostgreSQL** ≥ 14
* **npm** or **yarn**

\---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/IneeAceFullStack/canadian-school-brazzaville.git
cd canadian-school-brazzaville

# 2. Install frontend dependencies
cd frontend \\\&\\\& npm install

# 3. Install backend dependencies
cd ../backend \\\&\\\& npm install

# 4. Configure environment variables (see below)
cp .env.example .env

# 5. Run database migrations
npx prisma migrate deploy

# 6. Seed the database with demo accounts
npx ts-node prisma/seed.ts
```

\---

## Environment Configuration

Create `backend/.env` from the provided example:

```env
# Database
DATABASE\\\_URL="postgresql://user:password@localhost:5432/ecole\\\_canadienne"

# Authentication
JWT\\\_SECRET="your-strong-random-secret-here"
JWT\\\_EXPIRES\\\_IN="24h"

# Server
PORT=5000
NODE\\\_ENV=development

# CORS
FRONTEND\\\_URL="http://localhost:5173"
```

Create `frontend/.env`:

```env
VITE\\\_API\\\_URL="http://localhost:5000/api"
```

\---

## Usage

### Development

```bash
# Terminal 1 — Backend
cd backend \\\&\\\& npm run dev

# Terminal 2 — Frontend
cd frontend \\\&\\\& npm run dev
```

### Production

```bash
# Build frontend
cd frontend \\\&\\\& npm run build

# Start backend
cd backend \\\&\\\& npm start
```

### Demo Accounts (after seeding)

|Role|Email|Password|
|-|-|-|
|Administrator|admin@ecole-canadienne.com|Admin@2025|
|Teacher|prof@ecole-canadienne.com|Teacher@2025|
|Student|eleve@ecole-canadienne.com|Student@2025|

\---

## Technical Challenges

### Cascade deletion with payment records

One of the first real bugs I hit was a 500 error when trying to delete a student who had associated payment records. Prisma's default behavior throws a foreign key constraint error in that case. I resolved it by implementing a soft-check before deletion — the route now queries for related payments first and either blocks the operation or cascades the deletion depending on the payment status. Clean, explicit, no surprises.

### Grade average calculation with coefficients

The initial average calculation was a straight arithmetic mean, which gave the wrong results when subjects had different coefficients. I corrected this to a weighted mean: `Σ(grade × coefficient) / Σ(coefficient)`. The fix was in `StudentGrades.tsx` and affected how trimester summaries were displayed.

### Token expiry handling

Early in testing, users would be silently served stale data after their JWT expired because the Axios interceptor wasn't handling 401 responses correctly. I added a response interceptor in `api.ts` that clears localStorage and redirects to the login page on any 401, preventing the "zombie session" problem.

### PDF generation with missing reference fields

The jsPDF receipt generator threw a runtime error when the payment reference field was empty — it was trying to render `undefined` as a string. I added a fallback: `reference || 'N/A'` across all PDF fields before passing them to jsPDF.

### CORS in development

During development, the frontend on port 5173 was blocked by the Express CORS policy configured for production. I added an environment-conditional origin that allows `localhost:5173` when `NODE\\\_ENV=development`, without opening the policy in production.

\---

## Optimizations

* **Explicit Prisma selects**: Instead of letting Prisma return entire model objects (including password hashes, heavy relations), all list queries use `select` to return only the fields the client actually needs. This noticeably reduced payload sizes on the student and payment lists.
* **Server-side pagination**: The student list route accepts `?page=` and `?limit=` parameters, preventing the full table from being returned to a client-side filter.
* **Rate limiting on auth routes only**: Rather than applying rate limiting globally (which would affect the public site), I scoped `express-rate-limit` exclusively to `/api/auth/\\\*`. This protects against brute force without adding unnecessary overhead to read-heavy public endpoints.
* **Unpublished announcements filtered server-side**: The public announcements endpoint applies `WHERE publie = true` at the database level, not in JavaScript. A previous version was fetching all records and filtering in memory — this was fixed as soon as the announcement volume made it visible.
* **React component lazy loading**: Public pages (which can be large with images and modals) are code-split using `React.lazy()` and `Suspense` to keep the initial bundle lean.

\---

## Future Improvements

These are improvements I'd make if the project were to continue in active development:

* **Email notifications**: Send confirmation emails to parents when an inscription is approved or a payment is recorded. This would require an SMTP integration (Nodemailer + a transactional provider like Brevo or Postmark).
* **Bulletin generation**: Automated PDF report cards per student per trimester, combining all subjects, averages, and teacher remarks in a formatted document.
* **Parent portal**: Currently, parents have no direct access. A read-only parent role could view their child's grades, schedule, and outstanding balance without requiring admin involvement.
* **Role-specific dashboards via WebSocket**: Real-time notification when a new enrollment comes in or a payment is confirmed — instead of the current manual refresh on the admin dashboard.
* **Audit log**: A timestamped log of who changed what (grade modifications, payment confirmations) for compliance and accountability.
* **Multi-school support**: The data model currently assumes a single school. Multi-tenancy with school-scoped data would allow the same platform to serve multiple institutions.
* **Tests**: Unit tests for the grade calculation logic and integration tests for the auth flow are the highest-priority gaps. The backend has no automated test coverage.

\---

## Author

**Pascale Perspicasse Destinée OLOLO**  
Full-Stack Developer — Node.js · React · PostgreSQL

📧 [ololoppd@gmail.com](mailto:ololoppd@gmail.com)
🔗 [Pascale Perspicasse Destinée OLOLO](https://www.linkedin.com/in/pascale-perspicasse-destinée-ololo-07474b374)*
🐙 [IneeAceFullStack](https://github.com/IneeAceFullStack)*

\---



*\*Project developed between November 2025 and June 2026. Version 1.0.0 is production-ready and live at live at \[canadian-school-brazzaville.vercel.app](https://canadian-school-brazzaville.vercel.app) .\**



