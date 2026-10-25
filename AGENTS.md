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
- **Dependency Guard**: Strictly reuse dependencies in `package.json`. Do not install new third-party libraries (e.g., GSAP) without explicit user sign-off.

### Code Minimalism & YAGNI Directive
| Forbidden Pattern | Mandatory Replacement |
| :--- | :--- |
| **Premature Abstractions** (Factories, Strategy/Adapter patterns, Abstract Base Classes, interface layers for single implementations) | Write direct, concrete functions or flat components/hooks. Prefer a flat procedural function over complex class hierarchies. |
| **Speculative Error Handling** (Defensive `try/catch` wrappers, null-coalescing fallbacks, unused edge-case branches) | Assume inputs are valid and match TypeScript annotations. Only handle explicit error scenarios specified in requirements or I/O boundaries. |
| **Extra Helpers & Service Classes** (Creating utility modules or multi-file helpers) | Write logic inline directly inside the single requested function, hook, or component module. |
| **New Dependencies** (Introducing third-party packages or helper libraries) | Strictly reuse standard library modules and dependencies already in `package.json`. |
| **Unsolicited File Creation** (Creating new configuration, type, or helper files) | Patch and extend existing files in-place unless explicitly requested to create a new module. |
| **Hardcoded Mocks & Hacks in Core Code** (Injecting temporary if-checks, hardcoded response strings, or ad-hoc mock branches into production code) | Keep components, route handlers, and `lib/` clean. Isolate static fallback datasets strictly within `lib/data/` and test fixtures. |

## Stack Manifest
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS, Lucide icons, Framer Motion
- **Animation**: GSAP (`gsap`, `@gsap/react`), Framer Motion
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

## Motion & Editorial Animation Invariants (GSAP & Framer Motion)
1. **Lifecycle & Cleanup**: Always use `@gsap/react`'s `useGSAP()` hook with appropriate dependency arrays, or clean up GSAP timelines/tweens in `useEffect` cleanup return to prevent memory leaks and zombie animations.
2. **Transforms & Performance**: Animate using GPU-accelerated CSS properties (`transform: translate3d/scale/rotate`, `opacity`) rather than layout-triggering properties (`width`, `height`, `top`, `left`).
3. **Reduced Motion**: Respect `prefers-reduced-motion` media queries across all kinetic metric strips and chalk path animations.
4. **Rough.js SVG Stability**: Seed or memoize Rough.js SVG generations to prevent layout jumps or jitter on component re-renders.

## Design System Discipline
- **Public Showcase & Editorial (`app/`, `components/chalk/**`, `components/artifacts/**`, `components/resume/**`, `components/blog/**`)**: Adhere strictly to `docs/design/SHOWCASE_DESIGN.md` (creative chalkboard textures, Rough.js sketches, tactile artifact skins, editorial typography, printable CV).
- **Admin Studio (`app/admin/**`, `components/admin/**`)**: Clean, functional studio interface for content authoring, project ordering, and site management.


