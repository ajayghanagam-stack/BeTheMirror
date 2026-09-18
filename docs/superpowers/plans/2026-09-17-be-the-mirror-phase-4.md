# Be the Mirror — Phase 4 Implementation Plan (Ideas + Mirror Moments + Resources)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Be the Mirror from a book-promo site into the start of a thought-leadership platform by shipping `/ideas`, `/ideas/[slug]`, `/resources`, and a reusable Mirror Moments content system — reusing every Phase 1–3 primitive and adding no new runtime dependencies.

**Architecture:**
- Structured content lives in TypeScript modules under `src/content/` (matches Phase 1–3 conventions). Long-form Idea bodies are per-file `.tsx` React components colocated with their metadata; an aggregator module lists all published Ideas.
- Mirror Moments and Resources are typed data arrays. Existing homepage `<MirrorMoments />` migrates to consume the shared data source (single source of truth).
- Article page (`/ideas/[slug]`) is a Server Component using `generateStaticParams` and `generateMetadata`; no CMS, no client-side data fetching, no MDX.
- New primitives (`PullQuote`, `MirrorQuestion`, `IdeaCard`, `FeaturedIdeaCard`, `MirrorMomentCard`, `ResourceCard`, `ContinueExploring`) sit next to Phase 1–3 primitives in `src/components/ui/` and are all Server Components.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript 5 (strict) · Tailwind v4 (`@theme` tokens in `globals.css`) · no MDX · no markdown lib · `@/lib/cn` utility · `next/image`.

**Spec:** User's Phase 4 message on 2026-09-17 in this session (verbatim in `~/.claude/projects/-Users-ajaychandraghanagam-projects-be-the-mirror/*.jsonl`). AC-45..AC-65 come from that message.

## Global Constraints

- **No new runtime dependencies.** No MDX, no markdown lib, no CMS, no `@tailwindcss/typography` — spec says "do NOT add a heavy content framework unnecessarily".
- **Server components by default.** Add `"use client"` ONLY where interactivity is required. No new client components are needed in Phase 4.
- **Reuse Phase 1–3 primitives.** `Container`, `Section`, `SectionHeading`, `Button`, `Reveal`, `MirrorMoment`, `AuthorPerspective`, `Footer`, `Header`, `nav.ts`, tokens.
- **Author attribution.** All Phase-4-authored editorial content uses `author: "Be the Mirror Editorial"`. Do NOT attribute new website content to Lois Wortley, Ajay Ghanagam, or Hiren Doshi (AC-61).
- **No fabricated book content.** Do NOT say "From Chapter X" or "In the book we say…". Seed Ideas are labeled internally as editorial drafts, not book excerpts (AC-62).
- **Publication date.** All Phase 4 seed content uses `publishedDate: "2026-09-17"` (current project date, one consistent approach).
- **Copy verbatim from spec** where the spec quotes exact strings (hero headlines, Mirror Moment statements, resource titles). HTML entities used per Phase 2/3 convention (`&mdash;`, `&rsquo;`, `&ldquo;`, `&rdquo;`, `&middot;`, `&hellip;`).
- **Slugs.** Clean kebab-case: `/ideas/why-people-resist-change` etc. No IDs, dates, underscores, or query strings in URLs.
- **Coming Soon discipline.** Every unavailable resource renders a `COMING SOON` state — never a broken/fake `Download` button (AC-57).
- **URL constants.** `PURCHASE_URL` stays as the existing placeholder (Phase 3 decision).
- **Navigation.** Ideas + Resources flip to `live: true`. Speaking + Contact stay `live: false` (Phase 5+).
- **Validation must pass.** `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean. Dev-server curl smoke test for `/`, `/book`, `/authors`, `/ideas`, `/ideas/why-people-resist-change`, `/resources`.

---

## Content Model Decision (informational — implementers follow the task briefs)

**Ideas:** One `.tsx` file per Idea at `src/content/ideas/<slug>.tsx`. Each file exports:
- `export const meta: IdeaMeta` — typed metadata
- `export default function Body()` — the article body JSX (uses `<p>`, `<h2>`, `<PullQuote>`, plain HTML; styled by a global `.idea-prose` CSS block)

The aggregator `src/content/ideas/index.ts` statically imports every Idea file, filters by `status === "published"`, sorts by `publishedDate` descending, and exports `IDEAS`, `getIdea(slug)`, `getCategories()`, `getRelatedIdeas(slug)`.

**Mirror Moments:** Flat typed array in `src/content/mirror-moments.ts`. Each moment is an ordered `paragraphs: readonly string[]` with an optional `emphasisIndex` (paragraph to highlight in yellow) — this captures the shape of the three approved homepage seeds exactly.

**Resources:** Flat typed array in `src/content/resources.ts`. Each resource has a `status` (`"available" | "coming-soon" | "in-development"`) that drives CTA state.

Migration to a CMS later: each `<slug>.tsx` body maps to markdown/HTML by a small extraction script; meta objects map 1:1 to CMS records. Costs of wrong: replaced later by CMS ingest — the structural shape (IdeaMeta fields) is CMS-portable.

---

## Preflight cross-task scan

| Producer | Consumer | Shared surface | Finding |
| --- | --- | --- | --- |
| Task 1 | Tasks 2–9 | `IdeaMeta`, `IdeaCategory`, `MirrorMomentData`, `ResourceData`, `RESOURCES`, `MIRROR_MOMENTS`; nav flags | Consistent — types declared in Task 1 are consumed as declared everywhere. |
| Task 2 | Tasks 3–8 | `PullQuote`, `MirrorQuestion`, `IdeaCard`, `FeaturedIdeaCard`, `MirrorMomentCard`, `ResourceCard`, `ContinueExploring`, `.idea-prose` CSS block | Consistent — every consumer imports the exact declared prop shape. |
| Task 3 | Tasks 4, 5 | Six `<slug>.tsx` idea files + aggregator `IDEAS` | Consistent — aggregator statically imports all six. |
| Task 4 (Ideas landing) | Task 6 (MirrorMoments migration) | Ideas landing page renders a Mirror Moments preview reading from `MIRROR_MOMENTS` | Consistent — Task 6 makes `MIRROR_MOMENTS` the shared source; Task 4 imports from it. |
| Task 5 (Article route) | Task 3 (Ideas), Task 2 (`MirrorQuestion`, related), Task 7 (`ResourceCard`) | `generateStaticParams` reads `IDEAS`; body renders `<PullQuote>`/`<MirrorQuestion>`; related section reads `getRelatedIdeas`; "Put this idea into practice" reads related resource by slug | Consistent — all data hooks exposed from Task 1/3. |
| Task 6 (Mirror Moments migration) | Homepage `MirrorMoments` section | Section becomes a data-driven consumer of `MIRROR_MOMENTS`; the three approved statements are preserved character-for-character (paragraphs + emphasisIndex) | Consistent — Task 1 seeds the three moments verbatim from `src/components/site/sections/MirrorMoments.tsx`. |
| Task 7 (Resources) | Task 1 (`RESOURCES`), Task 2 (`ResourceCard`) | Page renders featured + grid + optional simple category sections | Consistent — no client filter state; simple by-category grouping. |
| Task 8 (cross-page CTAs) | Tasks 4, 7 | `AuthorsCollectiveCTA` secondary CTA → `/ideas`; `BookFinalCTA` optional link; homepage `AuthorsCollectiveCTA` etc. Existing `MirrorMoments` section adds CTA → `/ideas` | Consistent — Task 8 changes only anchor href strings + adds a small `ContinueExploring` block on `/book`. |
| Task 9 (validation) | All | tsc/lint/build/curl smoke | Every required substring in the smoke grep exists in the composed sections. |

Self-consistency spot-checks:
- Every Idea slug used in `relatedIdeaSlugs` exists in the seed set.
- Every `relatedResourceSlug` referenced by an Idea maps to a resource in `RESOURCES` (even if `status === "coming-soon"`).
- Categories used by Ideas are a subset of the declared `IdeaCategory` union.
- Homepage `MirrorMoments` section's `id="ideas"` is preserved (Phase 2 anchor `/#ideas` still resolves after migration).
- No new client components introduced.

---

### Task 1: Content types + Mirror Moments data + Resources data + nav flip

**Files:**
- Create: `src/content/ideas/index.ts` (types + aggregator; stub with empty IDEAS list to be populated in Task 3)
- Create: `src/content/mirror-moments.ts`
- Create: `src/content/resources.ts`
- Modify: `src/lib/nav.ts`

