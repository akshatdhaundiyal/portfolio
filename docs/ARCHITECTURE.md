# System Architecture: High-Level Overview

This document provides a concise map of the Executive AI PM & Applied ML Engineering Portfolio Platform.

## 🏗️ Deployment Topology

The system is a production-grade full-stack web platform built on modern Next.js 15:

1. **Full-Stack Application (Next.js 15 App Router & React 19)**:
   - Server-side rendering (SSR) and Incremental Static Regeneration (ISR).
   - Unified API Route Handlers (`app/api/`) for auth, content CMS, client portal, and telemetry.
2. **Database & Persistence (Prisma ORM & PostgreSQL)**:
   - Typed schema with migrations for Projects, Blogs, Clients, Invoices, Inquiries, and Authentication.
   - Dual-tier data access: Prisma client with graceful offline in-memory fallback for local dev.
3. **Containerization & Cloud**:
   - Single-container multi-stage standalone `Dockerfile` deployed to **Google Cloud Run** or Docker Compose.

## 📂 Domain Partitioning Architecture

The application is structured into 5 core decoupled domains:

```
├── app/
│   ├── (showcase)/             # Creative Editorial & Chalkboard Domain
│   │   ├── layout.tsx          # Chalkboard texture, SVG grain filter, 5-pillar Navbar & Footer
│   │   ├── page.tsx            # Executive Landing Narrative & 3D computational terrain
│   │   ├── about/page.tsx      # Strategic Trajectory & 3-Stage Evolution
│   │   ├── work/page.tsx       # Flagship Case Studies & Physical Artifacts
│   │   ├── resume/page.tsx     # Executive Resume Hub (Interactive & Print/PDF export)
│   │   └── blog/               # Technical Papers & Dynamic Reader ([slug])
│   ├── (platform)/             # Precision B2B Client SaaS Domain (Zero Chalk)
│   │   ├── layout.tsx          # Sleek Linear/Stripe layout with PlatformHeader & PlatformFooter
│   │   ├── portal/page.tsx     # Client Dashboard (Milestones, Invoices, Deliverables)
│   │   ├── inquiry/page.tsx    # Commercial Client Intake & Interactive Scope Estimator
│   │   └── admin/              # Super Admin Studio Workbench & CMS
│   └── api/                    # RESTful Route Handlers
├── components/
│   ├── platform/               # PlatformHeader, PlatformFooter, InquiryEstimator, ClientCards
│   ├── resume/                 # Resume layout, experience timeline, skills matrix, print button
│   ├── blog/                   # BlogCard, BlogContentRenderer, Catalog filters
│   ├── nav/                    # WritingFlyout, ResumeFlyout, Navigation primitives
│   └── admin/                  # Studio workbench, blog editor, project orderer, CRM modals
└── lib/                        # Prisma client, auth session, domain data services with offline fallbacks
```

## 🎨 Dual Design System Governance
The platform isolates its visual themes into two dedicated design specifications to prevent stylistic bleed:
- [SHOWCASE_DESIGN.md](file:///d:/lab/projects/portfolio_platform/docs/design/SHOWCASE_DESIGN.md): Visual guidelines for the studio chalkboard, hand-drawn vector sketches, editorial serif/inter typography, and print CV.
- [PLATFORM_DESIGN.md](file:///d:/lab/projects/portfolio_platform/docs/design/PLATFORM_DESIGN.md): Visual guidelines for the high-trust, high-density B2B SaaS interface (hairline borders, monospace metrics, zero chalk).

## ⚡ Key Invariant Principles
- **Print & Recruiter Ready**: `/resume` is styled with `@media print` for single-click clean PDF export.
- **Client & Admin Separation**: Clients access `/portal` (milestones, deliverables, invoices), while administrators access `/admin`.
- **Subdomain Routing**: `platform.akshatdhaundiyal.com` routes cleanly via `middleware.ts` to `/portal` or `/inquiry`.
- **Offline Resilient**: Data services in `lib/` seamlessly fall back to deterministic local datasets if a PostgreSQL database is not connected.

