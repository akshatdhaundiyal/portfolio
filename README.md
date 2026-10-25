# 🚀 Executive AI Product Strategy & Applied ML Engineering Portfolio

An executive-grade, full-stack portfolio platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Framer Motion**, and **Prisma ORM (PostgreSQL)**.

Designed for an experienced Data Scientist pursuing an MBA, positioning at the intersection of **Technical AI Product Management (AI PM)** and **Senior Applied AI / Machine Learning Engineering**.

Synthesizes the design principles of **Jackie Hu** and **Jackie Zhang** (tactile editorial artifact skins, prominent metric badges, "Learnt that..." retrospectives, and chalkboard blueprint annotations) with enterprise-grade full-stack architecture.

---

## 🌟 Key Capabilities

1. **Interactive Blackboard System Blueprints (`/`)**:
   - Dynamic 3-pillar architectural switchboard in the hero section allowing recruiters to inspect real engineering schematics:
     - **01 Vision & Edge**: Local YOLOv8 inference pipeline with sub-100ms biometrics and zero-cloud egress.
     - **02 Enterprise ML**: Compound GLM pricing architecture (Poisson frequency × Gamma severity) unlocking **+$12M in annual premium adjustments** at EXL Service.
     - **03 Cloud Inference**: Google Vertex AI NLP pipeline extracting unstructured claimant injury severity with **<85ms SLA**.

2. **Polymorphic Physical Artifact Skins**:
   - Case studies rendered as tangible real-world objects (airline boarding passes, vintage CRT phosphor displays, transit tickets, and dark slate frames) rather than generic web cards.

3. **Dynamic Career Experience & Printable Resume (`/resume`)**:
   - Career history backed by the Prisma `Experience` database model with instant offline fallbacks.
   - Formatted with `@media print` rules for clean, single-click PDF export suitable for recruiters and executive hiring committees.

4. **Super Admin Dynamic Studio (`/admin`)**:
   - Passcode-protected administrative studio (`ADMIN_PASSWORD`).
   - Dedicated management workspaces for:
     - **Projects Studio**: Author, reorder, and feature portfolio case studies.
     - **Experience Studio**: Add, edit, and reorder career roles and bullet-point highlights.
     - **Articles Studio**: Rich Markdown authoring with 1-click Medium syndication.
     - **Settings Studio**: Update bio, contact information, social links, and credentials.

5. **Offline-Resilient Architecture**:
   - Built-in static fallbacks in `lib/data/` ensure core pages render gracefully during local development even when PostgreSQL is disconnected.

---

## 🏗️ Project Structure

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
│   ├── artifacts/             # Physical Polymorphic Artifact Skins
│   ├── background/            # Subtle neural wireframe terrain canvas & atmospheric dust
│   ├── resume/                # Printable CV layout & PrintResumeButton
│   ├── blog/                  # BlogCard and dynamic markdown renderer
│   └── admin/                 # Studio navigation, forms, and editors
├── lib/                       # Prisma client, auth session, domain data services
│   ├── data/                  # Static deterministic fallbacks (projects, experience, blogs, settings)
│   ├── experience.ts          # Career history service with DB fallback
│   ├── projects.ts            # Project showcase service with DB fallback
│   ├── blogs.ts               # Blog service with DB fallback
│   └── settings.ts            # Site settings service with DB fallback
├── prisma/                    # PostgreSQL schema & seed script
└── Dockerfile                 # Multi-stage standalone build for Google Cloud Run
```

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Database & Generate Types
```bash
npx prisma validate
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```

Open `http://localhost:3000` to view the portfolio.

---

## 🚢 Production Verification Contract

Before deploying or committing changes, run the project's deterministic verification suite:
```bash
npx tsc --noEmit
npm run lint
npx prisma validate
```
