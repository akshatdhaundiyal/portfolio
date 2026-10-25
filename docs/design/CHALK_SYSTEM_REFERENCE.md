# 🎨 Centralized Chalk Design System Reference

This document serves as the official developer and authoring reference for the Chalk Design System.

---

## 🏛️ Architecture & Single Source of Truth

All global variables, stroke weights, animation durations, roughness levels, and palette colors are centralized in:
`components/chalk/chalkConfig.ts`

```ts
import { chalkConfig } from "@/components/chalk/chalkConfig";
```

Any modification to `chalkConfig.ts` cascades across every chalk component and page site-wide.

---

## 🧩 Component Primitives

### 1. `<ChalkCard>`
The core surface container for cards, panels, and content blocks.

```tsx
import ChalkCard from "@/components/chalk/ChalkCard";

<ChalkCard variant="slate" accentColor="#d94e34" cornerTicks interactive>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card body content</p>
  </div>
</ChalkCard>
```

#### Props:
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"slate"` \| `"blueprint"` \| `"interactive"` \| `"callout"` | `"slate"` | Card surface style |
| `accentColor` | `string` | `chalkConfig.colors.vermilion` | Top bar or border accent |
| `cornerTicks` | `boolean` | `false` | Renders technical `┌ ┐ └ ┘` corner ticks |
| `interactive` | `boolean` | `false` | Enables cursor pointer & hover elevation |
| `className` | `string` | `""` | Extra Tailwind utilities |

---

### 2. `<ChalkSectionHeading>`
Consistent, high-contrast editorial section headers with rough sketch accents and handwritten margin notes.

```tsx
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";

<ChalkSectionHeading
  title="Featured Systems"
  symbol="▶"
  symbolColor="#d94e34"
  note="production machine learning architectures"
  actionLink={{ href: "/work", label: "All Works" }}
/>
```

#### Props:
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | *(required)* | Main heading text |
| `symbol` | `string` | `"▶"` | Accent glyph (`▶`, `✎`, `⁕`, `⌘`) |
| `symbolColor` | `string` | `chalkConfig.colors.vermilion` | Color for symbol |
| `note` | `string` | `undefined` | Playful handwritten cursive note |
| `actionLink` | `{ href: string, label: string }` | `undefined` | Right-aligned link |

---

### 3. `<ChalkMetricBadge>`
High-signal metric callout with hand-drawn circle or box.

```tsx
import ChalkMetricBadge from "@/components/chalk/ChalkMetricBadge";

<ChalkMetricBadge
  value="+$12M"
  label="Audit Exposure Lift"
  accentColor="#10b981"
  shape="circle"
/>
```

---

### 4. `<ChalkButton>`
Interactive CTA button with sketchy border and hover animations.

```tsx
import ChalkButton from "@/components/chalk/ChalkButton";
import { ArrowUpRight } from "lucide-react";

<ChalkButton href="/blog/my-post" variant="primary" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
  Read Case Study
</ChalkButton>
```

---

### 5. `<ChalkAnnotation>`
Wrap inline words or statistics with hand-drawn rough strokes.

```tsx
import ChalkAnnotation from "@/components/chalk/ChalkAnnotation";

<ChalkAnnotation type="circle" color="#10b981" trigger="inView">
  +$12M
</ChalkAnnotation>
```

**Supported Types**: `circle`, `underline`, `box`, `bracket`, `strike`, `highlight`.

---

## 🖥️ Live Component Preview
To visually inspect and test all chalk components in real time:
Navigate to `/design-system` in your local development environment.
