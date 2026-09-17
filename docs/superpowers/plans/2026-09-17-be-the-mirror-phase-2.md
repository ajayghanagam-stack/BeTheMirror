# Be the Mirror — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the Phase 1 homepage with 9 storytelling sections that carry the reader from provocation through philosophy to a closing CTA, reusing Phase 1's token system and component primitives.

**Architecture:** Server-rendered Next.js App Router pages composed of small typed React section components under `src/components/site/sections/`, plus two new reusable primitives (`MirrorMoment`, `AuthorCard`) and one tiny client-side `Reveal` component that gates a CSS-only fade/rise on `IntersectionObserver` + `prefers-reduced-motion`. No new dependencies; all styling via Tailwind v4 tokens declared in `globals.css`.

**Tech Stack:** Next.js (Phase 1 scaffold — currently 16.3.5), React 19, TypeScript, Tailwind CSS v4 (`@theme`), `next/image`, `next/link`.

**Spec:** The user's Phase 2 message dated 2026-09-17 (embedded in this repo's session transcript at `~/.claude/projects/-Users-ajaychandraghanagam-projects-be-the-mirror/0ab49cd1-1f6f-4d57-9866-3b514ca8d7ab.jsonl` line 283). Verbatim excerpts appear in this plan; the spec is the binding authority.

## Global Constraints

Every task's requirements implicitly include these.

- **Preserve Phase 1.** Do not rebuild Phase 1. Do not redesign the hero. Reuse Phase 1's tokens, `Container`, `Section` (with `bleed="none"|"full"`), `Button` (primary/secondary; supports `href` for link mode), `cn` helper. Import layout primitives from `@/components/layout/*`, UI primitives from `@/components/ui/*`.
- **Design system.** Backgrounds: near-black `var(--color-bg-primary)` / dark charcoal `var(--color-bg-secondary)`. Text: `var(--color-fg-primary)` / `var(--color-fg-secondary)` / `var(--color-fg-muted)`. Accent cyan `var(--color-accent-cyan)` and soft `var(--color-accent-cyan-soft)`. Highlight yellow `var(--color-accent-yellow)` and soft `var(--color-accent-yellow-soft)`. Borders `var(--color-border-subtle)`. No new hex/rgb values inline.
- **Yellow rules.** Yellow only for important words, short highlights, primary emphasis, occasional CTA. Never large backgrounds. Never every heading.
- **Cyan rules.** Cyan for structural accents, subtle lines, borders, transition cues, small glow, selective typography. No excessive neon glow.
- **Motion.** Allowed: subtle fade/rise on viewport enter, gentle opacity, mild background-light transition, simple Mirror Moment hover state. Forbidden: scroll hijacking, elaborate parallax, animated shattered glass, continuous glow, bouncing, large text movement. All motion respects `prefers-reduced-motion: reduce` — reduced users see final state, no animation.
- **No new dependencies.** No animation libraries, no icon packs, no image libraries. Use CSS. Use `next/image` for real book assets.
- **Book image usage.** Book Preview uses `/book-3-books.png` (1402×1122). Final CTA uses `/book-lying-flat.png` (1254×1254). Do not reuse `book-hero-45.png` beyond the Phase 1 hero.
- **No invented content.** No fabricated author bios, credentials, employers, or chapter claims. Placeholder author cards must clearly say `[Biography coming in Phase 3]`. Book copy stays at the level provided in the spec.
- **Verbatim copy.** All headings, statements, and Mirror Moment texts must match the spec character-for-character (see per-task briefs). Curly quotes `“…”` render via HTML entities (`&ldquo;`, `&rdquo;`); apostrophes in copy render as `&rsquo;`. British spellings kept. Em-dashes `—` rendered as `&mdash;`.
- **Responsive.** Every section is intentionally designed for desktop, tablet, mobile. No relying on browser wrap. Mobile order should reinforce narrative.
- **Accessibility.** Semantic `<section>` per section with `aria-labelledby` pointing at its heading. Logical heading hierarchy: hero owns the single `<h1>`; each Phase 2 section starts at `<h2>`. Contrast ≥ WCAG AA on body text. Meaningful `alt` on images. `Reveal` primitive is inert to keyboard/focus order.
- **Non-goals.** No dedicated Book/Authors/Ideas/Resources/Speaking/Contact pages. No CMS, DB, auth, analytics, payment, newsletter, admin, mirror-assessment. Placeholder CTAs point at in-page anchors (`#buy`, `#ideas`, `#authors`) or `#`.
- **Verification.** `npm run lint` (0 errors). `npx tsc --noEmit` clean. `npm run build` succeeds. `npm run dev` serves without console errors on the homepage.

## File Structure

**New files (created in the tasks below):**

