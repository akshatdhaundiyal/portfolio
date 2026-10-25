# System Architecture: High-Level Overview

This document provides an architectural map of the Executive AI Product Strategy & Applied ML Engineering Portfolio Platform.

---

## 🏗️ Deployment Topology

The system is a production-grade full-stack web platform built with **Next.js 15 (App Router)** and **React 19**:

1. **Full-Stack Application**:
   - Server-side rendering (SSR) and Incremental Static Regeneration (ISR with 60s cache invalidation) for sub-10ms response times.
   - Unified API Route Handlers (`app/api/`) for authentication, blog CMS, career experience management, and project ordering.
2. **Database & Persistence (Prisma ORM & PostgreSQL)**:
   - Strongly-typed relational schema with models for `Project`, `Experience`, `Blog`, `Setting`, and `User`.
   - Dual-tier data resilience: Prisma client with graceful offline in-memory fallback (`lib/data/`) for local development without database lock-in.
3. **Containerization & Cloud**:
   - Multi-stage standalone `Dockerfile` ready for deployment to **Google Cloud Run** or local orchestration via `docker-compose.yml`.

---

## 📂 Domain Partitioning Architecture

The application is structured into modular domains:

```
├── app/
│   ├── page.tsx               # Flagship Editorial Showcase (ISR with 60s cache)
│   ├── work/page.tsx          # Dedicated Case Studies & Builder Arsenal
│   ├── resume/page.tsx        # Printable Executive CV (Clean @media print export)
│   ├── blog/                  # Technical Papers catalog & dynamic reader ([slug])
│   ├── about/page.tsx         # Strategic Trajectory & 3-Stage Evolution
│   ├── admin/                 # Super Admin Studio Workbench & CMS
│   │   ├── projects/          # Showcase project authoring & ordering
│   │   ├── experience/        # Career milestones & role management
│   │   ├── blogs/             # Technical paper CMS & syndication
│   │   └── settings/          # Identity, contact, and bio settings
│   └── api/                   # RESTful Route Handlers (auth, blogs, experience, projects)
├── components/
│   ├── chalk/                 # Tactile Chalkboard design system (Rough.js, SVG grit)
│   │   ├── diagrams/          # Interactive blueprints (MediaChronicle, ActuarialGlm, ClaimsNlp)
│   │   ├── SlateProjectCard.tsx # Flagship blackboard project frames
│   │   └── KineticMetricStrip.tsx # Live metrics counter and telemetry
│   ├── artifacts/             # Physical Polymorphic Artifact Skins (boarding pass, crt)
│   ├── background/            # Subtle neural wireframe terrain canvas & atmospheric dust
│   ├── resume/                # Printable CV layout & PrintResumeButton
│   ├── blog/                  # BlogCard and dynamic markdown renderer
│   └── admin/                 # Studio navigation, forms, and editors
├── lib/                       # Prisma client, auth session, domain data services with offline fallbacks
│   ├── data/                  # Static deterministic fallbacks (projects, experience, blogs, settings)
│   ├── experience.ts          # Career history service with DB fallback
│   ├── projects.ts            # Project showcase service with DB fallback
│   ├── blogs.ts               # Blog service with DB fallback
│   └── settings.ts            # Site settings service with DB fallback
└── prisma/                    # Relational schema (Project, Experience, Blog, Setting, User) & seed
```

---

## 🎨 Interactive Blackboard Workbench Architecture

### 1. Interactive 3-Pillar Architectural Blueprints
The hero section hosts an interactive system schematic that lets recruiters and technical leaders inspect 3 core engineering domains:
- **01 Vision & Edge**: Local YOLOv8 inference pipeline with sub-100ms on-device biometrics and zero-cloud egress.
- **02 Enterprise ML**: Two-stage compound GLM pricing architecture (Poisson frequency × Gamma severity) unlocking +$12M in annual premium adjustments.
- **03 Cloud Inference**: Google Vertex AI NLP pipeline extracting unstructured injury severity with <85ms SLA.

### 2. Physical Polymorphic Artifact Skins
Case studies are rendered as physical, tangible real-world artifacts (flight boarding passes, vintage CRT terminals, train dispatch tickets, and graphite slate boards) rather than generic web cards, communicating craft and attention to detail.

### 3. Dynamic Career Experience Engine
- The `/resume` page and career history are backed by the Prisma `Experience` model.
- Includes a dedicated admin studio at `/admin/experience` for reordering roles, updating key metric highlights, and tuning display priorities.
- Deterministic offline fallbacks in `lib/data/experience.ts` guarantee page rendering even if PostgreSQL is offline.

### 4. Motion & Animation (GSAP & Framer Motion)
- **GSAP (`gsap`, `@gsap/react`)**: Used for SVG path drawing, hand-drawn blackboard chalk reveals, and staggered card entrances.
- **Framer Motion**: Used for fluid layout transitions, modal reveals, and accordion expanding states.

---

## 🎨 Design System Discipline

The platform adheres to [SHOWCASE_DESIGN.md](file:///d:/lab/projects/portfolio/docs/design/SHOWCASE_DESIGN.md):
- Creative chalkboard textures, Rough.js hand-drawn annotations, tactile physical artifact skins, and editorial serif typography.
- Monospace metadata labels and authentic ink-stamp seals (`.traditional-seal`).
- Print-optimized CSS (`@media print`) on `/resume` for single-click clean PDF generation.

---

## ⚡ Deterministic Verification Contract

Every modification must pass the three verification gates before completion:
1. `npx prisma validate` — Schema syntax and relation integrity.
2. `npx tsc --noEmit` — Strict TypeScript compilation.
3. `npm run lint` — ESLint rules and Next.js invariants.
