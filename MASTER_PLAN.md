# MASTER_PLAN.md — teacher.ac.pk

> **Single planning document for the entire project. All planning, architecture, and roadmap changes MUST be made here only.**

---

## 1. Overview

**teacher.ac.pk** is a comprehensive, exam-focused digital learning platform serving Pakistan's learners at every educational stage.

### Who It Serves
- **Illiterate learners** (children and adults) starting from zero
- **School students** (Middle School grades 6-8, Matric 9-10, Intermediate 11-12)
- **O-Level & A-Level students** (Cambridge/international curriculum)
- **University students** (supplemental courses)
- **Professional exam candidates** (MDCAT, ECAT, CSS, etc.)
- **Teachers & content experts** (course creation, assessment management)
- **Institution administrators** (schools, coaching centers)
- **Parents/guardians** (progress monitoring)

### What It Does
- Structured courses aligned to Pakistan's curricula (national boards, Cambridge)
- Past papers archive with interactive practice
- Expert guess papers and mock exams
- Rich analytics and progress tracking
- Bilingual support (Urdu/English) with RTL
- Mobile-first PWA with offline capabilities
- Multi-tenant institutional support

### Core Philosophy
- **Exam-oriented**: Every feature serves exam success
- **Accessible & affordable**: Nominal fees, mobile-first, low-bandwidth optimized
- **Quality-assured**: Content reviewed by subject experts
- **Inclusive**: Voice-guided literacy track for non-readers

---

## 2. Architecture Summary

### Monorepo Structure (pnpm workspaces)

```
teacher/
├── apps/
│   ├── web/          # Main SPA for students/teachers (teacher.ac.pk)
│   ├── admin/        # Admin & operations panel (admin.teacher.ac.pk)
│   └── api/          # NestJS backend API (api.teacher.ac.pk)
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI components
│   └── utils/        # Shared utilities
├── MASTER_PLAN.md    # This file (ONLY planning doc)
├── pnpm-workspace.yaml
├── package.json
├── .gitignore
└── .github/
    └── workflows/
        └── ci.yml
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend (web/admin)** | Next.js 16.1+, React 19, TypeScript, TailwindCSS |
| **Backend (api)** | NestJS, Prisma ORM, PostgreSQL, Redis |
| **Auth** | JWT (access + refresh tokens) |
| **Deployment** | Railway (Railpack builder) |
| **CDN/Media** | Cloudflare (streams, signed URLs) |

### High-Level Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   web/admin │ ──► │     api     │ ──► │  PostgreSQL │
│  (Next.js)  │     │  (NestJS)   │     │   + Redis   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       │            │  Cloudflare │
       │            │   (Media)   │
       └────────────┴─────────────┘
```

### SPA Requirement
- All navigation is client-side (no full page reloads)
- Next.js App Router for routing
- React Server Components where appropriate, but SPA UX maintained
- PWA-ready with service worker and manifest

### Railway Configuration
- Each app has its own `railway.json` (Railpack builder)
- Environment variables reference Railway service variables
- Auto-deploy on push to `main` branch

---

## 3. Domain Model (High Level)

### Core Entities

- **User** — All platform users (students, teachers, admins, parents)
- **Role / UserRole** — Role assignments (STUDENT, TEACHER, ADMIN, PARENT, CONTENT_AUTHOR, REVIEWER)
- **Institution** — Schools, coaching centers (multi-tenant)
- **Course** — Learning container (e.g., "Class 10 Physics")
- **Module** — Course subdivision (e.g., "Chapter 1: Motion")
- **Lesson** — Individual learning unit within a module
- **Content** — Lesson content items (video, text, PDF, audio)
- **Question** — Assessment item (MCQ, short answer, essay, etc.)
- **QuestionBank** — Organized collection of questions by subject/topic
- **Quiz / Assignment** — Assessment container
- **Paper** — Past paper, guess paper, or mock exam
- **Enrollment** — User ↔ Course relationship
- **Submission** — Student answers/uploads for assessments
- **Grade** — Score and feedback for submissions
- **Progress** — User progress tracking per course/module/lesson
- **Notification** — User notifications
- **Session** — Auth sessions (single-device enforcement)

### Entity Relationships (Simplified)

