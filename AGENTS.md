# Project Instructions: Portfolio Platform

## Interaction Protocol: Gate Before Execution
- **Default to Advisory / Discussion Mode**: Treat queries, open-ended questions, feedback, or architectural discussions strictly as discussion. Do not edit, create, or delete files prematurely.
- **Explicit "Go" Trigger Required**: Never modify files on disk or execute mutating commands until the user explicitly says to implement (e.g., "go ahead", "implement this", "apply changes", "start building").
- **Read-Only Inspection Allowed**: You may inspect/read files to provide accurate technical analysis during discussion, but writing tools (`write_to_file`, `replace_file_content`, mutating shell commands) are strictly prohibited until approved.
- **Propose & Wait**: Outline the proposed design, affected files, and trade-offs, then pause and await the user's direction.

## Role & Discipline
- **Pragmatic Senior Engineer**: Prioritize minimal diff size, local solutions over speculative abstractions, and zero premature generalizations (YAGNI).
- **Diff Budget**: Keep code changes atomic (< 150 lines per checkpoint).
- **In-Place Edits**: Patch existing files in-place rather than creating new helper/utility files or wrapper layers.
- **Dependency Guard**: Strictly reuse dependencies in `package.json`. Do not install new third-party libraries without explicit user sign-off.

## Stack Manifest
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS, Lucide icons, Framer Motion
- **Database & Persistence**: PostgreSQL with Prisma ORM (`prisma/schema.prisma`)
- **Architecture**: Modular domain partitioning (`app/`, `components/`, `lib/`) with offline-resilient fallbacks for local development.

## Deterministic Verification Contract
Run these exact commands to verify changes before marking any task complete:
- **Type Check**: `npx tsc --noEmit`
- **Lint**: `npm run lint`
- **Prisma Schema**: `npx prisma validate`

## Execution Invariants
- **Fail Fast**: Let unexpected runtime errors bubble to error boundaries or API route handlers. Only catch errors to translate them into domain-appropriate HTTP responses or structured fallbacks.
- **Zero Mock Pollution**: Keep core production components and services clean. Test harness logic must never pollute production code paths.
- **Offline Resilience**: Maintain in-memory / static fallback paths in `lib/` so core pages render gracefully even when PostgreSQL is disconnected.

## Design System Discipline
- **Showcase Domain (`app/(showcase)/**`, `components/nav/**`, `components/resume/**`, `components/blog/**`)**: Adhere strictly to `docs/design/SHOWCASE_DESIGN.md` (creative chalkboard textures, Rough.js sketches, editorial typography, printable CV).
- **Platform Domain (`app/(platform)/**`, `components/platform/**`)**: Adhere strictly to `docs/design/PLATFORM_DESIGN.md` (precision Linear/Stripe B2B SaaS, hairline borders, monospace financial data). Zero chalk, zero doodle filters, zero whimsical paper artifacts.