**Interfaces:**
- Produces: `IdeaMeta`, `IdeaCategory`, `IdeaAuthor`, `IdeaStatus`, `IDEAS`, `getIdea`, `getCategories`, `getRelatedIdeas` — from `@/content/ideas`.
- Produces: `MirrorMomentData`, `MirrorMomentCategory`, `MIRROR_MOMENTS` — from `@/content/mirror-moments`.
- Produces: `ResourceData`, `ResourceType`, `ResourceStatus`, `ResourceAudience`, `RESOURCES`, `getResource` — from `@/content/resources`.

- [ ] **Step 1: `src/content/ideas/index.ts`** (stub aggregator — Task 3 will add the imports)

```ts
import type { ComponentType } from "react";

export type IdeaCategory =
  | "Leadership"
  | "Transformation"
  | "Change Agents"
  | "AI Transformation"
  | "Organizational Culture"
  | "Technology Leadership"
  | "Change Management"
  | "Book Insights"
  | "Mirror Moments";

export const IDEA_CATEGORIES: readonly IdeaCategory[] = [
  "Leadership",
  "Transformation",
  "Change Agents",
  "AI Transformation",
  "Organizational Culture",
  "Technology Leadership",
  "Change Management",
  "Book Insights",
  "Mirror Moments",
];

export type IdeaAuthor = "Be the Mirror Editorial" | "Lois Wortley" | "Ajay Ghanagam" | "Hiren Doshi";

export type IdeaStatus = "draft" | "published";

export type IdeaMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  category: IdeaCategory;
  tags?: readonly string[];
  author: IdeaAuthor;
  publishedDate: string; // ISO YYYY-MM-DD
  readingTime: number;   // minutes
  featured?: boolean;
  status: IdeaStatus;
  relatedIdeaSlugs?: readonly string[];
  relatedResourceSlug?: string;
  mirrorQuestion?: string;
};

export type IdeaModule = { meta: IdeaMeta; Body: ComponentType };

// Task 3 replaces this stub with real imports.
const modules: readonly { meta: IdeaMeta; default: ComponentType }[] = [];

export const IDEAS: readonly IdeaModule[] = modules
  .filter((m) => m.meta.status === "published")
  .map((m) => ({ meta: m.meta, Body: m.default }))
  .sort((a, b) => (a.meta.publishedDate > b.meta.publishedDate ? -1 : 1));

export function getIdea(slug: string): IdeaModule | undefined {
  return IDEAS.find((i) => i.meta.slug === slug);
}

export function getFeaturedIdea(): IdeaModule | undefined {
  return IDEAS.find((i) => i.meta.featured) ?? IDEAS[0];
}

export function getCategories(): ReadonlyArray<{ category: IdeaCategory; count: number }> {
  const counts = new Map<IdeaCategory, number>();
  for (const i of IDEAS) counts.set(i.meta.category, (counts.get(i.meta.category) ?? 0) + 1);
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }));
}

export function getRelatedIdeas(slug: string, limit = 3): readonly IdeaModule[] {
  const source = getIdea(slug);
  if (!source) return [];
  const explicit = (source.meta.relatedIdeaSlugs ?? [])
    .map((s) => getIdea(s))
    .filter((i): i is IdeaModule => Boolean(i));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fallback = IDEAS.filter(
    (i) => i.meta.slug !== slug && i.meta.category === source.meta.category
  );
  const merged: IdeaModule[] = [...explicit];
  for (const i of fallback) {
    if (merged.length >= limit) break;
    if (!merged.find((m) => m.meta.slug === i.meta.slug)) merged.push(i);
  }
  return merged.slice(0, limit);
}
```

- [ ] **Step 2: `src/content/mirror-moments.ts`**

```ts
export type MirrorMomentCategory =
  | "Transformation"
  | "Leadership"
  | "Change Management"
  | "Change Agents";

export type MirrorMomentData = {
  id: string;
  slug: string;
  paragraphs: readonly string[];
  emphasisIndex?: number; // index into paragraphs — rendered in accent-yellow
  category: MirrorMomentCategory;
  author: "Be the Mirror Editorial";
  publishedDate: string;
  featured?: boolean;
};

export const MIRROR_MOMENTS: readonly MirrorMomentData[] = [
  {
    id: "mm-01",
    slug: "why-people-resist-change",
    paragraphs: [
      "We often ask why people resist change.",
      "A better question may be:",
      "What about the change made resistance rational?",
    ],
    emphasisIndex: 2,
    category: "Change Management",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-02",
    slug: "technology-vs-organizations",
    paragraphs: [
      "Technology can change in months.",
      "Organizations rarely do.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-03",
    slug: "announced-vs-experienced",
    paragraphs: [
      "Transformation isn\u2019t what leadership announces.",
      "It\u2019s what people experience.",
    ],
    category: "Leadership",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-04",
    slug: "implementation-vs-adoption",
    paragraphs: [
      "Implementation changes systems.",
      "Adoption changes behaviour.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-05",
    slug: "plan-vs-organization",
    paragraphs: [
      "A transformation plan tells you where you want to go.",
      "Your organization tells you how difficult the journey will be.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-06",
    slug: "change-fatigue",
    paragraphs: [
      "Change fatigue is not always resistance to change.",
      "Sometimes it is resistance to one more unfinished transformation.",
    ],
    category: "Change Management",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-07",
    slug: "intent-vs-experience",
    paragraphs: [
      "The gap between leadership intent and employee experience is where many transformations struggle.",
    ],
    category: "Leadership",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-08",
    slug: "somebody-elses-strategy",
    paragraphs: [
      "If people do not understand why change matters to them, the strategy will remain somebody else\u2019s strategy.",
    ],
    category: "Change Agents",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
];

export function getMirrorMoment(slug: string): MirrorMomentData | undefined {
  return MIRROR_MOMENTS.find((m) => m.slug === slug);
}
```

- [ ] **Step 3: `src/content/resources.ts`**

```ts
export type ResourceType =
  | "Checklist"
  | "Assessment"
  | "Discussion Guide"
  | "Worksheet"
  | "Framework"
  | "Playbook";

export type ResourceStatus = "available" | "coming-soon" | "in-development";

export type ResourceAudience = "Leadership" | "Transformation" | "AI" | "Change Agents";

export type ResourceData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  audience: readonly ResourceAudience[];
  status: ResourceStatus;
  downloadUrl?: string;
  externalUrl?: string;
  emailRequired?: boolean;
  featured?: boolean;
  relatedIdeaSlug?: string;
};

export const RESOURCES: readonly ResourceData[] = [
  {
    id: "res-01",
    slug: "be-the-mirror-leadership-checklist",
    title: "Be the Mirror Leadership Checklist",
    description:
      "A short reflection tool for leaders to examine how their own actions may be shaping transformation.",
    type: "Checklist",
    audience: ["Leadership"],
    status: "coming-soon",
    featured: true,
    relatedIdeaSlug: "before-another-framework-look-in-the-mirror",
  },
  {
    id: "res-02",
    slug: "transformation-readiness-assessment",
    title: "Transformation Readiness Assessment",
    description:
      "A structured self-assessment to gauge how ready an organization is for the transformation it is about to attempt.",
    type: "Assessment",
    audience: ["Leadership", "Transformation"],
    status: "coming-soon",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
  {
    id: "res-03",
    slug: "change-agent-reflection-guide",
    title: "Change Agent Reflection Guide",
    description:
      "Questions to help change agents examine the assumptions they bring to a transformation before asking others to change.",
    type: "Discussion Guide",
    audience: ["Change Agents"],
    status: "coming-soon",
    relatedIdeaSlug: "change-agents-dont-need-to-control-everything",
  },
  {
    id: "res-04",
    slug: "ai-transformation-readiness-checklist",
    title: "AI Transformation Readiness Checklist",
    description:
      "A practical checklist for leaders introducing AI into everyday work — beyond tools and toward adoption.",
    type: "Checklist",
    audience: ["AI", "Leadership"],
    status: "coming-soon",
    relatedIdeaSlug: "ai-adoption-is-an-organizational-change-problem",
  },
  {
    id: "res-05",
    slug: "leadership-reflection-questions",
    title: "Leadership Reflection Questions",
    description:
      "A worksheet of reflection prompts for leaders navigating transformation, resistance and the gap between intent and experience.",
    type: "Worksheet",
    audience: ["Leadership"],
    status: "coming-soon",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
  {
    id: "res-06",
    slug: "team-transformation-conversation-guide",
    title: "Team Transformation Conversation Guide",
    description:
      "A discussion guide for team-level conversations about what is changing, why it matters, and what people need to make the change stick.",
    type: "Discussion Guide",
    audience: ["Leadership", "Change Agents"],
    status: "coming-soon",
    relatedIdeaSlug: "why-people-resist-change",
  },
];

export function getResource(slug: string): ResourceData | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcesByAudience(audience: ResourceAudience): readonly ResourceData[] {
  return RESOURCES.filter((r) => r.audience.includes(audience));
}
```

