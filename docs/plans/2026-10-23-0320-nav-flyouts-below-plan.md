# Implementation Plan: Reposition Navbar Flyouts Below Navigation Links

**Date**: 2026-10-23  
**Status**: Completed  
**Slug**: `nav-flyouts-below`

---

## 1. Problem Statement & Scope Freeze
- **Problem**: In `components/Navbar.tsx`, interactive hover popups and hand-drawn doodles were previously positioned to the right (`left-full ml-2.5`). When any link was hovered (e.g. `about`), its popup rendered directly on top of the adjacent link (`Work`), making it illegible and difficult to click.
- **Goal**: Anchor all flyouts directly below their respective links (`top-full left-1/2 -translate-x-1/2`), completely eliminating horizontal collisions.
- **Non-Goals**:
  - Do not introduce heavy dropdown libraries or third-party menu frameworks.
  - Do not alter the underlying SVG doodles or visual styles, only their spatial alignment and layout flow.

---

## 2. Architecture & File Breakdown

### Target Files Modified:
1. `components/nav/AboutFlyout.tsx`:
   - Repositioned: `top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center`
2. `components/nav/WorkFlyout.tsx`:
   - Repositioned: `top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center`
3. `components/nav/WritingFlyout.tsx`:
   - Repositioned: `top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center`
4. `components/nav/ResumeFlyout.tsx`:
   - Repositioned: `top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center`
5. `components/nav/ConnectFlyout.tsx`:
   - Repositioned: `top-full mt-2.5 left-1/2 -translate-x-1/2`
   - Reformat icons into a compact 1x4 horizontal row (`flex items-center gap-1.5 p-1.5`)
6. `components/nav/LoginFlyout.tsx`:
   - Repositioned: `top-full mt-2.5 left-1/2 -translate-x-1/2`
7. `components/Navbar.tsx`:
   - Removed artificial lateral margins from Connect and Login items.
   - Adjusted bottom padding to `pb-6 sm:pb-10 lg:pb-16` for visual clearance.

---

## 3. Verification Contract
- `npx tsc --noEmit` -> Passed (code 0)
- `npm run lint` -> Passed (code 0)
- `npx prisma validate` -> Passed (code 0)