```
User ─┬─► Enrollment ─► Course ─► Module ─► Lesson ─► Content
      │                   │
      │                   └─► Quiz/Assignment ─► Question
      │
      └─► Submission ─► Grade
      
Institution ─► User (scoped)
            ─► Course (private courses)

Paper ─► Question (past/guess/mock composition)
```

---

## 4. Phase Plan

### Phase 0 — Repository & Tooling ✅ IN PROGRESS
**Goals**: Establish monorepo foundation with proper tooling

**Scope**:
- [x] Initialize Git repo with GitHub remote
- [ ] Create pnpm monorepo structure
- [ ] Configure pnpm-workspace.yaml
- [ ] Add root package.json with workspace scripts
- [ ] Add comprehensive .gitignore
- [ ] Add CI workflow (.github/workflows/ci.yml)
- [ ] Create MASTER_PLAN.md (this document)

**Acceptance Criteria**:
- `pnpm install` succeeds at root
- All apps/packages directories exist
- CI workflow valid YAML

---

### Phase 1 — App Skeletons & API Base
**Goals**: Scaffold all applications with basic configuration

**Scope**:
- Create `apps/web` (Next.js 16+, App Router, TypeScript, Tailwind)
- Create `apps/admin` (Next.js 16+, App Router, TypeScript, Tailwind)
- Create `apps/api` (NestJS with TypeScript)
- Configure `next.config.ts` for Railway (standalone output, AVIF/WebP)
- Add `railway.json` to each app
- Implement `/health` endpoint in API
- Set up Prisma with initial schema stub
- Create shared packages (types, ui, utils)

**Tech Impact**:
- Prisma schema: minimal (just datasource config)
- API: health module, config module, CORS setup

**Acceptance Criteria**:
- `pnpm dev:web`, `pnpm dev:admin`, `pnpm dev:api` all start
- `pnpm build:web`, `pnpm build:admin`, `pnpm build:api` all succeed
- `/health` returns status, timestamp, version
- CI passes

---

### Phase 2 — Authentication & Roles
**Goals**: Implement secure auth with role-based access control

**Scope**:
- User entity with Prisma
- Role/UserRole entities
- JWT auth (access + refresh tokens)
- Auth module in API (register, login, refresh, logout)
- Password hashing (bcrypt)
- Single-device session enforcement
- Auth guards and decorators
- Basic auth UI in web app (login, register pages)

**Tech Impact**:
- Prisma schema: User, Role, UserRole, Session tables
- API: auth module, guards, JWT strategy
- Web: auth pages, auth context/hooks

**Acceptance Criteria**:
- User can register and login
- JWT tokens issued and validated
- Refresh token flow works
- Single-device enforcement active
- Role-based route protection works

---

### Phase 3 — Core LMS Entities
**Goals**: Build foundational LMS data structures

**Scope**:
- Institution entity (multi-tenant)
- Course, Module, Lesson entities
- Content entity (polymorphic: video, text, PDF, audio)
- Enrollment entity
- Progress tracking entity
- CRUD APIs for courses, modules, lessons
- Basic course listing and detail pages in web

**Tech Impact**:
- Prisma schema: Institution, Course, Module, Lesson, Content, Enrollment, Progress
- API: courses module, enrollments module
- Web: course catalog, course detail, lesson viewer

**Acceptance Criteria**:
- Admin can create courses with modules and lessons
- Students can enroll in courses
- Progress tracked as lessons completed
- Course content renders correctly

---

### Phase 4 — Assessment Engine
**Goals**: Implement quiz/exam functionality

**Scope**:
- Question entity with types (MCQ, short, essay, etc.)
- QuestionBank entity
- Quiz/Assignment entity
- Submission and Grade entities
- Quiz taking flow (timed, untimed modes)
- Auto-grading for objective questions
- Manual grading interface for subjective
- Past paper entity and archive
- Guess paper workflow (draft → review → publish)
- Mock exam generation

**Tech Impact**:
- Prisma schema: Question, QuestionBank, Quiz, Assignment, Paper, Submission, Grade
- API: questions module, quizzes module, papers module, grading module
- Web: quiz taking UI, past papers browser, results view

**Acceptance Criteria**:
- Questions can be created and organized in banks
- Quizzes can be assembled from question banks
- Students can take timed quizzes
- MCQs auto-graded, essays manually graded
- Past papers browsable and attemptable
- Mock exams generatable from question pool