- [ ] **Step 4: Update `src/lib/nav.ts`**

Replace the entire file with:

```ts
// src/lib/nav.ts
export type NavItem = { label: string; href: string; live: boolean };

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home",      href: "/",          live: true  },
  { label: "The Book",  href: "/book",      live: true  },
  { label: "Ideas",     href: "/ideas",     live: true  },
  { label: "Authors",   href: "/authors",   live: true  },
  { label: "Resources", href: "/resources", live: true  },
  { label: "Speaking",  href: "#speaking",  live: false },
  { label: "Contact",   href: "#contact",   live: false },
];
```

- [ ] **Step 5: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors. The stub aggregator produces an empty `IDEAS` list; consumers in later tasks handle empty gracefully.

- [ ] **Step 6: Commit**

```bash
git add src/content/ideas/index.ts src/content/mirror-moments.ts src/content/resources.ts src/lib/nav.ts
git commit -m "feat(content): ideas/moments/resources content models + nav flip"
```

---

### Task 2: Reusable primitives — PullQuote, MirrorQuestion, IdeaCard, FeaturedIdeaCard, MirrorMomentCard, ResourceCard, ContinueExploring + .idea-prose CSS

**Files:**
- Create: `src/components/ui/PullQuote.tsx`
- Create: `src/components/ui/MirrorQuestion.tsx`
- Create: `src/components/ui/IdeaCard.tsx`
- Create: `src/components/ui/FeaturedIdeaCard.tsx`
- Create: `src/components/ui/MirrorMomentCard.tsx`
- Create: `src/components/ui/ResourceCard.tsx`
- Create: `src/components/ui/ContinueExploring.tsx`
- Modify: `src/app/globals.css` (append `.idea-prose` block; do NOT touch existing tokens)

**Interfaces:**
- Consumes: `IdeaMeta` from `@/content/ideas`, `MirrorMomentData`, `ResourceData`, `Button`, `cn`, `MirrorMoment` (Phase 2 primitive).
- Produces: All the above primitives. Every one is a server component.

- [ ] **Step 1: `src/components/ui/PullQuote.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { attribution?: string; className?: string; children: ReactNode };

export function PullQuote({ attribution, className, children }: Props) {
  return (
    <figure
      className={cn(
        "my-10 border-l-2 border-[color:var(--color-accent-cyan)] pl-6",
        className
      )}
    >
      <blockquote
        className="text-[length:var(--text-h3)] font-medium leading-snug tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
      >
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
          &mdash; {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
```

- [ ] **Step 2: `src/components/ui/MirrorQuestion.tsx`**

The signature Be the Mirror content device. Renders as a distinct, high-contrast block.

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { className?: string; children: ReactNode };

