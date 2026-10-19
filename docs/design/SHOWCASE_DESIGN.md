# Design System: Showcase & Editorial

**Scope**: `app/(showcase)/**` (`/`, `/about`, `/work`, `/resume`, `/blog`, `/blog/[slug]`), `components/showcase/**`, `components/nav/**`, `components/blog/**`, `components/resume/**`.

---

## 1. Philosophy & Brand Essence

The Showcase domain embodies **The Craft of Engineering & Thought Leadership**. It combines the tactile ambiance of a creative engineer's studio chalkboard, editorial publishing, and Swiss typography. It should feel deeply authentic, expressive, and human—the antithesis of a generic corporate template.

* **Metaphor**: A mathematician or systems architect's blackboard + an editorial engineering journal.
* **Emotional Target**: Curiosity, craftsmanship, technical mastery, and tactile engagement.

---

## 2. Color Tokens & Surface Hierarchy

```css
/* Core Canvas & Surfaces */
--showcase-canvas: #0c0d12;          /* Deep blackboard charcoal */
--showcase-surface: #14161f;         /* Chalkboard slate panel */
--showcase-surface-hover: #1c1e2b;   /* Active slate highlight */
--showcase-border: rgba(255, 255, 255, 0.12); /* Subtle chalk boundary */

/* Chalk & Accent Palette */
--showcase-chalk-white: #f3f4f6;     /* Primary text / main chalk stroke */
--showcase-chalk-muted: #9ca3af;     /* Secondary / pencil notes */
--showcase-chalk-yellow: #fef08a;    /* Highlight doodles & important badges */
--showcase-chalk-cyan: #7dd3fc;      /* Architecture diagrams / active links */
--showcase-chalk-coral: #fca5a5;     /* Experimental notes / dates */
--showcase-chalk-emerald: #86efac;   /* Deployed systems / active status */
```

### Tailwind Utilities Mapping
- **Canvas / Background**: `bg-[#0c0d12]`, `bg-neutral-950` with ambient SVG grain.
- **Card Surfaces**: `bg-neutral-900/60`, `backdrop-blur-md`, `border border-white/10`.
- **Text Color Hierarchy**:
  - Primary Headlines: `text-neutral-100` (`font-bold`, `tracking-tight`)
  - Body & Editorial: `text-neutral-300` / `text-neutral-400`
  - Handwritten / Chalk annotations: `text-amber-200/90`, `text-cyan-200/90`

---

## 3. Textures, Lighting & Organic Imperfections

1. **Chalk Grit Filter (`ChalkGritFilter`)**:
   - Injected in [app/(showcase)/layout.tsx](file:///d:/lab/projects/portfolio_platform/app/(showcase)/layout.tsx).
   - Applied to decorative SVG borders, underlines, and sketch elements.
2. **Rough.js Vector Sketching**:
   - Used for organic box borders, circular badges, navigation underlines, and dynamic arrows.
   - Stroke roughness: `0.8` to `1.5` with hand-drawn wobble.
3. **Desk / Topographic 3D Canvas**:
   - Three.js wireframe landscape mounted selectively on hero sections to visualize computational depth.
4. **Ticket Stubs & Perforated Edges**:
   - Perforated circular notches and receipt-style typography for footers and case study cards.

---

## 4. Typography System

| Role | Font Family | Weight & Style | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Inter / Editorial Serif | 800 / 900 ExtraBold | `-0.03em` | Page headlines, showcase titles |
| **Section Header** | Inter Display | 700 Bold | `-0.02em` | Section anchors, card titles |
| **Editorial Body** | Inter | 400 Regular / 1.7 Line Height | `normal` | Blog articles, about narrative |
| **Code & Technical** | JetBrains Mono / Geist Mono | 500 Medium | `-0.01em` | Metrics (`+$12M`, `70%`), tags, dates |
| **Chalk Notes** | Caveat / Hand-drawn cursive | 500 Medium | `+0.02em` | Sketch callouts, flyout doodles |

---

## 5. Standard Component Patterns

### 5.1 Chalk Navigation Bar ([components/Navbar.tsx](file:///d:/lab/projects/portfolio_platform/components/Navbar.tsx))
- **5-Pillar Architecture**: `work`, `writing`, `about`, `resume`, `portal`.
- **Hover Micro-interactions**: Animated hand-sketched chalk underlines using Framer Motion.
- **Interactive Flyouts**:
  - [WritingFlyout.tsx](file:///d:/lab/projects/portfolio_platform/components/nav/WritingFlyout.tsx): Category filters, recent essay cards.
  - [ResumeFlyout.tsx](file:///d:/lab/projects/portfolio_platform/components/nav/ResumeFlyout.tsx): Quick role summaries, executive snapshot, PDF trigger.

### 5.2 Single-Page Executive Resume ([app/(showcase)/resume/page.tsx](file:///d:/lab/projects/portfolio_platform/app/(showcase)/resume/page.tsx))
- **Layout**: Clean printable executive CV.
- **Print Optimization**: Strict `@media print` rules removing navigation chrome, textures, and dark canvas; renders clean black-and-white vector text for physical/PDF export.

### 5.3 Editorial Blog Reading Experience ([app/(showcase)/blog/[slug]/page.tsx](file:///d:/lab/projects/portfolio_platform/app/(showcase)/blog/[slug]/page.tsx))
- **Typography Layout**: Max width `prose-neutral max-w-3xl`.
- **Callout Quotes**: Left-bordered with chalk amber accents and italic typography.
- **Syntax Highlighting**: Deep slate background with crisp token contrast.

---

## 6. Deliberate Anti-Patterns (Strictly Avoid)

- ❌ **No Sterile Corporate Gradients**: Never use generic purple-to-pink linear gradients.
- ❌ **No Flat Gray Box Blandness**: Cards must always have subtle depth, grain, or border articulation.
- ❌ **No Over-Sanitized Sans-Only Layouts**: Balance technical sans with monospace metadata or handwritten chalk cues.
- ❌ **Never Bleed into Platform Layouts**: Showcase visual styles (chalk filter, canvas, roughjs) must **never** be imported into `app/(platform)/**`.