- `src/components/motion/Reveal.tsx` — tiny client component; wraps children in a `<div>` that gains an `is-visible` class when it intersects the viewport; `prefers-reduced-motion` short-circuits to visible immediately. No dependencies beyond React.
- `src/components/ui/SectionHeading.tsx` — shared eyebrow + heading block; used by most Phase 2 sections to keep typography consistent.
- `src/components/ui/MirrorMoment.tsx` — reusable card for Mirror Moments. Consumed by Section 6, and reusable in future Ideas surfaces.
- `src/components/ui/AuthorCard.tsx` — reusable author card with initials placeholder, name, role line, deferred-bio note. Consumed by Section 8.
- `src/components/site/sections/OpeningProvocation.tsx` — Section 1.
- `src/components/site/sections/WhyTransformationsStruggle.tsx` — Section 2.
- `src/components/site/sections/FragmentationToTransformation.tsx` — Section 3.
- `src/components/site/sections/MirrorPhilosophy.tsx` — Section 4.
- `src/components/site/sections/WhoIsThisFor.tsx` — Section 5.
- `src/components/site/sections/MirrorMoments.tsx` — Section 6.
- `src/components/site/sections/BookPreview.tsx` — Section 7.
- `src/components/site/sections/AuthorsPreview.tsx` — Section 8.
- `src/components/site/sections/FinalCTA.tsx` — Section 9.

**Modified files:**

- `src/app/globals.css` — add `.reveal` / `.is-visible` fade/rise utility classes gated on `@media (prefers-reduced-motion: no-preference)`.
- `src/app/page.tsx` — compose the nine new sections after `<Hero />` in narrative order.

**Untouched (Phase 1 surface):** `Header`, `Hero`, `HeroBackground`, `BookVisual`, `Navigation`, `MobileNavigation`, `Container`, `Section`, `Button`, `cn`, `fonts`, `layout.tsx`.

## Preflight Component-Reuse Audit

- `Container` (`@/components/layout/Container`) — max-width `var(--container-site)`, responsive gutters. **Reused as-is** for every section.
- `Section` (`@/components/layout/Section`) — `<section>` wrapper with `py-[var(--spacing-section)]` and optional `bleed="full"`. **Reused as-is.** Section 3 and 9 pass `bleed="full"` for edge-bleed backgrounds.
- `Button` (`@/components/ui/Button`) — primary/secondary variants; `href` triggers `<Link>`. **Reused as-is** for CTAs in Sections 7 and 9. Uppercase tracking already baked in.
- Tokens in `globals.css` — Phase 1 already defines color/typography/spacing tokens covering everything Phase 2 needs. **No new tokens required** at plan authoring. If a section discovers a genuine gap, add it to `@theme` (never inline).
- `cn` (`@/lib/cn`) — used by all new components.

**Generalizations to make in Task 1:** none. Phase 1 primitives already suit Phase 2's needs. New shared UI (`SectionHeading`, `MirrorMoment`, `AuthorCard`) lives beside `Button` in `src/components/ui/`.

---

### Task 1: Motion foundation — `Reveal` + reduced-motion CSS + `SectionHeading`

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Modify: `src/app/globals.css` — append a `@layer utilities` block with `.reveal` / `.is-visible` and a `@media (prefers-reduced-motion: reduce)` override.

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`.
- Produces:
  - `Reveal({ as?: 'div'|'section'|'li'|'article', delayMs?: number, className?, children })` — client component. Renders `<Tag className={cn('reveal', className)} style={{ transitionDelay: delayMs+'ms' }}>`. On mount, if `matchMedia('(prefers-reduced-motion: reduce)').matches` → adds `is-visible` immediately. Otherwise attaches an `IntersectionObserver` (rootMargin `0px 0px -10% 0px`, threshold `0.1`) that adds `is-visible` once and disconnects.
  - `SectionHeading({ eyebrow?: string, id: string, children: ReactNode, align?: 'left'|'center', className? })` — renders an optional uppercase cyan eyebrow (`text-small`, tracking `0.28em`) and an `<h2 id={id}>` styled to `var(--text-h1)` with tight leading. `align='center'` centers both. Used across sections 2–9. Section 1 uses its own bespoke display type so does not consume this.

- [ ] **Step 1: Write `Reveal.tsx`**

```tsx
"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  delayMs?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({ as: Tag = "div", delayMs = 0, className, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Append reduced-motion CSS to `globals.css`** (after the existing `@layer base` block)

```css
@layer utilities {
  .reveal {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal,
    .reveal.is-visible {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
}
```

- [ ] **Step 3: Write `SectionHeading.tsx`**

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  id: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

export function SectionHeading({ eyebrow, id, align = "left", children, className }: Props) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-semibold leading-[1.05] tracking-[-0.015em] text-[color:var(--color-fg-primary)]",
          eyebrow ? "mt-4" : ""
        )}
        style={{ fontSize: "var(--text-h1)" }}
      >
        {children}
      </h2>
    </div>
  );
}
```

- [ ] **Step 4: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/Reveal.tsx src/components/ui/SectionHeading.tsx src/app/globals.css
git commit -m "feat(motion): add Reveal + SectionHeading + reduced-motion CSS"
```

---

### Task 2: Section 1 — Opening Provocation

**Files:**
- Create: `src/components/site/sections/OpeningProvocation.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `Reveal`.
- Produces: default export `OpeningProvocation`. Consumed by `page.tsx` in Task 11.

**Spec verbatim (copy exactly):**
- Primary: `“What if the biggest obstacle to transformation isn't technology?”`
- Reveal/follow: `“What if it's what we fail to see?”`
- Supporting paragraph 1: `Organizations often respond to transformation challenges by adding more technology, more process, more governance and more tools.`
- Supporting paragraph 2: `But the deeper challenge may be leadership, trust, behaviour, alignment and the way people experience change.`
- Emphasis: `technology` (in the primary line) stays default white/muted. `fail to see` (in the second line) is highlighted in yellow (`var(--color-accent-yellow)`).