export function MirrorQuestion({ className, children }: Props) {
  return (
    <aside
      aria-label="Mirror question"
      className={cn(
        "my-14 rounded-2xl border p-8 md:p-10",
        "border-[color:var(--color-accent-cyan-soft)] bg-[color:var(--color-bg-secondary)]",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
        Mirror Question
      </p>
      <p
        className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {children}
      </p>
    </aside>
  );
}
```

- [ ] **Step 3: `src/components/ui/IdeaCard.tsx`**

Editorial card used in Latest Ideas grid.

```tsx
import Link from "next/link";
import type { IdeaMeta } from "@/content/ideas";
import { cn } from "@/lib/cn";

type Props = { meta: IdeaMeta; className?: string };

export function IdeaCard({ meta, className }: Props) {
  const href = `/ideas/${meta.slug}`;
  const titleId = `idea-card-${meta.slug}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-8",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]",
        "transition-colors duration-300 hover:border-[color:var(--color-accent-cyan)]",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
        {meta.category}
      </p>
      <h3
        id={titleId}
        className="mt-4 font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h3)" }}
      >
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {meta.title}
        </Link>
      </h3>
      <p className="mt-4 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
        {meta.summary}
      </p>
      <p className="mt-6 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
        {meta.author} &middot; {meta.readingTime} min read
      </p>
    </article>
  );
}
```

- [ ] **Step 4: `src/components/ui/FeaturedIdeaCard.tsx`**

Larger, split-layout card for the featured Idea.

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { IdeaMeta } from "@/content/ideas";
import { cn } from "@/lib/cn";

type Props = { meta: IdeaMeta; className?: string };

export function FeaturedIdeaCard({ meta, className }: Props) {
  const href = `/ideas/${meta.slug}`;
  const titleId = `featured-idea-${meta.slug}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "relative rounded-3xl border p-8 md:p-12 lg:p-16",
        "border-[color:var(--color-accent-cyan-soft)] bg-[color:var(--color-bg-secondary)]",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
            Featured Idea &middot; {meta.category}
          </p>
          <h2
            id={titleId}
            className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            <Link href={href}>{meta.title}</Link>
          </h2>
          {meta.subtitle ? (
            <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              {meta.subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col justify-between gap-8">
          <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            {meta.summary}
          </p>
          <div>
            <p className="text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              {meta.author} &middot; {meta.readingTime} min read
            </p>
            <div className="mt-6">
              <Button href={href} variant="primary">
                Read the Idea
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: `src/components/ui/MirrorMomentCard.tsx`**

Data-driven wrapper around the existing Phase 2 `MirrorMoment` primitive.

```tsx
import { MirrorMoment } from "@/components/ui/MirrorMoment";
import type { MirrorMomentData } from "@/content/mirror-moments";
import { cn } from "@/lib/cn";

type Props = { moment: MirrorMomentData; index: number; className?: string };

export function MirrorMomentCard({ moment, index, className }: Props) {
  return (
    <MirrorMoment index={index} className={className}>
      &ldquo;
      {moment.paragraphs.map((p, i) => {
        const isEmphasis = moment.emphasisIndex === i;
        const isLast = i === moment.paragraphs.length - 1;
        return (
          <span key={i}>
            <span
              className={cn(
                isEmphasis && "text-[color:var(--color-accent-yellow)]"
              )}
            >
              {p}
            </span>
            {isLast ? null : (
              <>
                <br />
                <br />
              </>
            )}
          </span>
        );
      })}
      &rdquo;
    </MirrorMoment>
  );
}
```

- [ ] **Step 6: `src/components/ui/ResourceCard.tsx`**

CTA state depends on `resource.status`. No fake downloads.

```tsx
import { Button } from "@/components/ui/Button";
import type { ResourceData } from "@/content/resources";
import { cn } from "@/lib/cn";

type Props = { resource: ResourceData; className?: string };

function ctaFor(resource: ResourceData): { label: string; href?: string; disabled: boolean } {
  if (resource.status === "available") {
    if (resource.downloadUrl) return { label: "Download", href: resource.downloadUrl, disabled: false };
    if (resource.externalUrl) return { label: "Open Resource", href: resource.externalUrl, disabled: false };
  }
  if (resource.status === "in-development") return { label: "In Development", disabled: true };
  return { label: "Coming Soon", disabled: true };
}

export function ResourceCard({ resource, className }: Props) {
  const cta = ctaFor(resource);
  const titleId = `resource-card-${resource.slug}-title`;
  const isPlaceholder = cta.disabled;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "flex h-full flex-col rounded-2xl border p-8",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
        {resource.type}
      </p>
      <h3
        id={titleId}
        className="mt-4 font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {resource.title}
      </h3>
      <p className="mt-4 flex-1 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
        {resource.description}
      </p>
      <p className="mt-6 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
        For {resource.audience.join(", ")}
      </p>
      <div className="mt-6">
        {isPlaceholder ? (
          <span
            aria-disabled="true"
            className="inline-flex items-center rounded-full border border-[color:var(--color-border-subtle)] px-5 py-2 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]"
          >
            {cta.label}
          </span>
        ) : (
          <Button href={cta.href!} variant="primary">
            {cta.label}
          </Button>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 7: `src/components/ui/ContinueExploring.tsx`**

Small block used at the bottom of `/book` (and later `/ideas/[slug]`) to point readers to Ideas and Resources.

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string; description: string };

type Props = { items: readonly Item[]; className?: string };

export function ContinueExploring({ items, className }: Props) {
  return (
    <nav
      aria-label="Continue exploring"
      className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex flex-col rounded-2xl border border-[color:var(--color-border-subtle)] p-6 transition-colors duration-300 hover:border-[color:var(--color-accent-cyan)]"
        >
          <span className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
            {item.label}
          </span>
          <span className="mt-3 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
            {item.description}
          </span>
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 8: Append `.idea-prose` CSS to `src/app/globals.css`**

Append at the end of the file (do not modify existing tokens or utilities):

```css
/* Editorial prose block for /ideas/[slug] article body.
   Applies spacing + type to unadorned <p>/<h2>/<h3>/<ul>/<ol>/<blockquote>. */
.idea-prose {
  color: var(--color-fg-primary);
  font-size: var(--text-body-lg);
  line-height: var(--text-body-lg--line-height);
}
.idea-prose > * + * {
  margin-top: 1.5em;
}
.idea-prose h2 {
  margin-top: 2.5em;
  font-size: var(--text-h2);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--color-fg-primary);
}
.idea-prose h3 {
  margin-top: 2em;
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-fg-primary);
}
.idea-prose p {
  color: var(--color-fg-primary);
}
.idea-prose ul,
.idea-prose ol {
  padding-left: 1.5em;
  color: var(--color-fg-primary);
}
.idea-prose ul { list-style: disc; }
.idea-prose ol { list-style: decimal; }
.idea-prose li + li { margin-top: 0.5em; }
.idea-prose strong { color: var(--color-fg-primary); font-weight: 600; }
.idea-prose em { font-style: italic; }
.idea-prose a {
  color: var(--color-accent-cyan);
  border-bottom: 1px solid var(--color-accent-cyan-soft);
}
.idea-prose a:hover { border-bottom-color: var(--color-accent-cyan); }
```

- [ ] **Step 9: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 10: Commit**

```bash
git add src/components/ui/PullQuote.tsx src/components/ui/MirrorQuestion.tsx src/components/ui/IdeaCard.tsx src/components/ui/FeaturedIdeaCard.tsx src/components/ui/MirrorMomentCard.tsx src/components/ui/ResourceCard.tsx src/components/ui/ContinueExploring.tsx src/app/globals.css
git commit -m "feat(ui): ideas/resources primitives + idea-prose editorial CSS"
```

---

### Task 3: Six seed Ideas + aggregator wire-up (batched dispatch)

**Files:**
- Create: `src/content/ideas/why-people-resist-change.tsx`
- Create: `src/content/ideas/technology-can-change-faster-than-organizations.tsx`
- Create: `src/content/ideas/ai-adoption-is-an-organizational-change-problem.tsx`
- Create: `src/content/ideas/transformation-intent-vs-experience.tsx`
- Create: `src/content/ideas/change-agents-dont-need-to-control-everything.tsx`
- Create: `src/content/ideas/before-another-framework-look-in-the-mirror.tsx`
- Modify: `src/content/ideas/index.ts` (replace the stub `modules` array with real imports)

**Author attribution:** All six use `author: "Be the Mirror Editorial"` (AC-61). These are newly written editorial drafts for website structure — NOT excerpts of the book (AC-62). Do NOT reference specific chapters or say "in the book we say…".

**Common shape for every Idea file:**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = { /* … */ };

export default function Body() {
  return (
    <>
      <p>…</p>
      <h2>…</h2>
      <p>…</p>
      <PullQuote>…</PullQuote>
      <p>…</p>
    </>
  );
}
```

- [ ] **Step 1: `why-people-resist-change.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "why-people-resist-change",
  title: "Why People Resist Change \u2014 and Why That May Be Rational",
  subtitle: "Resistance is often labelled as a problem. It is more useful to treat it as information.",
  summary:
    "When a transformation stalls, leaders often ask why people are resisting. A more useful question is what the change is asking of them \u2014 and whether the answer makes resistance rational.",
  category: "Change Management",
  tags: ["resistance", "behaviour", "leadership"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  featured: true,
  status: "published",
  relatedIdeaSlugs: [
    "transformation-intent-vs-experience",
    "before-another-framework-look-in-the-mirror",
  ],
  relatedResourceSlug: "team-transformation-conversation-guide",
  mirrorQuestion:
    "If your transformation is struggling, are you looking first at the people resisting it \u2014 or at the environment that made resistance rational?",
};

export default function Body() {
  return (
    <>
      <p>
        When a transformation stalls, the language used to describe it says a great deal about
        where leadership is looking. People are called blockers. Teams are said to lack buy-in.
        A change management plan is judged to be under-communicated. Resistance becomes the
        problem to be managed.
      </p>
      <p>
        This framing is comfortable. It also tends to be inaccurate.
      </p>
      <h2>Resistance is usually a signal, not a personality trait</h2>
      <p>
        People do not, as a rule, resist change because they enjoy the friction. They resist
        specific changes for specific reasons. A new process removes the discretion that made
        their work valuable. A new tool asks them to trade fluency for uncertainty. A new
        structure quietly reduces the number of people who look like them at the top.
      </p>
      <p>
        Each of those is a rational response to information the transformation may not have
        acknowledged yet.
      </p>
      <PullQuote>
        Resistance is often the most honest feedback loop leadership has. It is worth listening
        to before it is worth solving.
      </PullQuote>
      <h2>A different question to ask</h2>
      <p>
        Rather than asking why people are resisting, it is more useful to ask what the change is
        asking of them, and whether the environment supports that ask. If the environment does
        not, resistance is not the problem. It is the accurate reading.
      </p>
      <p>
        That reading, taken seriously, is often where transformation actually begins.
      </p>
    </>
  );
}
```

- [ ] **Step 2: `technology-can-change-faster-than-organizations.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "technology-can-change-faster-than-organizations",
  title: "Technology Can Change Faster Than Organizations Can",
  subtitle: "A new platform is a decision. Adoption is a series of behaviours.",
  summary:
    "It is now possible to procure and deploy transformational technology in a quarter. The organizational work needed to actually use it well takes considerably longer \u2014 and that gap is where transformation lives.",
  category: "Transformation",
  tags: ["technology", "adoption", "capacity"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "ai-adoption-is-an-organizational-change-problem",
    "transformation-intent-vs-experience",
  ],
  relatedResourceSlug: "ai-transformation-readiness-checklist",
  mirrorQuestion:
    "Which is moving faster in your organization \u2014 the technology you are deploying, or the capacity of your people to use it well?",
};

export default function Body() {
  return (
    <>
      <p>
        Buying transformational technology has never been easier. A cloud platform can be signed
        off in a quarter. A large language model can be integrated in weeks. A workflow tool can
        be piloted before the change plan is written.
      </p>
      <p>
        The organizational work of actually using that technology well tends to run on a
        different clock.
      </p>
      <h2>Two speeds, one transformation</h2>
      <p>
        Systems can be replaced quickly. Behaviours, decision rights, incentive structures and
        the assumptions built into how people work rarely can. The result is a familiar
        pattern: the technology arrives on time, the transformation does not.
      </p>
      <PullQuote>
        The gap between what an organization has installed and what it actually uses is often
        the most expensive part of any transformation programme.
      </PullQuote>
      <h2>Designing for the slower clock</h2>
      <p>
        Treating adoption as a phase after go-live tends to shorten the time available for the
        harder work. A more useful stance is to plan the human work backwards from the outcomes
        the technology is supposed to enable, and to give that work the same visibility that
        the technology decision receives.
      </p>
      <p>
        Otherwise, the organization ends up with new tools and old habits \u2014 and the transformation
        is judged by the habits.
      </p>
    </>
  );
}
```

- [ ] **Step 3: `ai-adoption-is-an-organizational-change-problem.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "ai-adoption-is-an-organizational-change-problem",
  title: "AI Adoption Is an Organizational Change Problem",
  subtitle:
    "Most AI programmes are treated as technology deployments. They are actually asking people to work differently.",
  summary:
    "AI capabilities can be procured off the shelf. The trust, judgement and decision rights required to use them well cannot. Treating AI as a change programme, not a deployment, is where value shows up.",
  category: "AI Transformation",
  tags: ["ai", "adoption", "trust"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  featured: false,
  status: "published",
  relatedIdeaSlugs: [
    "technology-can-change-faster-than-organizations",
    "change-agents-dont-need-to-control-everything",
  ],
  relatedResourceSlug: "ai-transformation-readiness-checklist",
  mirrorQuestion:
    "Are you asking your organization to adopt an AI tool \u2014 or to change how decisions get made? The second is a much larger ask than the first.",
};

export default function Body() {
  return (
    <>
      <p>
        Almost every organization now has an AI initiative. Very few describe it as a change
        programme. That framing gap is where most of the practical difficulty lives.
      </p>
      <p>
        AI does not simply add capacity. It changes what people are being asked to do with their
        judgement, their time and their accountability.
      </p>
      <h2>What is actually being asked</h2>
      <p>
        Ask a knowledge worker to use a copilot and you are, in practice, asking them to trust a
        system they did not build, defend outputs they did not fully author, and change the
        rhythm of work that made them credible. That is not a training issue. It is a change of
        role.
      </p>
      <PullQuote>
        The organizations that get value from AI are usually not the ones with the best models.
        They are the ones who took the human questions seriously.
      </PullQuote>
      <h2>Three questions worth asking early</h2>
      <p>
        What becomes uncertain when AI enters this workflow? Who is accountable when the model is
        wrong? What does &ldquo;good&rdquo; look like when the work is being co-produced with a
        system?
      </p>
      <p>
        These are not procurement questions. They are transformation questions. Treated as
        such, they change what a successful AI programme actually looks like.
      </p>
    </>
  );
}
```

- [ ] **Step 4: `transformation-intent-vs-experience.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "transformation-intent-vs-experience",
  title: "The Difference Between Transformation Intent and Transformation Experience",
  subtitle:
    "Leadership judges transformation by the plan. Everyone else judges it by what has actually happened.",
  summary:
    "The distance between what leadership announces and what people experience is often where transformations quietly break. Closing that distance is a leadership responsibility, not a communications one.",
  category: "Leadership",
  tags: ["intent", "experience", "communication"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "why-people-resist-change",
    "before-another-framework-look-in-the-mirror",
  ],
  relatedResourceSlug: "leadership-reflection-questions",
  mirrorQuestion:
    "If you asked ten people three levels below you what the transformation feels like, would their answer resemble the one on your leadership deck?",
};

export default function Body() {
  return (
    <>
      <p>
        Every transformation carries two versions of itself. One lives in the strategy documents,
        the town-hall slides and the leadership team\u2019s intent. The other lives in the
        experience of the people the transformation is happening to.
      </p>
      <p>
        The two are rarely the same. When the gap grows, the transformation is judged by the
        second one.
      </p>
      <h2>Where the gap comes from</h2>
      <p>
        It rarely comes from bad intent. It comes from distance. Leadership sees the arc. People
        further from the strategy see today\u2019s workload, this quarter\u2019s targets, and
        the previous change that was announced with similar confidence and never finished.
      </p>
      <PullQuote>
        Transformation is not what leadership announces. It is what people experience.
      </PullQuote>
      <h2>Closing the gap is leadership work</h2>
      <p>
        Communications teams can describe the change. They cannot close the experience gap.
        That closure happens when leaders make decisions visible, take unfinished
        transformations seriously, and treat feedback from the front line as data rather than
        as noise to be managed.
      </p>
      <p>
        The organizations that pull this off tend to say less about the plan and more about the
        experience it is producing.
      </p>
    </>
  );
}
```

- [ ] **Step 5: `change-agents-dont-need-to-control-everything.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "change-agents-dont-need-to-control-everything",
  title: "Change Agents Don\u2019t Need to Control Everything",
  subtitle:
    "The instinct to control the transformation is often the reason it does not travel.",
  summary:
    "Change agents are often rewarded for owning outcomes. That habit becomes a limit when the transformation depends on people making it their own. Letting go is a skill, not a failure.",
  category: "Change Agents",
  tags: ["ownership", "trust", "control"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "before-another-framework-look-in-the-mirror",
    "ai-adoption-is-an-organizational-change-problem",
  ],
  relatedResourceSlug: "change-agent-reflection-guide",
  mirrorQuestion:
    "Where in this transformation are you holding on because it matters \u2014 and where are you holding on because letting go feels risky?",
};

export default function Body() {
  return (
    <>
      <p>
        Change agents tend to be organized, responsible and unusually willing to carry weight.
        These traits are how they became change agents. They are also how many transformations
        end up depending on a small group of people who cannot let go.
      </p>
      <h2>Control looks like ownership \u2014 until it doesn\u2019t</h2>
      <p>
        Holding the plan tightly early on is often the right move. Holding it tightly later,
        when the transformation needs to travel into the rest of the organization, quietly
        signals that no one else is trusted to hold it.
      </p>
      <PullQuote>
        A transformation that only works when the change agent is in the room has not
        transformed anything yet.
      </PullQuote>
      <h2>Letting go is a design choice</h2>
      <p>
        Handing ownership over is not the same as walking away. It is a deliberate choice about
        what the change agent still owns (the shape, the standards, the difficult conversations)
        and what the rest of the organization now owns (the practice, the decisions, the
        results).
      </p>
      <p>
        The change agents who make transformations stick tend to be the ones who work themselves
        out of the centre of the picture on purpose.
      </p>
    </>
  );
}
```

- [ ] **Step 6: `before-another-framework-look-in-the-mirror.tsx`**

```tsx
import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "before-another-framework-look-in-the-mirror",
  title: "Before You Add Another Framework, Look in the Mirror",
  subtitle:
    "Frameworks are useful. They are also easy to hide behind.",
  summary:
    "Transformation programmes tend to acquire frameworks the way ships acquire barnacles. Before adding another one, it is worth asking whether the last three have been used well \u2014 and what that answer says about leadership.",
  category: "Book Insights",
  tags: ["frameworks", "reflection", "leadership"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "transformation-intent-vs-experience",
    "why-people-resist-change",
  ],
  relatedResourceSlug: "be-the-mirror-leadership-checklist",
  mirrorQuestion:
    "Before adopting the next framework, what would happen if you asked how well the last one was actually being used \u2014 and what that answer says about how you are leading?",
};

export default function Body() {
  return (
    <>
      <p>
        There is nothing wrong with frameworks. Most transformations benefit from a clear one.
        The difficulty is that frameworks are also very easy to accumulate, and accumulating
        frameworks can feel productive without changing very much.
      </p>
      <h2>The framework instinct</h2>
      <p>
        When a transformation is not moving, the instinct is often to add structure. A new
        operating model. A new maturity matrix. A new stage-gate. Each addition sounds like
        progress. Each also delays the harder question of why the previous structure is not
        being used.
      </p>
      <PullQuote>
        Sometimes the most valuable thing a change agent can do is help an organization see
        itself more clearly \u2014 before adding one more thing to it.
      </PullQuote>
      <h2>The mirror question</h2>
      <p>
        Before adopting the next framework, it is worth asking a smaller question: how well is
        the last one being used, and what does that answer say about how the organization is
        being led? That reflection tends to be more useful than the framework it might replace.
      </p>
      <p>
        The point of a mirror is not to admire the reflection. It is to notice what needs to
        change on this side of the glass.
      </p>
    </>
  );
}
```

- [ ] **Step 7: Wire the aggregator — replace the stub `modules` array in `src/content/ideas/index.ts`**

Replace the line `const modules: readonly { meta: IdeaMeta; default: ComponentType }[] = [];` with:

```ts
import * as whyPeopleResist from "./why-people-resist-change";
import * as techVsOrgs from "./technology-can-change-faster-than-organizations";
import * as aiAdoption from "./ai-adoption-is-an-organizational-change-problem";
import * as intentVsExperience from "./transformation-intent-vs-experience";
import * as changeAgents from "./change-agents-dont-need-to-control-everything";
import * as mirrorFramework from "./before-another-framework-look-in-the-mirror";

const modules: readonly { meta: IdeaMeta; default: ComponentType }[] = [
  whyPeopleResist,
  techVsOrgs,
  aiAdoption,
  intentVsExperience,
  changeAgents,
  mirrorFramework,
];
```

Place the six `import * as …` lines at the top of the file (after the existing `import type { ComponentType }` line).

- [ ] **Step 8: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors. Six ideas load, aggregator sorts descending by `publishedDate` (all share the same date, so the natural order is preserved — deterministic).

- [ ] **Step 9: Commit**

```bash
git add src/content/ideas/why-people-resist-change.tsx src/content/ideas/technology-can-change-faster-than-organizations.tsx src/content/ideas/ai-adoption-is-an-organizational-change-problem.tsx src/content/ideas/transformation-intent-vs-experience.tsx src/content/ideas/change-agents-dont-need-to-control-everything.tsx src/content/ideas/before-another-framework-look-in-the-mirror.tsx src/content/ideas/index.ts
git commit -m "feat(ideas): six seed Ideas (Be the Mirror Editorial) + aggregator"
```

---

### Task 4: Ideas landing page (/ideas)

**Files:**
- Create: `src/components/site/ideas/IdeasHero.tsx`
- Create: `src/components/site/ideas/FeaturedIdea.tsx`
- Create: `src/components/site/ideas/LatestIdeas.tsx`
- Create: `src/components/site/ideas/ExploreByTheme.tsx`
- Create: `src/components/site/ideas/MirrorMomentsPreview.tsx`
- Create: `src/app/ideas/page.tsx`

**Interfaces:**
- Consumes: `IDEAS`, `getFeaturedIdea`, `getCategories` from `@/content/ideas`; `MIRROR_MOMENTS`; `FeaturedIdeaCard`, `IdeaCard`, `MirrorMomentCard`; `Header`, `Footer`, `Container`, `Section`, `SectionHeading`, `Reveal`, `Button`.
- Produces: The `/ideas` route.

- [ ] **Step 1: `IdeasHero.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function IdeasHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="ideas-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Ideas
            </p>
            <h1
              id="ideas-hero-title"
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">Reflections on</span>
              <span className="block text-[color:var(--color-accent-yellow)]">leading change.</span>
            </h1>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Transformation rarely follows the plan exactly. Ideas is where we explore the
              questions, behaviours and lessons that shape how change is actually experienced.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `FeaturedIdea.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedIdeaCard } from "@/components/ui/FeaturedIdeaCard";
import { getFeaturedIdea } from "@/content/ideas";

export function FeaturedIdea() {
  const featured = getFeaturedIdea();
  if (!featured) return null;
  return (
    <Section
      aria-labelledby="featured-idea-heading"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <h2 id="featured-idea-heading" className="sr-only">
          Featured Idea
        </h2>
        <Reveal>
          <FeaturedIdeaCard meta={featured.meta} />
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: `LatestIdeas.tsx`**

Shows Ideas other than the featured one, in a grid.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IdeaCard } from "@/components/ui/IdeaCard";
import { IDEAS, getFeaturedIdea } from "@/content/ideas";

export function LatestIdeas() {
  const featured = getFeaturedIdea();
  const rest = IDEAS.filter((i) => i.meta.slug !== featured?.meta.slug);
  return (
    <Section
      aria-labelledby="latest-ideas-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Latest" id="latest-ideas-title" className="max-w-3xl">
            Latest Ideas
          </SectionHeading>
        </Reveal>
        {rest.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              More Ideas coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((i, idx) => (
              <Reveal key={i.meta.slug} delayMs={80 * (idx % 3)}>
                <IdeaCard meta={i.meta} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: `ExploreByTheme.tsx`**

Simple category chip links — no client-side filter state. Each chip is a link that scrolls to a `#category-<slug>` anchor lower on the same page, or (since we do not implement per-category routes in Phase 4) simply renders the category and its count. Task 4 renders it as a decorative section with the counts; users click through to individual ideas via the grid.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getCategories } from "@/content/ideas";

export function ExploreByTheme() {
  const categories = getCategories();
  return (
    <Section
      aria-labelledby="explore-by-theme-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Explore" id="explore-by-theme-title" className="max-w-3xl">
            Explore by theme
          </SectionHeading>
        </Reveal>
        {categories.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Themes will appear once more Ideas are published.
            </p>
          </Reveal>
        ) : (
          <Reveal delayMs={100}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {categories.map(({ category, count }) => (
                <li key={category}>
                  <span
                    className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border-subtle)] px-4 py-2 text-[length:var(--text-small)] text-[color:var(--color-fg-primary)]"
                  >
                    {category}
                    <span className="text-[color:var(--color-fg-muted)]">/ {String(count).padStart(2, "0")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: `MirrorMomentsPreview.tsx`**

Shows up to 3 featured Mirror Moments, plus a CTA linking to the homepage `#ideas` section (kept — homepage Mirror Moments section retains `id="ideas"`).

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MirrorMomentCard } from "@/components/ui/MirrorMomentCard";
import { MIRROR_MOMENTS } from "@/content/mirror-moments";

export function MirrorMomentsPreview() {
  const featured = MIRROR_MOMENTS.filter((m) => m.featured).slice(0, 3);
  return (
    <Section
      aria-labelledby="mirror-moments-preview-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Mirror Moments" id="mirror-moments-preview-title" className="max-w-3xl">
            Short reflections for people leading change
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((moment, i) => (
            <Reveal key={moment.id} delayMs={100 * i}>
              <MirrorMomentCard moment={moment} index={i + 1} />
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={300}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/#ideas" variant="secondary">View more Mirror Moments</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: `src/app/ideas/page.tsx`** — compose + metadata

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IdeasHero } from "@/components/site/ideas/IdeasHero";
import { FeaturedIdea } from "@/components/site/ideas/FeaturedIdea";
import { LatestIdeas } from "@/components/site/ideas/LatestIdeas";
import { ExploreByTheme } from "@/components/site/ideas/ExploreByTheme";
import { MirrorMomentsPreview } from "@/components/site/ideas/MirrorMomentsPreview";

export const metadata: Metadata = {
  title: "Ideas | Be the Mirror",
  description:
    "Explore practical ideas about leadership, transformation, change agents, organizational culture and AI-driven change from Be the Mirror.",
  alternates: { canonical: "/ideas" },
};

export default function IdeasPage() {
  return (
    <>
      <Header />
      <main id="main">
        <IdeasHero />
        <FeaturedIdea />
        <LatestIdeas />
        <ExploreByTheme />
        <MirrorMomentsPreview />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; `/ideas` in route list.

- [ ] **Step 8: Commit**

```bash
git add src/components/site/ideas/IdeasHero.tsx src/components/site/ideas/FeaturedIdea.tsx src/components/site/ideas/LatestIdeas.tsx src/components/site/ideas/ExploreByTheme.tsx src/components/site/ideas/MirrorMomentsPreview.tsx src/app/ideas/page.tsx
git commit -m "feat(ideas): compose /ideas landing page with metadata"
```

---

### Task 5: Article route (/ideas/[slug])

**Files:**
- Create: `src/components/site/ideas/ArticleHeader.tsx`
- Create: `src/components/site/ideas/RelatedIdeas.tsx`
- Create: `src/components/site/ideas/PutThisIntoPractice.tsx`
- Create: `src/components/site/ideas/BackToIdeas.tsx`
- Create: `src/app/ideas/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getIdea`, `IDEAS`, `getRelatedIdeas` from `@/content/ideas`; `getResource`; `MirrorQuestion`, `IdeaCard`, `ResourceCard`; layout primitives.
- Produces: The `/ideas/[slug]` route with dynamic metadata and static params.

- [ ] **Step 1: `ArticleHeader.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { IdeaMeta } from "@/content/ideas";

type Props = { meta: IdeaMeta };

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleHeader({ meta }: Props) {
  return (
    <Section
      bleed="full"
      aria-labelledby="article-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              {meta.category}
            </p>
            <h1
              id="article-title"
              className="mt-6 font-semibold leading-[1.02] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {meta.title}
            </h1>
            {meta.subtitle ? (
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                {meta.subtitle}
              </p>
            ) : null}
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              {meta.author} &middot; {formatDate(meta.publishedDate)} &middot; {meta.readingTime} min read
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `RelatedIdeas.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IdeaCard } from "@/components/ui/IdeaCard";
import { getRelatedIdeas } from "@/content/ideas";

type Props = { slug: string };

export function RelatedIdeas({ slug }: Props) {
  const related = getRelatedIdeas(slug, 3);
  if (related.length === 0) return null;
  return (
    <Section
      aria-labelledby="related-ideas-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Related" id="related-ideas-title" className="max-w-3xl">
            More Ideas to explore
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((i, idx) => (
            <Reveal key={i.meta.slug} delayMs={100 * idx}>
              <IdeaCard meta={i.meta} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: `PutThisIntoPractice.tsx`**

Renders a related resource card if the Idea specifies one. If the resource does not exist or is not defined, the section renders nothing.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { getResource } from "@/content/resources";

type Props = { resourceSlug?: string };

export function PutThisIntoPractice({ resourceSlug }: Props) {
  if (!resourceSlug) return null;
  const resource = getResource(resourceSlug);
  if (!resource) return null;
  return (
    <Section
      aria-labelledby="practice-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Take it further" id="practice-title">
              Put this idea into practice
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10">
              <ResourceCard resource={resource} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: `BackToIdeas.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function BackToIdeas() {
  return (
    <Section aria-label="Back to Ideas" className="border-t border-[color:var(--color-border-subtle)]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-accent-cyan)]"
          >
            &larr; Back to Ideas
          </Link>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: `src/app/ideas/[slug]/page.tsx`** — compose

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MirrorQuestion } from "@/components/ui/MirrorQuestion";
import { ArticleHeader } from "@/components/site/ideas/ArticleHeader";
import { RelatedIdeas } from "@/components/site/ideas/RelatedIdeas";
import { PutThisIntoPractice } from "@/components/site/ideas/PutThisIntoPractice";
import { BackToIdeas } from "@/components/site/ideas/BackToIdeas";
import { IDEAS, getIdea } from "@/content/ideas";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return IDEAS.map((i) => ({ slug: i.meta.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return { title: "Idea not found | Be the Mirror" };
  return {
    title: `${idea.meta.title} | Be the Mirror`,
    description: idea.meta.summary,
    alternates: { canonical: `/ideas/${idea.meta.slug}` },
    openGraph: {
      title: idea.meta.title,
      description: idea.meta.summary,
      type: "article",
      publishedTime: idea.meta.publishedDate,
    },
  };
}

export default async function IdeaPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) notFound();
  const { meta, Body } = idea;
  return (
    <>
      <Header />
      <main id="main">
        <ArticleHeader meta={meta} />
        <Section aria-label="Article body" className="border-t border-[color:var(--color-border-subtle)]">
          <Container>
            <Reveal>
              <article className="idea-prose mx-auto max-w-3xl">
                <Body />
                {meta.mirrorQuestion ? (
                  <MirrorQuestion>{meta.mirrorQuestion}</MirrorQuestion>
                ) : null}
              </article>
            </Reveal>
          </Container>
        </Section>
        <PutThisIntoPractice resourceSlug={meta.relatedResourceSlug} />
        <RelatedIdeas slug={meta.slug} />
        <BackToIdeas />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; six `/ideas/*` routes prerendered in the build output.

- [ ] **Step 7: Commit**

```bash
git add src/components/site/ideas/ArticleHeader.tsx src/components/site/ideas/RelatedIdeas.tsx src/components/site/ideas/PutThisIntoPractice.tsx src/components/site/ideas/BackToIdeas.tsx src/app/ideas/[slug]/page.tsx
git commit -m "feat(ideas): dynamic article route with static params + metadata"
```

---

### Task 6: Migrate homepage MirrorMoments to structured content + add "Explore more Ideas" CTA

**Files:**
- Modify: `src/components/site/sections/MirrorMoments.tsx` (rewrite to consume `MIRROR_MOMENTS`; preserve `id="ideas"`; keep the three approved statements as the featured trio; add CTA to `/ideas`)

**Interfaces:**
- Consumes: `MIRROR_MOMENTS` from `@/content/mirror-moments`; `MirrorMomentCard`, `Button`.

**Preservation:** The three homepage moments today are the ones tagged `featured: true` in `mirror-moments.ts` (mm-01, mm-02, mm-03). Wording is preserved character-for-character (Task 1 stored them verbatim).

- [ ] **Step 1: Rewrite `MirrorMoments.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MirrorMomentCard } from "@/components/ui/MirrorMomentCard";
import { MIRROR_MOMENTS } from "@/content/mirror-moments";

export function MirrorMoments() {
  const featured = MIRROR_MOMENTS.filter((m) => m.featured).slice(0, 3);
  return (
    <Section
      id="ideas"
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
          {featured.map((moment, i) => (
            <Reveal key={moment.id} delayMs={120 * i}>
              <MirrorMomentCard moment={moment} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={360}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/ideas" variant="secondary">Explore more Ideas</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors. Homepage still renders exactly three Mirror Moments with the same wording (mm-01, mm-02, mm-03) plus a new `/ideas` CTA.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/sections/MirrorMoments.tsx
git commit -m "refactor(home): consume MIRROR_MOMENTS + add Explore Ideas CTA"
```

---

### Task 7: Resources page (/resources)

**Files:**
- Create: `src/components/site/resources/ResourcesHero.tsx`
- Create: `src/components/site/resources/FeaturedResource.tsx`
- Create: `src/components/site/resources/ResourceGrid.tsx`
- Create: `src/app/resources/page.tsx`

**Interfaces:**
- Consumes: `RESOURCES`, `ResourceData` from `@/content/resources`; `ResourceCard`, layout primitives.
- Produces: The `/resources` route.

**No client-side filter state.** Simple by-type grouping in the grid (spec: "If filtering would add unnecessary complexity, use simple category sections instead."). Each type gets a small heading and its resources listed underneath.

- [ ] **Step 1: `ResourcesHero.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function ResourcesHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="resources-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Resources
            </p>
            <h1
              id="resources-hero-title"
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">Turn reflection</span>
              <span className="block text-[color:var(--color-accent-yellow)]">into action.</span>
            </h1>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Practical tools for leaders, managers and change agents navigating transformation.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `FeaturedResource.tsx`**

Uses the resource marked `featured: true` (currently `be-the-mirror-leadership-checklist`). Renders a larger promotional block with explicit `Coming Soon` state when not available.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RESOURCES } from "@/content/resources";

export function FeaturedResource() {
  const featured = RESOURCES.find((r) => r.featured);
  if (!featured) return null;
  const available = featured.status === "available";
  const ctaLabel = available
    ? featured.downloadUrl
      ? "Download"
      : "Open Resource"
    : "Coming Soon";
  return (
    <Section
      aria-labelledby="featured-resource-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-[color:var(--color-accent-cyan-soft)] bg-[color:var(--color-bg-secondary)] p-8 md:p-12 lg:p-16">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Featured Resource &middot; {featured.type}
            </p>
            <h2
              id="featured-resource-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Before you ask your organization to change, ask yourself a few questions.
            </h2>
            <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              {featured.description}
            </p>
            <div className="mt-10">
              <span
                aria-disabled={available ? undefined : "true"}
                className="inline-flex items-center rounded-full border border-[color:var(--color-border-subtle)] px-5 py-2 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]"
              >
                {ctaLabel}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: `ResourceGrid.tsx`**

Groups resources by `type` and renders each group as a small labeled section. Excludes the featured resource (already shown above).

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { RESOURCES, type ResourceType } from "@/content/resources";

const TYPE_ORDER: readonly ResourceType[] = [
  "Checklist",
  "Assessment",
  "Discussion Guide",
  "Worksheet",
  "Framework",
  "Playbook",
];

export function ResourceGrid() {
  const rest = RESOURCES.filter((r) => !r.featured);
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    resources: rest.filter((r) => r.type === type),
  })).filter((g) => g.resources.length > 0);

  return (
    <Section
      aria-labelledby="resource-grid-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Library" id="resource-grid-title" className="max-w-3xl">
            More resources
          </SectionHeading>
        </Reveal>
        {grouped.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              More resources coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 flex flex-col gap-16">
            {grouped.map((group) => (
              <div key={group.type}>
                <Reveal>
                  <h3 className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    {group.type}
                  </h3>
                </Reveal>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.resources.map((r, i) => (
                    <Reveal key={r.slug} delayMs={80 * (i % 3)}>
                      <ResourceCard resource={r} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: `src/app/resources/page.tsx`** — compose + metadata

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ResourcesHero } from "@/components/site/resources/ResourcesHero";
import { FeaturedResource } from "@/components/site/resources/FeaturedResource";
import { ResourceGrid } from "@/components/site/resources/ResourceGrid";

export const metadata: Metadata = {
  title: "Resources | Be the Mirror",
  description:
    "Practical tools, checklists and reflection guides for leaders and change agents navigating organizational transformation and AI-driven change.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <ResourcesHero />
        <FeaturedResource />
        <ResourceGrid />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; `/resources` in route list.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/resources/ResourcesHero.tsx src/components/site/resources/FeaturedResource.tsx src/components/site/resources/ResourceGrid.tsx src/app/resources/page.tsx
git commit -m "feat(resources): compose /resources page with coming-soon states"
```

---

### Task 8: Cross-page CTA updates + Book page "Continue Exploring"

**Files:**
- Modify: `src/components/site/authors/AuthorsCollectiveCTA.tsx` (change secondary CTA `href="/#ideas"` → `href="/ideas"`)
- Modify: `src/components/site/book/BookFinalCTA.tsx` — no change to existing CTAs. Instead, add a small `ContinueExploring` block AFTER `BookFinalCTA` on `/book` via a new section.
- Create: `src/components/site/book/ContinueExploringSection.tsx`
- Modify: `src/app/book/page.tsx` (append `<ContinueExploringSection />` after `<BookFinalCTA />` inside `<main>`)

**Interfaces:**
- Consumes: `ContinueExploring` (Task 2).

**Ruling — `AuthorsCollectiveCTA` change:** Phase 3 explicitly documented `/#ideas` as an interim cross-page anchor because `/ideas` did not exist yet. Now that `/ideas` exists, swap to the real route. Cost if wrong: users on `/authors` clicking "Explore the Ideas" land on the new dedicated route (which is exactly the destination the spec always intended).

**Ruling — homepage CTAs to /ideas:** The homepage `MirrorMoments` section already got its CTA in Task 6. No other homepage sections currently link to `#ideas` for content browsing (the Phase 2 `AuthorsCollectiveCTA` in Phase 3's plan lives on `/authors`, not `/`).

- [ ] **Step 1: Update `AuthorsCollectiveCTA.tsx`**

Change the secondary Button:

```tsx
<Button href="/#ideas" variant="secondary">Explore the Ideas</Button>
```

to:

```tsx
<Button href="/ideas" variant="secondary">Explore the Ideas</Button>
```

That is the only edit to this file.

- [ ] **Step 2: Create `src/components/site/book/ContinueExploringSection.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContinueExploring } from "@/components/ui/ContinueExploring";

export function ContinueExploringSection() {
  return (
    <Section
      aria-labelledby="continue-exploring-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading eyebrow="Continue" id="continue-exploring-title">
              Continue exploring
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10">
              <ContinueExploring
                items={[
                  {
                    label: "Ideas",
                    href: "/ideas",
                    description:
                      "Reflections on leading change \u2014 practical writing for leaders, managers and change agents.",
                  },
                  {
                    label: "Resources",
                    href: "/resources",
                    description:
                      "Tools, checklists and guides for turning reflection into action.",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Modify `src/app/book/page.tsx`**

Add the import near the other book section imports:

```tsx
import { ContinueExploringSection } from "@/components/site/book/ContinueExploringSection";
```

Add `<ContinueExploringSection />` inside `<main>` AFTER `<BookFinalCTA />` (last child of `<main>` before the closing tag).

- [ ] **Step 4: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/authors/AuthorsCollectiveCTA.tsx src/components/site/book/ContinueExploringSection.tsx src/app/book/page.tsx
git commit -m "feat(cross-link): /ideas swap + /book Continue Exploring block"
```

---

### Task 9: Full validation pass (tsc + lint + build + dev-server smoke)

**Files:**
- No code changes. This task runs the validation gate for Phase 4.

**Interfaces:**
- Consumes: everything.

- [ ] **Step 1: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors. Build output shows the following routes:
- `/`
- `/book`
- `/authors`
- `/ideas`
- `/ideas/[slug]` (with six prerendered slugs)
- `/resources`

- [ ] **Step 2: Dev-server smoke test**

```bash
npm run dev &
DEV_PID=$!
sleep 5

# HTTP status
curl -sI http://localhost:3000/                                                      | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/book                                                  | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/authors                                               | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/ideas                                                 | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/ideas/why-people-resist-change                        | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/ideas/technology-can-change-faster-than-organizations | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/ideas/before-another-framework-look-in-the-mirror     | head -1  # HTTP/1.1 200
curl -sI http://localhost:3000/resources                                             | head -1  # HTTP/1.1 200

# Homepage — MirrorMoments still renders three approved seeds
curl -s http://localhost:3000/ | grep -E "Mirror Moments|What about the change made resistance rational|Technology can change in months|Explore more Ideas" > /dev/null

# /ideas landing — hero, featured, latest, themes, mirror moments preview
curl -s http://localhost:3000/ideas | grep -E "Reflections on|leading change|Featured Idea|Latest Ideas|Explore by theme|Mirror Moments|View more Mirror Moments" > /dev/null

# /ideas/why-people-resist-change article page — title, subtitle, mirror question, related, back
curl -s http://localhost:3000/ideas/why-people-resist-change | grep -E "Why People Resist Change|Mirror Question|More Ideas to explore|Back to Ideas" > /dev/null

# /resources — hero + featured + at least one Coming Soon
curl -s http://localhost:3000/resources | grep -E "Turn reflection|into action|Featured Resource|Coming Soon|Be the Mirror Leadership Checklist" > /dev/null

# /book — Continue Exploring block appears now
curl -s http://localhost:3000/book | grep -E "Continue exploring|Ideas|Resources" > /dev/null

# /authors — CTA updated (points to /ideas)
curl -s http://localhost:3000/authors | grep -E "The conversation continues|Explore the Ideas" > /dev/null

kill $DEV_PID 2>/dev/null || true
```

Expected: every `curl -sI` returns `HTTP/1.1 200`. Every grep exits 0.

- [ ] **Step 3: No commit necessary**

Task 9 is verification only. If any grep fails, the failing task's implementer is responsible for the fix; Task 9 is BLOCKED until the substring exists.

---

## Self-review checklist (author, before dispatching)

- **Spec coverage.** AC-45..AC-65 map cleanly:
  - AC-45 (/ideas exists, brand identity) → Task 4.
  - AC-46 (thought-leadership, not blog) → Task 4 hero + Task 2 primitives use "Ideas" throughout; no "Blog" language anywhere.
  - AC-47 (reusable Idea content model) → Task 1 `IdeaMeta` + aggregator.
  - AC-48 (/ideas/[slug] clean URLs) → Task 5 dynamic route; slugs kebab-case.
  - AC-49 (≥ 4 seed Ideas, not false book excerpts) → Task 3 delivers 6; author is "Be the Mirror Editorial"; no "Chapter X" / "in the book" language.
  - AC-50 (excellent editorial reading experience) → Task 2 `.idea-prose` block + Task 5 article layout with max-w-3xl centered.
  - AC-51 (reusable MirrorQuestion) → Task 2 `src/components/ui/MirrorQuestion.tsx`.
  - AC-52 (Mirror Moments structured) → Task 1 `MIRROR_MOMENTS`; Task 6 migrates homepage to consume it.
  - AC-53 (three approved MMs represented) → mm-01/02/03 stored verbatim in Task 1; Task 6 renders them; Task 4 preview also renders them.
  - AC-54 (brand-consistent visuals) → reuses `MirrorMoment` Phase 2 primitive; same tokens.
  - AC-55 (/resources exists) → Task 7.
  - AC-56 (structured resource data) → Task 1 `RESOURCES`; Task 7 consumes.
  - AC-57 (Coming Soon, no fake downloads) → Task 2 `ResourceCard` cta helper; Task 7 featured block; every seed resource has `status: "coming-soon"`.
  - AC-58 (Ideas ↔ Resources internal links) → Task 5 `PutThisIntoPractice`; Task 1 `relatedIdeaSlug` on each resource; Task 8 Book "Continue Exploring".
  - AC-59 (homepage Explore the Ideas → /ideas) → Task 6 CTA + Task 8 AuthorsCollectiveCTA update.
  - AC-60 (nav has working Ideas + Resources) → Task 1 nav flip.
  - AC-61 (no false attribution) → Every seed uses `Be the Mirror Editorial`.
  - AC-62 (no fake book quotations) → Editorial body copy avoids "Chapter/book/quotation" framing.
  - AC-63 (responsive) → grids use `md:grid-cols-2 lg:grid-cols-3`; article body uses `mx-auto max-w-3xl`.
  - AC-64 (page metadata) → Task 4 `/ideas` metadata; Task 5 `generateMetadata`; Task 7 `/resources` metadata.
  - AC-65 (no significant errors) → Task 9 validation gate.

- **Placeholder scan.** No "TBD", "TODO", or "lorem" in any task's code blocks. `PURCHASE_URL = "#"` from Phase 3 remains an intentional Phase-5 placeholder documented in `src/config/site.ts`.

- **Type consistency.** `IdeaMeta` field names (`slug`, `title`, `subtitle`, `summary`, `category`, `tags`, `author`, `publishedDate`, `readingTime`, `featured`, `status`, `relatedIdeaSlugs`, `relatedResourceSlug`, `mirrorQuestion`) match every consumer. `MirrorMomentData` and `ResourceData` shapes match consumers. `getIdea(slug) | undefined` handled by `notFound()` in the route.

- **Anchor / route targets.** `/ideas`, `/resources`, `/ideas/<six-slugs>` all exist by end of plan; homepage `id="ideas"` preserved for the interim `/#ideas` anchor still used by `MirrorMomentsPreview` on `/ideas`.

- **Global constraint pass.** Zero new dependencies (no MDX, no markdown, no typography plugin — everything is TypeScript modules). No new client components. Editorial content uses "Be the Mirror Editorial" attribution and avoids book-quotation framing.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-17-be-the-mirror-phase-4.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