---

### Phase 5 — Analytics & Dashboards
**Goals**: Rich progress tracking and insights

**Scope**:
- Student dashboard with progress overview
- Teacher dashboard with class analytics
- Admin dashboard with platform metrics
- Performance charts (score trends, topic mastery)
- Comparative analytics (percentile among peers)
- Score prediction (based on mock performance)
- Notification system

**Tech Impact**:
- API: analytics module, notifications module
- Web/Admin: dashboard components, charts

**Acceptance Criteria**:
- Students see progress, strengths/weaknesses
- Teachers see class performance summary
- Admins see platform-wide metrics
- Notifications delivered for key events

---

### Phase 6 — Content Authoring & Management
**Goals**: Enable teachers to create and manage content

**Scope**:
- Course authoring interface
- Lesson editor (WYSIWYG, media embedding)
- Question editor with various types
- Content review workflow
- Content versioning
- Shared resource library
- Media upload with Cloudflare integration

**Tech Impact**:
- API: content module, media module, review workflow
- Admin/Web: authoring UI, media manager

**Acceptance Criteria**:
- Teachers can create courses end-to-end
- Content goes through review before publish
- Media uploaded and served via CDN

---

### Phase 7 — Literacy Track
**Goals**: Voice-guided learning for non-readers

**Scope**:
- Simplified UI mode (icons, audio)
- Voice-guided navigation
- Alphabet recognition modules (Urdu, English)
- Basic numeracy modules
- Speech recognition for pronunciation feedback (stretch)
- Literacy progress milestones

**Tech Impact**:
- Web: alternate UI components for literacy
- API: literacy-specific progress tracking
- Content: audio-heavy lessons

**Acceptance Criteria**:
- Non-reader can navigate via voice/icons
- Literacy lessons playable with audio
- Progress tracked through literacy stages

---

### Phase 8 — Multi-Tenant & Institutions
**Goals**: School/coaching center support

**Scope**:
- Institution management (create, configure)
- Bulk user import
- Class/batch organization
- Institution-scoped courses
- Admin dashboard per institution
- White-label branding options
- Institution billing (stretch)

**Tech Impact**:
- Prisma: Institution scoping on relevant entities
- API: institution module, bulk operations
- Admin: institution management UI

**Acceptance Criteria**:
- School can onboard with their users
- Institution data isolated
- Institution admin sees only their data

---

### Phase 9 — PWA & Offline
**Goals**: Full offline capability

**Scope**:
- Service worker for caching
- Offline lesson viewing
- Offline quiz taking (sync on reconnect)
- Download management UI
- Low-bandwidth optimizations
- Push notifications

**Tech Impact**:
- Web: service worker, IndexedDB storage
- API: sync endpoints

**Acceptance Criteria**:
- Lessons downloadable for offline
- Quizzes completable offline
- Changes sync when online

---

### Phase 10 — Professional Exam Prep (MDCAT, etc.)
**Goals**: Specialized features for competitive exams

**Scope**:
- MDCAT/ECAT/CSS exam programs
- Large question banks (100k+ questions)
- Adaptive practice recommendations
- Study planner/scheduler
- Score predictor
- Grand mock events
- Leaderboards

**Tech Impact**:
- Content: massive question import
- API: adaptive engine, prediction model
- Web: exam prep dashboard, planner

**Acceptance Criteria**:
- Full MDCAT prep flow functional
- Score prediction shows reasonable accuracy
- Study planner generates personalized schedule

---

## 5. Environment Variables Reference

### API Service (Railway)
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
NODE_ENV=production
PORT=8080
API_URL=https://api.teacher.ac.pk
CORS_ORIGINS=https://teacher.ac.pk,https://admin.teacher.ac.pk
UPLOAD_PATH=/app/uploads/images
CDN_BASE_URL=https://api.teacher.ac.pk
JWT_ACCESS_SECRET=<128 char hex>
JWT_REFRESH_SECRET=<128 char hex>
```

### Local Development
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/teacher
REDIS_URL=redis://localhost:6379
NODE_ENV=development
PORT=4000
```

---

## 6. Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-12-26 | Initial MASTER_PLAN.md created | AI Agent |

---

*This document is the ONLY planning/spec/architecture document for teacher.ac.pk. Do not create additional planning files.*