- [ ] **Step 1: Write the section**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function OpeningProvocation() {
  return (
    <Section
      aria-labelledby="provocation-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p
              id="provocation-title"
              className="font-semibold leading-[1.1] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              &ldquo;What if the biggest obstacle to transformation isn&rsquo;t technology?&rdquo;
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <p
              className="mt-8 font-semibold leading-[1.1] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              &ldquo;What if it&rsquo;s what we{" "}
              <span className="text-[color:var(--color-accent-yellow)]">fail to see</span>?&rdquo;
            </p>
          </Reveal>

          <Reveal delayMs={220}>
            <p className="mx-auto mt-14 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Organizations often respond to transformation challenges by adding more technology,
              more process, more governance and more tools.
            </p>
          </Reveal>

          <Reveal delayMs={280}>
            <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              But the deeper challenge may be leadership, trust, behaviour, alignment and the way
              people experience change.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors. (Section is not yet imported anywhere; ok.)

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/OpeningProvocation.tsx
git commit -m "feat(section): add opening provocation"
```

---

### Task 3: Section 2 — Why Transformations Struggle

**Files:**
- Create: `src/components/site/sections/WhyTransformationsStruggle.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`.
- Produces: `WhyTransformationsStruggle`.

**Spec verbatim:**
- Heading: `WHY TRANSFORMATIONS STRUGGLE`
- Sub 1: `Transformation rarely fails because people don't understand the strategy.`
- Sub 2: `It often struggles because the organization experiences the change differently from the way leadership intended it.`
- Nine items, in this order: `Resistance`, `Misalignment`, `Lack of trust`, `Transformation fatigue`, `Silos`, `Poor communication`, `Fear of change`, `Technology-first thinking`, `AI without adoption`.
- Each item has one very short editorial line. Copy for the nine below (each is spec-original where given; the rest are short editorial framings that stay at the general level the spec allows — no invented book claims). Every line ends without a period except the two provided by the spec.

  1. `Resistance` — `What looks like resistance may actually be uncertainty, lack of trust or a rational response to previous change.` (verbatim from spec)
  2. `Misalignment` — `Strategy on paper and behaviour on the ground rarely tell the same story.`
  3. `Lack of trust` — `Change asks people to move first; trust decides whether they do.`
  4. `Transformation fatigue` — `After enough programmes, another one feels like weather to wait out.`
  5. `Silos` — `Local incentives quietly outrun the shared direction.`
  6. `Poor communication` — `What is announced and what is understood are rarely the same message.`
  7. `Fear of change` — `Under uncertainty, protecting what works can look like resistance.`
  8. `Technology-first thinking` — `A tool without adoption is a cost, not a capability.`
  9. `AI without adoption` — `Models scale in months; the organizations using them do not.`

- [ ] **Step 1: Write the section**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Item = { title: string; body: string };

const ITEMS: Item[] = [
  { title: "Resistance", body: "What looks like resistance may actually be uncertainty, lack of trust or a rational response to previous change." },
  { title: "Misalignment", body: "Strategy on paper and behaviour on the ground rarely tell the same story." },
  { title: "Lack of trust", body: "Change asks people to move first; trust decides whether they do." },
  { title: "Transformation fatigue", body: "After enough programmes, another one feels like weather to wait out." },
  { title: "Silos", body: "Local incentives quietly outrun the shared direction." },
  { title: "Poor communication", body: "What is announced and what is understood are rarely the same message." },
  { title: "Fear of change", body: "Under uncertainty, protecting what works can look like resistance." },
  { title: "Technology-first thinking", body: "A tool without adoption is a cost, not a capability." },
  { title: "AI without adoption", body: "Models scale in months; the organizations using them do not." },
];

export function WhyTransformationsStruggle() {
  return (
    <Section
      aria-labelledby="why-struggle-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 02" id="why-struggle-title" className="max-w-3xl">
            Why transformations struggle
          </SectionHeading>
        </Reveal>

        <Reveal delayMs={100}>
          <p className="mt-8 max-w-3xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Transformation rarely fails because people don&rsquo;t understand the strategy.
          </p>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-4 max-w-3xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            It often struggles because the organization experiences the change differently from the
            way leadership intended it.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.title} delayMs={80 * (i % 3)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-5">
                <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/WhyTransformationsStruggle.tsx
git commit -m "feat(section): add Why Transformations Struggle 3x3 grid"
```

---

### Task 4: Section 3 — Fragmentation → Reflection → Transformation

**Files:**
- Create: `src/components/site/sections/FragmentationToTransformation.tsx`

**Interfaces:**
- Consumes: `Container`, `Section` (with `bleed="full"`), `SectionHeading`, `Reveal`.
- Produces: `FragmentationToTransformation`.

**Spec verbatim:**
- Headline: `Transformation starts with reflection.`
- Supporting copy paragraph: `Before organizations can transform, they need to see clearly: what is working, what is not, how people are experiencing change, and what leaders themselves may need to do differently.`
- Left column heading: `FRAGMENTATION`. Items: `Resistance`, `Silos`, `Fear`, `Misalignment`, `Fatigue`, `Confusion`, `Low ownership`, `Technology without adoption`.
- Center column heading: `REFLECTION`. Short copy: `A pause to see what is actually happening — inside teams, inside leadership, inside ourselves.`
- Right column heading: `TRANSFORMATION`. Items: `Clarity`, `Trust`, `Alignment`, `Ownership`, `Learning`, `Adaptability`, `Change agents`, `Sustainable transformation`.

**Design cues:** left column uses `--color-fg-muted` tone and a subtle vertical fracture (thin cyan-soft accents along its left edge). Center column is centered, editorial. Right column uses `--color-fg-primary` and a soft cyan glow along its right edge. Desktop: three columns left→right. Mobile: stacked, order Fragmentation → Reflection → Transformation with a small vertical arrow separator (Unicode `↓` in a small text style).

- [ ] **Step 1: Write the section**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const FRAGMENTATION = [
  "Resistance",
  "Silos",
  "Fear",
  "Misalignment",
  "Fatigue",
  "Confusion",
  "Low ownership",
  "Technology without adoption",
];

const TRANSFORMATION = [
  "Clarity",
  "Trust",
  "Alignment",
  "Ownership",
  "Learning",
  "Adaptability",
  "Change agents",
  "Sustainable transformation",
];

export function FragmentationToTransformation() {
  return (
    <Section
      bleed="full"
      aria-labelledby="journey-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Section 03" id="journey-title">
              Transformation starts with reflection.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Before organizations can transform, they need to see clearly: what is working, what is
              not, how people are experiencing change, and what leaders themselves may need to do
              differently.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {/* LEFT — Fragmentation */}
          <Reveal className="relative order-1">
            <div className="relative border-l border-[color:var(--color-border-subtle)] pl-6">
              <span aria-hidden="true" className="absolute left-0 top-0 h-16 w-px bg-[color:var(--color-accent-cyan-soft)]" />
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-fg-muted)]">
                Fragmentation
              </p>
              <ul className="mt-6 space-y-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-muted)]">
                {FRAGMENTATION.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div aria-hidden="true" className="order-2 flex justify-center text-[color:var(--color-fg-muted)] lg:hidden">
            <span className="text-[length:var(--text-small)]">&darr;</span>
          </div>

          {/* CENTER — Reflection */}
          <Reveal className="order-3 lg:order-2" delayMs={100}>
            <div className="lg:pt-2 lg:text-center">
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
                Reflection
              </p>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                A pause to see what is actually happening &mdash; inside teams, inside leadership,
                inside ourselves.
              </p>
            </div>
          </Reveal>

          <div aria-hidden="true" className="order-4 flex justify-center text-[color:var(--color-fg-muted)] lg:hidden">
            <span className="text-[length:var(--text-small)]">&darr;</span>
          </div>

          {/* RIGHT — Transformation */}
          <Reveal className="order-5 lg:order-3" delayMs={200}>
            <div className="relative border-r border-[color:var(--color-border-subtle)] pr-6 lg:text-right">
              <span aria-hidden="true" className="absolute right-0 top-0 h-16 w-px bg-[color:var(--color-accent-cyan)]" />
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-yellow)]">
                Transformation
              </p>
              <ul className="mt-6 space-y-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-primary)]">
                {TRANSFORMATION.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/FragmentationToTransformation.tsx
git commit -m "feat(section): add Fragmentation to Transformation journey"
```

---

### Task 5: Section 4 — Be the Mirror Philosophy

**Files:**
- Create: `src/components/site/sections/MirrorPhilosophy.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`.
- Produces: `MirrorPhilosophy`.

**Spec verbatim:**
- Heading (two lines): `DON'T JUST MANAGE CHANGE.` / `BE THE MIRROR.`
- Supporting statement: `Being the mirror means helping people and organizations see what they may not easily see themselves.`
- Eight key ideas (each one line, verbatim):
  1. `It means questioning assumptions.`
  2. `Listening before prescribing.`
  3. `Understanding resistance rather than dismissing it.`
  4. `Recognizing how leadership behaviour shapes change.`
  5. `Creating trust.`
  6. `Surfacing uncomfortable realities.`
  7. `Helping teams see the difference between intention and experience.`
  8. `And being willing to examine our own role in the transformation.`

**Layout:** desktop = two-column, `grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16`; left holds the heading + supporting statement (sticky feel via `lg:sticky lg:top-24 lg:self-start`); right holds the eight ideas as a stacked editorial list with subtle cyan-soft left rule. Mobile stacks left → right.

- [ ] **Step 1: Write the section**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const IDEAS = [
  "It means questioning assumptions.",
  "Listening before prescribing.",
  "Understanding resistance rather than dismissing it.",
  "Recognizing how leadership behaviour shapes change.",
  "Creating trust.",
  "Surfacing uncomfortable realities.",
  "Helping teams see the difference between intention and experience.",
  "And being willing to examine our own role in the transformation.",
];

export function MirrorPhilosophy() {
  return (
    <Section
      aria-labelledby="philosophy-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <SectionHeading eyebrow="Section 04" id="philosophy-title">
                Don&rsquo;t just manage change.
                <br />
                <span className="text-[color:var(--color-accent-yellow)]">Be the mirror.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-8 max-w-md text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                Being the mirror means helping people and organizations see what they may not
                easily see themselves.
              </p>
            </Reveal>
          </div>

          <ul className="space-y-6 border-l border-[color:var(--color-accent-cyan-soft)] pl-6">
            {IDEAS.map((idea, i) => (
              <Reveal as="li" key={idea} delayMs={60 * i}>
                <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                  {idea}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/MirrorPhilosophy.tsx
git commit -m "feat(section): add Be the Mirror philosophy"
```

---

### Task 6: Section 5 — Who This Book Is For

**Files:**
- Create: `src/components/site/sections/WhoIsThisFor.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`.
- Produces: `WhoIsThisFor`.

**Spec verbatim:**
- Heading: `WHO IS THIS BOOK FOR?`
- Six audience blocks (five required + optional sixth — include all six):

  1. `For leaders asking:` — `“Why isn't our transformation working?”`
  2. `For technology leaders asking:` — `“Why isn't adoption following implementation?”`
  3. `For managers asking:` — `“How do I help my team navigate change?”`
  4. `For change agents asking:` — `“How do I influence change when I don't control everything?”`
  5. `For AI leaders asking:` — `“How do we make AI adoption an organizational capability?”`
  6. `For transformation professionals asking:` — `“How do we make change sustainable after the program ends?”`

**Layout:** two-column grid on `lg`; single column below. Each block: small cyan uppercase label (the `For … asking:` line), large quoted question in near-white, subtle divider between blocks. Reflective, not promotional. No CTAs.

- [ ] **Step 1: Write the section**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Block = { role: string; question: string };

const BLOCKS: Block[] = [
  { role: "For leaders asking:", question: "Why isn\u2019t our transformation working?" },
  { role: "For technology leaders asking:", question: "Why isn\u2019t adoption following implementation?" },
  { role: "For managers asking:", question: "How do I help my team navigate change?" },
  { role: "For change agents asking:", question: "How do I influence change when I don\u2019t control everything?" },
  { role: "For AI leaders asking:", question: "How do we make AI adoption an organizational capability?" },
  { role: "For transformation professionals asking:", question: "How do we make change sustainable after the program ends?" },
];

export function WhoIsThisFor() {
  return (
    <Section
      aria-labelledby="audience-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 05" id="audience-title" className="max-w-3xl">
            Who is this book for?
          </SectionHeading>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
          {BLOCKS.map((b, i) => (
            <Reveal as="li" key={b.role} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                  {b.role}
                </p>
                <p
                  className="mt-5 max-w-lg font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  &ldquo;{b.question}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/WhoIsThisFor.tsx
git commit -m "feat(section): add Who Is This Book For audience blocks"
```

---

### Task 7: `MirrorMoment` primitive + Section 6

**Files:**
- Create: `src/components/ui/MirrorMoment.tsx`
- Create: `src/components/site/sections/MirrorMoments.tsx`

**Interfaces:**
- `MirrorMoment` consumes `cn`. Produces `MirrorMoment({ index: number, children: ReactNode, className? })` — renders a dark card with a subtle cyan edge that intensifies on hover, an ordinal chip `01/02/03` (from `index`), and a large pull-quote area. Not a `Reveal` itself; the consuming section wraps each in `Reveal`.
- `MirrorMoments` consumes `Container`, `Section`, `SectionHeading`, `Reveal`, `MirrorMoment`. Produces `MirrorMoments`.

**Spec verbatim** (each Moment is a full quoted block; render curly quotes with entities, apostrophes with `&rsquo;`, and line breaks with `<br />` at the paragraph breaks the spec shows):

- Section title: `MIRROR MOMENTS`
- Section subtitle: `Short reflections for people leading change.`
- Moment 1: `“We often ask why people resist change. A better question may be: What about the change made resistance rational?”` — with paragraph breaks after `resist change.` and after `may be:`.
- Moment 2: `“Technology can change in months. Organizations rarely do.”` — with paragraph break after `months.`.
- Moment 3: `“Transformation isn't what leadership announces. It's what people experience.”` — with paragraph break after `announces.`.

**Design cues** (spec verbatim): black/dark card, subtle cyan edge or glow, selective yellow emphasis, premium typography, subtle reflection/fracture visual language, not overly decorative. Hover: cyan edge and shadow lift.

- [ ] **Step 1: Write `MirrorMoment.tsx`**

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  index: number;
  children: ReactNode;
  className?: string;
};

export function MirrorMoment({ index, children, className }: Props) {
  const label = String(index).padStart(2, "0");
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]",
        "transition-colors duration-300 hover:border-[color:var(--color-accent-cyan)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[color:var(--color-accent-cyan-soft)] transition-colors duration-300 group-hover:bg-[color:var(--color-accent-cyan)]"
      />
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
        Mirror Moment <span className="text-[color:var(--color-fg-muted)]">/ {label}</span>
      </p>
      <blockquote className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
        {children}
      </blockquote>
    </article>
  );
}
```

- [ ] **Step 2: Write `MirrorMoments.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MirrorMoment } from "@/components/ui/MirrorMoment";
import { Reveal } from "@/components/motion/Reveal";

export function MirrorMoments() {
  return (
    <Section
      aria-labelledby="moments-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 06" id="moments-title" className="max-w-3xl">
            Mirror Moments
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Short reflections for people leading change.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal delayMs={0}>
            <MirrorMoment index={1}>
              &ldquo;We often ask why people resist change.
              <br />
              <br />
              A better question may be:
              <br />
              <br />
              <span className="text-[color:var(--color-accent-yellow)]">
                What about the change made resistance rational?
              </span>
              &rdquo;
            </MirrorMoment>
          </Reveal>
          <Reveal delayMs={120}>
            <MirrorMoment index={2}>
              &ldquo;Technology can change in months.
              <br />
              <br />
              Organizations rarely do.&rdquo;
            </MirrorMoment>
          </Reveal>
          <Reveal delayMs={240}>
            <MirrorMoment index={3}>
              &ldquo;Transformation isn&rsquo;t what leadership announces.
              <br />
              <br />
              It&rsquo;s what people experience.&rdquo;
            </MirrorMoment>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/MirrorMoment.tsx src/components/site/sections/MirrorMoments.tsx
git commit -m "feat(section): add reusable MirrorMoment + three cards"
```

---

### Task 8: Section 7 — Book Preview (uses `book-3-books.png`)

**Files:**
- Create: `src/components/site/sections/BookPreview.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Button`, `Reveal`, `next/image`.
- Produces: `BookPreview`.

**Spec verbatim:**
- Heading: `THE BOOK`
- Lead: `Three perspectives.` / `Years of transformation experience.` / `One central idea.` (three lines)
- Question: `Are we willing to see what needs to change?`
- Supporting paragraph 1: `Be the Mirror explores transformation from the perspective of the people who lead it, experience it and help organizations navigate it.`
- Supporting paragraph 2: `It looks beyond tools and frameworks to the human realities of change — leadership, behaviour, trust, resistance and culture and the growing impact of AI.` — **Ruling:** the spec reads `leadership, behaviour, trust, resistance, culture and the growing impact of AI.` (a comma between `resistance` and `culture`). Use the spec's exact commas. Why: this is a verbatim-copy constraint. How to apply: implement `resistance, culture and the growing impact of AI.` with a comma after `resistance`.
- CTAs: `EXPLORE THE BOOK` (secondary variant, `href="#ideas"`), `BUY THE BOOK` (primary, `href="#buy"`).

**Image:** `/book-3-books.png`, intrinsic 1402×1122, aspect ~1.25:1. Use `next/image` with `width={1402} height={1122}`, `sizes="(min-width: 1024px) 560px, 100vw"`, `alt="The Be the Mirror hardcover shown as three stacked copies"`, `priority={false}`.

**Layout:** two-column on `lg`: image left (order 1 desktop, order 2 mobile), copy right. Book image gets a subtle cyan-soft glow underlay.

- [ ] **Step 1: Write the section**

```tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function BookPreview() {
  return (
    <Section
      aria-labelledby="book-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                style={{ background: "var(--color-accent-cyan-soft)" }}
              />
              <Image
                src="/book-3-books.png"
                alt="The Be the Mirror hardcover shown as three stacked copies"
                width={1402}
                height={1122}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <SectionHeading eyebrow="Section 07" id="book-title">
              The book
            </SectionHeading>

            <p
              className="mt-8 font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Three perspectives.
              <br />
              Years of transformation experience.
              <br />
              One central idea.
            </p>

            <p
              className="mt-8 max-w-xl font-medium leading-[1.35] text-[color:var(--color-accent-yellow)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Are we willing to see what needs to change?
            </p>

            <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror explores transformation from the perspective of the people who lead it,
              experience it and help organizations navigate it.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              It looks beyond tools and frameworks to the human realities of change &mdash;
              leadership, behaviour, trust, resistance, culture and the growing impact of AI.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#ideas" variant="secondary">Explore the Book</Button>
              <Button href="#buy" variant="primary">Buy the Book</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/BookPreview.tsx
git commit -m "feat(section): add Book Preview with 3-books image"
```

---

### Task 9: `AuthorCard` primitive + Section 8 — Authors Preview

**Files:**
- Create: `src/components/ui/AuthorCard.tsx`
- Create: `src/components/site/sections/AuthorsPreview.tsx`

**Interfaces:**
- `AuthorCard` consumes `cn`. Produces `AuthorCard({ name: string, role?: string, note?: string, className? })` — renders a portrait-shaped tile with a CSS-only initials placeholder (extracted from `name`), the name, an optional role line (default `"Author"`), and a small deferred-bio note (default `[Biography coming in Phase 3]`). No fabricated bios. No `alt` on real images (there are none). The initials block uses a subtle radial gradient of `var(--color-bg-secondary)` → `var(--color-bg-primary)` with a soft cyan outline.
- `AuthorsPreview` consumes `Container`, `Section`, `SectionHeading`, `Reveal`, `Button`, `AuthorCard`. Produces `AuthorsPreview`.

**Spec verbatim:**
- Heading (two lines): `THREE PERSPECTIVES.` / `ONE SHARED EXPERIENCE.`
- Supporting statement paragraph 1: `Transformation is never only about process or technology.`
- Supporting statement paragraph 2: `Ultimately, it is about people.`
- Three authors, in this order: `Lois Wortley`, `Ajay Ghanagam`, `Hiren Doshi`. Role line for each: `Author`. Deferred note: `[Biography coming in Phase 3]`.
- CTA: `MEET THE AUTHORS` (secondary variant, `href="#authors"`).

- [ ] **Step 1: Write `AuthorCard.tsx`**

```tsx
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  role?: string;
  note?: string;
  className?: string;
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function AuthorCard({
  name,
  role = "Author",
  note = "[Biography coming in Phase 3]",
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border p-6",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-[color:var(--color-accent-cyan-soft)]"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 70%)",
        }}
      >
        <span
          className="font-semibold tracking-[0.06em] text-[color:var(--color-fg-secondary)]"
          style={{ fontSize: "var(--text-display)" }}
        >
          {initialsOf(name)}
        </span>
      </div>

      <h3
        className="mt-6 font-semibold tracking-[-0.005em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {name}
      </h3>
      <p className="mt-1 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-accent-cyan)]">
        {role}
      </p>
      <p className="mt-3 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
        {note}
      </p>
    </article>
  );
}
```

- [ ] **Step 2: Write `AuthorsPreview.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { Reveal } from "@/components/motion/Reveal";

const AUTHORS = ["Lois Wortley", "Ajay Ghanagam", "Hiren Doshi"] as const;

export function AuthorsPreview() {
  return (
    <Section
      id="authors"
      aria-labelledby="authors-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Section 08" id="authors-title">
              Three perspectives.
              <br />
              One shared experience.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Transformation is never only about process or technology.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Ultimately, it is about people.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {AUTHORS.map((name, i) => (
            <Reveal key={name} delayMs={100 * i}>
              <AuthorCard name={name} />
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={200}>
          <div className="mt-12">
            <Button href="#authors" variant="secondary">Meet the Authors</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/AuthorCard.tsx src/components/site/sections/AuthorsPreview.tsx
git commit -m "feat(section): add AuthorCard + Authors Preview placeholders"
```

---

### Task 10: Section 9 — Final CTA (uses `book-lying-flat.png`)

**Files:**
- Create: `src/components/site/sections/FinalCTA.tsx`

**Interfaces:**
- Consumes: `Container`, `Section` (`bleed="full"`), `Button`, `Reveal`, `next/image`.
- Produces: `FinalCTA`.

**Spec verbatim:**
- Headline: `CHANGE STARTS WITH WHAT WE ARE WILLING TO SEE.`
- Supporting copy: `Be the Mirror is an invitation to look differently at transformation — and at the role each of us plays in making change possible.`
- Primary CTA: `BUY THE BOOK` (`href="#buy"`)
- Secondary CTA: `EXPLORE THE IDEAS` (`href="#ideas"`)

**Image:** `/book-lying-flat.png`, intrinsic 1254×1254 (square). `next/image` with `width={1254} height={1254}`, `sizes="(min-width: 1024px) 520px, 100vw"`, `alt="Be the Mirror hardcover lying flat"`.

**Layout:** two-column on `lg` (`grid-cols-[minmax(0,1fr)_minmax(0,520px)]`): copy left, book right. Subtle cyan-to-transparent radial glow behind the book. Not ecommerce banner — restrained, editorial.

- [ ] **Step 1: Write the section**

```tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <Section
      bleed="full"
      id="buy"
      aria-labelledby="final-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Section 09
            </p>
            <h2
              id="final-cta-title"
              className="mt-4 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Change starts with what we are{" "}
              <span className="text-[color:var(--color-accent-yellow)]">willing to see</span>.
            </h2>
            <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror is an invitation to look differently at transformation &mdash; and at
              the role each of us plays in making change possible.
            </p>

            <div id="ideas" className="mt-10 flex flex-wrap gap-4">
              <Button href="#buy" variant="primary">Buy the Book</Button>
              <Button href="#ideas" variant="secondary">Explore the Ideas</Button>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                style={{ background: "var(--color-accent-cyan-soft)" }}
              />
              <Image
                src="/book-lying-flat.png"
                alt="Be the Mirror hardcover lying flat"
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/FinalCTA.tsx
git commit -m "feat(section): add final CTA with lying-flat book image"
```

---

### Task 11: Wire homepage composition + full verification

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: all nine section components + existing `Header` and `Hero`.
- Produces: the completed homepage.

Narrative order (matches spec's Scroll Story section 1→10):

1. `<Hero />` (Phase 1)
2. `<OpeningProvocation />`
3. `<WhyTransformationsStruggle />`
4. `<FragmentationToTransformation />`
5. `<MirrorPhilosophy />`
6. `<WhoIsThisFor />`
7. `<MirrorMoments />`
8. `<BookPreview />`
9. `<AuthorsPreview />`
10. `<FinalCTA />`

- [ ] **Step 1: Rewrite `page.tsx`**

```tsx
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { OpeningProvocation } from "@/components/site/sections/OpeningProvocation";
import { WhyTransformationsStruggle } from "@/components/site/sections/WhyTransformationsStruggle";
import { FragmentationToTransformation } from "@/components/site/sections/FragmentationToTransformation";
import { MirrorPhilosophy } from "@/components/site/sections/MirrorPhilosophy";
import { WhoIsThisFor } from "@/components/site/sections/WhoIsThisFor";
import { MirrorMoments } from "@/components/site/sections/MirrorMoments";
import { BookPreview } from "@/components/site/sections/BookPreview";
import { AuthorsPreview } from "@/components/site/sections/AuthorsPreview";
import { FinalCTA } from "@/components/site/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <OpeningProvocation />
        <WhyTransformationsStruggle />
        <FragmentationToTransformation />
        <MirrorPhilosophy />
        <WhoIsThisFor />
        <MirrorMoments />
        <BookPreview />
        <AuthorsPreview />
        <FinalCTA />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: succeeds. Confirm homepage route builds. Note any warnings that touch Phase 2 code (unrelated warnings — e.g. `package-lock.json` parent notice — are pre-existing and non-blocking, ledgered in Phase 1).

- [ ] **Step 5: Dev server smoke**

Run: `npm run dev` (in background), then `curl -sS http://localhost:3000/ | grep -c "Mirror Moment"` — expect a count ≥ 3. Also `curl -sS http://localhost:3000/ | grep -o "What if the biggest obstacle to transformation isn.t technology?"` — expect one match. Kill dev server when done.

- [ ] **Step 6: Copy verification**

Grep the built HTML (or the section source files) for these exact substrings; each must appear at least once:

- `What if the biggest obstacle to transformation`
- `What if it`... `fail to see`
- `Why transformations struggle` (case-insensitive)
- `Transformation starts with reflection.`
- `Be the mirror.` (case-insensitive; may appear as `Be the mirror` inside the heading)
- `Who is this book for?` (case-insensitive)
- `Mirror Moments`
- `The book` (case-insensitive)
- `Three perspectives.`
- `Change starts with what we are`

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(homepage): compose Phase 2 sections into the storytelling homepage"
```

---

## Self-Review

**1. Spec coverage.** Every spec section is a task:
- Section 1 → Task 2 (AC-13)
- Section 2 → Task 3 (AC-14)
- Section 3 → Task 4 (AC-15)
- Section 4 → Task 5 (AC-16)
- Section 5 → Task 6 (AC-17)
- Section 6 → Task 7 (AC-18)
- Section 7 → Task 8 (AC-19)
- Section 8 → Task 9 (AC-20)
- Section 9 → Task 10 (AC-21)
- Scroll story / storytelling continuity → Task 11 composition + Global Constraints on shared tokens (AC-22)
- Responsiveness → per-task layouts (mobile stack; sm/md/lg grids) (AC-23)
- Design continuity → Global Constraints + Task 1 reuse audit (AC-24)
- No console/lint/type errors → Task 11 steps 2–5 (AC-25)
- Motion + reduced-motion → Task 1 CSS + `Reveal`
- Component architecture suggestions → `MirrorMoment`, `AuthorCard`, `SectionHeading`, `Reveal` created; others (`SectionIntro`, `ReflectionStatement`, `TransformationJourney`, `AudienceQuestion`, `BookPreview`, `ClosingCTA`) treated as section components (single-use), not reusable primitives — per the "Do not create abstraction purely for abstraction's sake" rule in the spec.
- Non-goals — no dedicated pages, no CMS, no payment, etc. — respected; CTAs point to in-page anchors.

**2. Placeholder scan.** No `TBD`, no `add error handling`, no `similar to`. Every code block is complete. All copy strings are verbatim from the spec (with entity encoding).

**3. Type consistency.** `Reveal({ as, delayMs, className, children })` — same signature everywhere. `SectionHeading({ eyebrow, id, align, className, children })` — same everywhere. `MirrorMoment({ index, children, className })` — Task 7 defines it, only Task 7 consumes it. `AuthorCard({ name, role, note, className })` — Task 9 defines it, only Task 9 consumes it. Imports use consistent aliases: `@/components/layout/*`, `@/components/ui/*`, `@/components/motion/*`, `@/components/site/sections/*`, `@/lib/cn`.

**4. Interface cross-check.** `Section` `bleed` prop confirmed (Task 1 preflight — matches `src/components/layout/Section.tsx`). `Button` `href` polymorphism confirmed (Phase 1 file). `next/image` sizes chosen against actual PNG intrinsics verified via `sips`. All CTA anchors resolve to elements produced in this plan: `#buy` and `#ideas` in `FinalCTA` (Task 10 sets `id="buy"` on the section and `id="ideas"` on the button row), `#authors` in `AuthorsPreview` (Task 9 sets `id="authors"` on the section). Header nav that already links to those anchors from Phase 1 will now scroll to real destinations.

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-09-17-be-the-mirror-phase-2.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — same pattern that shipped Phase 1: fresh implementer per task, task review after each, one final whole-branch review.

**2. Inline Execution** — I implement in this session using superpowers:executing-plans with checkpoints.

**Which approach?**
