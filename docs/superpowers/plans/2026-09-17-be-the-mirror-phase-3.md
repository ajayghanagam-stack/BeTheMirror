# Be the Mirror — Phase 3 Implementation Plan (Book + Authors)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two dedicated content routes — `/book` and `/authors` — plus a shared footer, so the site feels like a credible official companion to *Be the Mirror*. Reuse the Phase 1/2 design system; do not invent chapter names, testimonials, credentials, photos, or retailer URLs.

**Architecture:** Two new App Router segments under `src/app/book/` and `src/app/authors/`, each with a `page.tsx` + per-page `export const metadata`. Content extracted into typed data files under `src/content/` so authors' info and book chapters can later move to a CMS. Reusable placeholder-friendly primitives — `BookChapter`, `Testimonial`, `AuthorPerspective`, `MetaphorVisual`, `Footer` — added to the design system. A single `src/config/site.ts` centralizes the (currently unknown) purchase URL behind a named constant with an explicit TODO. Homepage CTAs previously pointing at anchors are re-targeted to `/book` and `/authors`.

**Tech Stack:** Next.js 16.3.5 (App Router, Turbopack), React 19, TypeScript 5, Tailwind v4 with `@theme` tokens, no new runtime dependencies.

**Spec:** User's Phase 3 message on 2026-09-17, verbatim in session transcript at `~/.claude/projects/-Users-ajaychandraghanagam-projects-be-the-mirror/0ab49cd1-1f6f-4d57-9866-3b514ca8d7ab.jsonl` (see the "PHASE 3 = THE BOOK + AUTHORS" system message). AC-26..AC-44 all resolve against that spec.

## Global Constraints

- Reuse the Phase 1/2 design system exactly. Do not restyle tokens (`--color-*`, `--text-*`, `--spacing-*`, `--container-site`). Never duplicate a primitive under a new name — reuse `Container`, `Section`, `Button`, `SectionHeading`, `AuthorCard`, `MirrorMoment`, `Reveal`.
- No new npm dependencies. No animation libraries, video, database, CMS, forms, analytics.
- **No fabrication.** Do not invent:
  - author job titles, companies, years of experience, degrees, awards, credentials, client names, or professional history
  - book chapter titles, chapter numbers, chapter summaries, or excerpts
  - reader endorsements, testimonial names, quotes, or affiliations
  - retailer URLs, purchase links, ISBN, publication dates, or prices
  - author photographs (do not AI-generate replacements)
- **Placeholder discipline.** Where content is missing, render an understated, clearly-labeled placeholder (e.g. "Biography content to be provided.", "Chapter-by-chapter overview coming soon.", "Reader perspectives and endorsements coming soon."). Placeholders must look intentional, never lorem-ipsum. Structure components so the real data can drop in later without redesign.
- **Server components by default.** Only add `"use client"` when interactivity is unavoidable. Phase 3 introduces no new client components — reuse `Reveal` for animation.
- **Real supplied artwork only.** `/book-3-books.png` for the Book page hero, `/book-lying-flat.png` for the Book excerpt section. Do not reuse the Phase 1 hero image (`/book-hero-45.png`) on the Book page — the homepage owns it.
- **Copy discipline.** Every copy string in the Phase 3 spec is verbatim. Convert straight quotes/apostrophes/dashes to HTML entities (`&ldquo;`, `&rdquo;`, `&rsquo;`, `&mdash;`) — matches Phase 2 convention.
- **Accessibility.** Semantic `<article>`/`<section>`, one `<h1>` per page (via `<h1>` in each route's hero), `<h2>` for sections (via `SectionHeading`), descriptive `alt` text on real images, decorative imagery `aria-hidden="true"`. Anchor targets must be reachable and land at real content. Focus-visible states inherit from `globals.css`.
- **Metadata.** Per-page `export const metadata: Metadata` using the exact titles/descriptions from the spec (see Task 9 and Task 12).
- **Author order everywhere:** Lois Wortley → Ajay Ghanagam → Hiren Doshi. Do not reorder.
- **Purchase URL:** Route every "Buy the Book" CTA through `PURCHASE_URL` in `src/config/site.ts`. Default to `"#"` with a `// TODO(phase-4): supply real retailer URL` comment so the constant is the single edit point.
- **Verification per task:** `npx tsc --noEmit && npm run lint` must be clean before commit. The final task runs `npm run build` and a dev-server smoke test.
- **Commit discipline:** one commit per task, imperative subject, no `--no-verify`.

---

## File Structure

New files created in Phase 3:

- **Config & content:**
  - `src/config/site.ts` — site-wide constants (`PURCHASE_URL`, `SITE_NAME`, `SITE_TAGLINE`).
  - `src/content/authors.ts` — typed `Author` model + ordered `AUTHORS` array (3 entries; content fields are all placeholders flagged for the user to supply).
  - `src/content/book.ts` — typed `BookChapter`, `Excerpt`, `Testimonial` models + empty ordered arrays for each. Also carries the ten `BOOK_THEMES` and the seven `BOOK_AUDIENCES` (both are project-agnostic framing content, not fabricated credentials).

- **Reusable primitives:**
  - `src/components/ui/BookChapter.tsx` — renders `{ number, title, summary, optionalQuote }`; handles the empty-list case at the section level (this component always renders a chapter).
  - `src/components/ui/Testimonial.tsx` — renders `{ quote, attribution, role?, org? }`; caller ensures no fabrication.
  - `src/components/ui/AuthorPerspective.tsx` — renders a labeled quote block with the author's name; falls back to a labeled placeholder when `quote` is omitted.
  - `src/components/site/book/MetaphorVisual.tsx` — decorative "Fracture → Reflection → Light" horizontal glyph triptych (CSS/SVG only, no image asset). Marked `aria-hidden="true"`.
  - `src/components/site/Footer.tsx` — shared footer used by all three routes.

- **Book route (`/book`):**
  - `src/app/book/page.tsx` — composes the ten Book page sections and exports metadata.
  - `src/components/site/book/BookHero.tsx` — Section 1.
  - `src/components/site/book/CentralQuestion.tsx` — Section 2.
  - `src/components/site/book/WhyWeWroteIt.tsx` — Section 3.
  - `src/components/site/book/TitleMetaphor.tsx` — Section 4.
  - `src/components/site/book/BookThemes.tsx` — Section 5.
  - `src/components/site/book/WhoShouldRead.tsx` — Section 6.
  - `src/components/site/book/AIWorld.tsx` — Section 7.
  - `src/components/site/book/BookJourney.tsx` — Section 8 (chapters placeholder).
  - `src/components/site/book/FromTheBook.tsx` — Section 9 (excerpt placeholder).
  - `src/components/site/book/BookEndorsements.tsx` — Section 10 (testimonials placeholder).
  - `src/components/site/book/BookFinalCTA.tsx` — closing CTA.

- **Authors route (`/authors`):**
  - `src/app/authors/page.tsx` — composes the Authors page and exports metadata.
  - `src/components/site/authors/AuthorsHero.tsx` — hero.
  - `src/components/site/authors/SharedStory.tsx` — "Why we wrote this together".
  - `src/components/site/authors/AuthorProfile.tsx` — reusable large editorial profile (photo | bio, alternating). Consumes an `Author` from `src/content/authors.ts`.
  - `src/components/site/authors/AuthorsCollectiveCTA.tsx` — closing CTA.

Files modified:

- `src/lib/nav.ts` — mark "The Book" (`/book`) and "Authors" (`/authors`) as `live: true`, and change their `href` from `#the-book`/`#authors` to `/book`/`/authors`.
- `src/components/site/Header.tsx` — replace hard-coded `href="#buy"` with `href={PURCHASE_URL}`.
- `src/components/site/MobileNavigation.tsx` — same purchase URL swap.
- `src/components/site/Hero.tsx` — "Explore the Ideas" → still `#ideas` (Phase 2 anchor, kept); this is the homepage — no change to book/authors linkage here. However: no Phase 3 change required. (Documented for auditor.)
- `src/components/site/sections/BookPreview.tsx` — "Explore the Book" secondary now points to `/book`; "Buy the Book" uses `PURCHASE_URL`.
- `src/components/site/sections/AuthorsPreview.tsx` — "Meet the Authors" points to `/authors` (currently `#authors` — an in-page anchor). Author names in the cards remain non-links; author-cards on this preview may optionally become links to `/authors` (see Task 2 ruling).
- `src/components/site/sections/FinalCTA.tsx` — "Buy the Book" uses `PURCHASE_URL`. Secondary stays `#ideas` (per Phase 2 fix — points to Mirror Moments section) — no Phase 3 change.
- `src/app/page.tsx` — no structural change; imports remain identical. (Documented for auditor.)
- `src/app/layout.tsx` — no change to metadata (root default remains); per-page metadata added in the two new routes.

---

## Preflight cross-task scan

To be completed by the executing subagent-driven-development skill (its Preflight cross-task scan step). Author-order, purchase-URL wiring, and chapter/testimonial/excerpt placeholder consistency across Book page sections are the three surfaces most likely to disagree — reviewers should flag any inconsistency.

---

## Tasks

_Tasks are ordered so that a dependent artifact never precedes its producer. Task 1 introduces the content data model and config that every later Book/Authors section consumes. Task 2 wires nav + purchase URL globally. Task 3 batches the four small reusable primitives so a single implementer sees them together. Tasks 4–9 build the Book page section-by-section, then compose. Tasks 10–12 build the Authors page. Task 13 attaches the footer and validates end-to-end._

Task briefs below are self-contained and copy the spec's verbatim copy inline so an implementer never has to grep the plan for a headline.

### Task 1: Config + content data scaffolding

**Files:**
- Create: `src/config/site.ts`
- Create: `src/content/authors.ts`
- Create: `src/content/book.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `PURCHASE_URL` (string), `SITE_NAME` (string), `SITE_TAGLINE` (string) from `@/config/site`.
  - `type Author = { slug: string; name: string; role?: string; shortBio?: string; fullBio?: string; expertise?: readonly string[]; linkedinUrl?: string; perspective?: string; speakingTopics?: readonly string[]; image?: { src: string; alt: string; width: number; height: number } }` and `AUTHORS: readonly Author[]` (three entries, canonical order).
  - `type BookChapterData = { number: number; title: string; summary: string; optionalQuote?: string }`; `CHAPTERS: readonly BookChapterData[]` (empty).
  - `type ExcerptData = { text: string; source?: string }`; `EXCERPTS: readonly ExcerptData[]` (empty).
  - `type TestimonialData = { quote: string; attribution: string; role?: string; org?: string }`; `TESTIMONIALS: readonly TestimonialData[]` (empty).
  - `BOOK_THEMES: readonly { title: string; summary: string }[]` (the ten themes from the spec, framing-only text).
  - `BOOK_AUDIENCES: readonly { situation: string; label?: string }[]` (the audience situations from the spec — situations, not job-title claims).

- [ ] **Step 1: Create `src/config/site.ts`**

```ts
// Site-wide constants. Update PURCHASE_URL when the real retailer link is available.
// TODO(phase-4): supply real retailer/purchase URL — must be a full https:// URL.
export const PURCHASE_URL = "#" as const;

export const SITE_NAME = "Be the Mirror" as const;
export const SITE_TAGLINE = "A Change Agent\u2019s Guide to Transformation for an AI World" as const;
```

- [ ] **Step 2: Create `src/content/authors.ts`**

```ts
export type AuthorImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Author = {
  slug: string;
  name: string;
  role?: string;
  shortBio?: string;
  fullBio?: string;
  expertise?: readonly string[];
  linkedinUrl?: string;
  perspective?: string;
  speakingTopics?: readonly string[];
  image?: AuthorImage;
};

// Canonical author order — do not change without a spec update.
// Content fields deliberately omitted (undefined) rather than fabricated.
// The UI renders explicit "to be provided" placeholders whenever a field is missing.
export const AUTHORS: readonly Author[] = [
  { slug: "lois-wortley",  name: "Lois Wortley" },
  { slug: "ajay-ghanagam", name: "Ajay Ghanagam" },
  { slug: "hiren-doshi",   name: "Hiren Doshi" },
] as const;
```

- [ ] **Step 3: Create `src/content/book.ts`**

```ts
export type BookChapterData = {
  number: number;
  title: string;
  summary: string;
  optionalQuote?: string;
};

export type ExcerptData = {
  text: string;
  source?: string;
};

export type TestimonialData = {
  quote: string;
  attribution: string;
  role?: string;
  org?: string;
};

export type BookTheme = { title: string; summary: string };
export type BookAudience = { situation: string; label?: string };

// Empty until verified content is supplied. Consumers render placeholder blocks
// when these arrays are empty. Do not populate with fabricated chapter names,
// excerpts, or endorsements.
export const CHAPTERS: readonly BookChapterData[] = [] as const;
export const EXCERPTS: readonly ExcerptData[] = [] as const;
export const TESTIMONIALS: readonly TestimonialData[] = [] as const;

// Themes are framing labels (broad ideas). They are NOT chapter titles.
// The UI must label this section as "themes" or "ideas", never "chapters".
export const BOOK_THEMES: readonly BookTheme[] = [
  { title: "Leading through transformation",
    summary: "How leaders shape whether change becomes real for the people it asks to change." },
  { title: "Understanding resistance",
    summary: "Resistance often signals something rational about the change itself." },
  { title: "Building trust during change",
    summary: "Trust is the currency change spends — and how it is rebuilt when spent down." },
  { title: "Creating change agents",
    summary: "Change scales when more people help others make sense of it." },
  { title: "Turning strategy into lived experience",
    summary: "The distance between what is announced and what is experienced." },
  { title: "Culture and organizational behaviour",
    summary: "The patterns that shape how a change is absorbed, ignored, or reshaped." },
  { title: "Technology transformation",
    summary: "Why implementation and adoption are not the same thing." },
  { title: "AI-driven change",
    summary: "What accelerates when the technology accelerates — and what does not." },
  { title: "Learning and adaptability",
    summary: "How organizations build the capability to keep changing." },
  { title: "Sustainable transformation",
    summary: "What it takes for change to hold after the program ends." },
] as const;

// Audiences: situations, not job-title claims.
export const BOOK_AUDIENCES: readonly BookAudience[] = [
  { label: "For leaders",
    situation: "trying to understand why a well-designed transformation is struggling to gain traction." },
  { label: "For technology leaders",
    situation: "discovering that implementation and adoption are not the same thing." },
  { label: "For managers",
    situation: "helping teams work through uncertainty." },
  { label: "For change agents",
    situation: "who need to influence without always having authority." },
  { label: "For AI leaders",
    situation: "introducing AI into organizations that are still learning how to absorb continuous change." },
  { label: "For HR and organizational leaders",
    situation: "supporting people through overlapping waves of change." },
  { label: "For consultants and coaches",
    situation: "working alongside organizations navigating transformation." },
] as const;
```

- [ ] **Step 4: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/config/site.ts src/content/authors.ts src/content/book.ts
git commit -m "feat(content): typed authors + book data models with placeholders"
```

---

### Task 2: Navigation + purchase-URL wiring

**Files:**
- Modify: `src/lib/nav.ts`
- Modify: `src/components/site/Header.tsx`
- Modify: `src/components/site/MobileNavigation.tsx`
- Modify: `src/components/site/sections/BookPreview.tsx`
- Modify: `src/components/site/sections/AuthorsPreview.tsx`
- Modify: `src/components/site/sections/FinalCTA.tsx`

**Interfaces:**
- Consumes: `PURCHASE_URL` from `@/config/site` (Task 1).
- Produces: Live nav routes `/book` and `/authors`; homepage CTAs pointing at those routes; a single edit point for purchase URL.

**Notes:**
- `src/components/site/Hero.tsx` intentionally NOT modified — hero's "Explore the Ideas" keeps its `#ideas` anchor (Phase 2 anchor points at Mirror Moments). Hero's "Buy the Book" DOES swap to `PURCHASE_URL`.
- Do not touch the homepage `BookPreview` copy — only its two `Button href` values (secondary → `/book`, primary → `PURCHASE_URL`).
- Do not touch `AuthorsPreview` copy — only the closing `Button href` (`#authors` → `/authors`).
- Do not touch `FinalCTA` copy — only the primary `Button href` (`#buy` → `PURCHASE_URL`); secondary stays `#ideas`.

- [ ] **Step 1: Update `src/lib/nav.ts`**

Replace the two placeholder entries so both routes are live. Keep other items untouched.

```ts
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home",      href: "/",         live: true  },
  { label: "The Book",  href: "/book",     live: true  },
  { label: "Ideas",     href: "#ideas",    live: false },
  { label: "Authors",   href: "/authors",  live: true  },
  { label: "Resources", href: "#resources",live: false },
  { label: "Speaking",  href: "#speaking", live: false },
  { label: "Contact",   href: "#contact",  live: false },
];
```

- [ ] **Step 2: Swap "Buy the Book" hrefs to `PURCHASE_URL`**

In each of: `Header.tsx`, `MobileNavigation.tsx`, `Hero.tsx`, `BookPreview.tsx`, `FinalCTA.tsx`

Add near the top:

```tsx
import { PURCHASE_URL } from "@/config/site";
```

Change every `<Button href="#buy" variant="primary">Buy the Book</Button>` to `<Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>`.

- [ ] **Step 3: Retarget homepage section CTAs**

In `src/components/site/sections/BookPreview.tsx`, change the button row:

```tsx
<div className="mt-10 flex flex-wrap gap-4">
  <Button href="/book" variant="secondary">Explore the Book</Button>
  <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
</div>
```

In `src/components/site/sections/AuthorsPreview.tsx`, change the closing CTA:

```tsx
<Button href="/authors" variant="secondary">Meet the Authors</Button>
```

- [ ] **Step 4: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/nav.ts src/components/site/Header.tsx src/components/site/MobileNavigation.tsx src/components/site/Hero.tsx src/components/site/sections/BookPreview.tsx src/components/site/sections/AuthorsPreview.tsx src/components/site/sections/FinalCTA.tsx
git commit -m "feat(nav): route The Book/Authors + centralize purchase URL"
```

---

### Task 3: Reusable primitives — BookChapter, Testimonial, AuthorPerspective, MetaphorVisual, Footer

**Files:**
- Create: `src/components/ui/BookChapter.tsx`
- Create: `src/components/ui/Testimonial.tsx`
- Create: `src/components/ui/AuthorPerspective.tsx`
- Create: `src/components/site/book/MetaphorVisual.tsx`
- Create: `src/components/site/Footer.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`; `Container` from `@/components/layout/Container`; types from `@/content/authors` and `@/content/book`; `NAV_ITEMS` from `@/lib/nav`; `SITE_NAME`, `SITE_TAGLINE` from `@/config/site`.
- Produces:
  - `BookChapter({ number, title, summary, optionalQuote?, className? })`
  - `Testimonial({ quote, attribution, role?, org?, className? })`
  - `AuthorPerspective({ name, quote?, className? })` — renders labeled placeholder when `quote` is falsy.
  - `MetaphorVisual({ className? })` — decorative SVG glyph triptych, `aria-hidden="true"`.
  - `Footer()` — shared page footer.

- [ ] **Step 1: `src/components/ui/BookChapter.tsx`**

```tsx
import { cn } from "@/lib/cn";

type Props = {
  number: number;
  title: string;
  summary: string;
  optionalQuote?: string;
  className?: string;
};

export function BookChapter({ number, title, summary, optionalQuote, className }: Props) {
  const label = String(number).padStart(2, "0");
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 border-t border-[color:var(--color-border-subtle)] pt-8",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
        Chapter <span className="text-[color:var(--color-fg-muted)]">/ {label}</span>
      </p>
      <h3
        className="font-semibold tracking-[-0.005em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
      </h3>
      <p className="max-w-2xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
        {summary}
      </p>
      {optionalQuote ? (
        <blockquote className="mt-2 max-w-2xl border-l border-[color:var(--color-accent-cyan-soft)] pl-4 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
          &ldquo;{optionalQuote}&rdquo;
        </blockquote>
      ) : null}
    </article>
  );
}
```

- [ ] **Step 2: `src/components/ui/Testimonial.tsx`**

```tsx
import { cn } from "@/lib/cn";

type Props = {
  quote: string;
  attribution: string;
  role?: string;
  org?: string;
  className?: string;
};

export function Testimonial({ quote, attribution, role, org, className }: Props) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] p-8",
        className
      )}
    >
      <blockquote className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-[length:var(--text-small)] text-[color:var(--color-fg-secondary)]">
        <span className="font-semibold text-[color:var(--color-fg-primary)]">{attribution}</span>
        {role ? <span className="block text-[color:var(--color-fg-muted)]">{role}{org ? `, ${org}` : ""}</span> : null}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 3: `src/components/ui/AuthorPerspective.tsx`**

```tsx
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  quote?: string;
  className?: string;
};

export function AuthorPerspective({ name, quote, className }: Props) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] p-8",
        className
      )}
      aria-label={`Perspective from ${name}`}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
        Author&rsquo;s Perspective
      </p>
      {quote ? (
        <blockquote className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
          &ldquo;{quote}&rdquo;
        </blockquote>
      ) : (
        <p className="mt-6 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-muted)]">
          Personal reflection coming soon.
        </p>
      )}
      <p className="mt-6 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
        &mdash; {name}
      </p>
    </aside>
  );
}
```

- [ ] **Step 4: `src/components/site/book/MetaphorVisual.tsx`**

Decorative-only. Three abstract glyphs (fracture → mirror plane → light rays) rendered as inline SVG using currentColor + accent tokens. No image asset.

```tsx
import { cn } from "@/lib/cn";

type Props = { className?: string };

export function MetaphorVisual({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid grid-cols-3 items-center gap-6 text-[color:var(--color-accent-cyan)]",
        className
      )}
    >
      {/* Fracture */}
      <svg viewBox="0 0 120 80" className="h-16 w-full" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M6 74 L38 30 L48 46 L64 12 L82 44 L98 20 L114 74" />
        <path d="M6 74 L114 74" opacity="0.35" />
      </svg>
      {/* Reflection (mirror plane) */}
      <svg viewBox="0 0 120 80" className="h-16 w-full" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="30" y="14" width="60" height="52" rx="2" />
        <path d="M30 40 L90 40" strokeDasharray="2 3" opacity="0.55" />
      </svg>
      {/* Light */}
      <svg viewBox="0 0 120 80" className="h-16 w-full text-[color:var(--color-accent-yellow)]" fill="none" stroke="currentColor" strokeWidth="1.25">
        <circle cx="60" cy="40" r="10" />
        <g opacity="0.7">
          <path d="M60 12 L60 22" />
          <path d="M60 58 L60 68" />
          <path d="M32 40 L42 40" />
          <path d="M78 40 L88 40" />
          <path d="M40 20 L47 27" />
          <path d="M73 53 L80 60" />
          <path d="M80 20 L73 27" />
          <path d="M47 53 L40 60" />
        </g>
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: `src/components/site/Footer.tsx`**

Restrained editorial footer used by all three routes. No fabricated social links. Copyright uses the current year via a stable server render (`new Date().getFullYear()` in a Server Component is fine — no hydration mismatch since the component is server-only).

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AUTHORS } from "@/content/authors";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE_NAME, SITE_TAGLINE } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              {SITE_NAME}
            </p>
            <p className="mt-4 max-w-md text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              {SITE_TAGLINE}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_ITEMS.filter((i) => i.label !== "Home").map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-disabled={!item.live || undefined}
                    className={
                      "text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg-primary)] " +
                      (!item.live ? "cursor-not-allowed opacity-70" : "")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Authors
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {AUTHORS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href="/authors"
                    className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg-primary)]"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--color-border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="flex gap-6 text-[length:var(--text-small)]">
            <li>
              <span aria-disabled="true" className="cursor-not-allowed text-[color:var(--color-fg-muted)] opacity-70">
                Privacy
              </span>
            </li>
            <li>
              <span aria-disabled="true" className="cursor-not-allowed text-[color:var(--color-fg-muted)] opacity-70">
                Terms
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/BookChapter.tsx src/components/ui/Testimonial.tsx src/components/ui/AuthorPerspective.tsx src/components/site/book/MetaphorVisual.tsx src/components/site/Footer.tsx
git commit -m "feat(ui): BookChapter, Testimonial, AuthorPerspective, MetaphorVisual, Footer"
```

---

### Task 4: Book page — Section 1 Hero + Section 2 Central Question

**Files:**
- Create: `src/components/site/book/BookHero.tsx`
- Create: `src/components/site/book/CentralQuestion.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `Button`, `Reveal`, `PURCHASE_URL`, `next/image`.
- Produces: `BookHero()` renders the Book page's `<h1 id="book-hero-title">`; `CentralQuestion()` renders section with `id="why-we-wrote-it-hook"` anchor target for hero's secondary CTA is instead `id="why-we-wrote-it"` on Task 6's Section 3 — the hero's secondary CTA `href="#why-we-wrote-it"` points there.

- [ ] **Step 1: Create `BookHero.tsx`**

```tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PURCHASE_URL } from "@/config/site";

export function BookHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="book-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Book
            </p>
            <h1
              id="book-hero-title"
              className="mt-6 font-semibold leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">BE THE</span>
              <span className="block text-[color:var(--color-accent-yellow)]">MIRROR</span>
            </h1>
            <p className="mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-[1.55] text-[color:var(--color-fg-secondary)]">
              A Change Agent&rsquo;s Guide to Transformation for an AI World
            </p>
            <p className="mt-4 text-[length:var(--text-small)] tracking-wide text-[color:var(--color-fg-muted)]">
              Lois Wortley <span aria-hidden="true">&middot;</span> Ajay Ghanagam <span aria-hidden="true">&middot;</span> Hiren Doshi
            </p>
            <p className="mt-10 max-w-xl text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation changes when we change what we see.
            </p>
            <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Technology can change quickly. Organizations rarely do.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror explores the human side of transformation &mdash; how leadership, trust,
              resistance, behaviour, culture and the actions of change agents shape whether change
              becomes real.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              The book looks at transformation in a world increasingly shaped by AI, while keeping
              people at the center of the conversation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
              <Button href="#why-we-wrote-it" variant="secondary">Why we wrote it</Button>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <figure className="relative mx-auto w-full max-w-[560px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 55% at 55% 45%, rgba(245,201,77,0.20), transparent 70%), radial-gradient(50% 60% at 30% 60%, rgba(62,199,255,0.18), transparent 75%)",
                }}
              />
              <Image
                src="/book-3-books.png"
                alt="Be the Mirror hardcover shown as three stacked copies"
                width={1402}
                height={1122}
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 60vw, 90vw"
                className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Create `CentralQuestion.tsx`**

Generous whitespace. No cards. Single-column editorial column.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function CentralQuestion() {
  return (
    <Section
      aria-labelledby="central-question-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl py-10 md:py-16">
          <Reveal>
            <p
              id="central-question-title"
              className="font-semibold leading-[1.15] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Transformation asks organizations to change.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <p
              className="mt-8 leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-secondary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              But how often do the people leading transformation examine what they may need to
              change themselves?
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="mt-12 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-accent-yellow)]">
              That is the idea behind Be the Mirror.
            </p>
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
git add src/components/site/book/BookHero.tsx src/components/site/book/CentralQuestion.tsx
git commit -m "feat(book): hero + central question sections"
```

---

### Task 5: Book page — Section 3 Why We Wrote It + Section 4 Title Metaphor

**Files:**
- Create: `src/components/site/book/WhyWeWroteIt.tsx`
- Create: `src/components/site/book/TitleMetaphor.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`, `MetaphorVisual` (Task 3).
- Produces: `WhyWeWroteIt()` exposes `id="why-we-wrote-it"` on its Section (this is the hero's secondary-CTA target). `TitleMetaphor()` exposes `id="title-metaphor-title"` on its heading.

- [ ] **Step 1: `WhyWeWroteIt.tsx`**

Two lists (focus / adds), then the interpretive paragraphs.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const FOCUS = ["Technology", "Process", "Frameworks", "Programs", "Governance", "Tools", "AI"] as const;
const ADDS  = ["Leadership", "Trust", "Behaviour", "Communication", "Culture", "Resistance", "Ownership", "Learning"] as const;

export function WhyWeWroteIt() {
  return (
    <Section
      id="why-we-wrote-it"
      aria-labelledby="why-we-wrote-it-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 03" id="why-we-wrote-it-title" className="max-w-3xl">
            Why Be the Mirror?
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Transformation discussions often focus on
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {FOCUS.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-[color:var(--color-border-subtle)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]"
                >
                  {word}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
              But successful transformation also depends on
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {ADDS.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-[color:var(--color-accent-cyan-soft)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]"
                >
                  {word}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 max-w-3xl">
          <Reveal delayMs={80}>
            <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
              Organizations rarely struggle with transformation because they lack another framework.
            </p>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              The harder challenge is helping people understand change, trust it, participate in it
              and eventually make it their own.
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror brings the conversation back to the human realities of transformation.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `TitleMetaphor.tsx`**

Uses `MetaphorVisual` (Fracture → Reflection → Light triptych). Editorial two-column, whitespace generous, no cards.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MetaphorVisual } from "./MetaphorVisual";

const SURFACES = [
  "assumptions,",
  "behaviours,",
  "disconnects,",
  "resistance,",
  "unintended consequences,",
  "and the gap between what leaders intend and what people experience.",
] as const;

export function TitleMetaphor() {
  return (
    <Section
      aria-labelledby="title-metaphor-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Section 04" id="title-metaphor-title">
              Why &ldquo;Be the Mirror&rdquo;?
            </SectionHeading>
            <div className="mt-10">
              <MetaphorVisual />
              <p className="mt-4 text-[length:var(--text-small)] uppercase tracking-[0.28em] text-[color:var(--color-fg-muted)]">
                Fracture <span aria-hidden="true">&rarr;</span> Reflection <span aria-hidden="true">&rarr;</span> Light
              </p>
            </div>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]">
                A mirror does not make the decision for us.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-4 text-[length:var(--text-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-accent-yellow)]">
                It helps us see.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                Change agents often play the same role.
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                They surface what may be difficult to see:
              </p>
            </Reveal>
            <Reveal delayMs={340}>
              <ul className="mt-4 flex flex-col gap-2 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                {SURFACES.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
            <Reveal delayMs={420}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                But being the mirror also requires looking inward.
              </p>
            </Reveal>
            <Reveal delayMs={480}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                The most effective change agents are willing to examine their own assumptions and
                behaviour as well.
              </p>
            </Reveal>
          </div>
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
git add src/components/site/book/WhyWeWroteIt.tsx src/components/site/book/TitleMetaphor.tsx
git commit -m "feat(book): why-we-wrote-it + title-metaphor sections"
```

---

### Task 6: Book page — Section 5 Themes + Section 6 Who Should Read It

**Files:**
- Create: `src/components/site/book/BookThemes.tsx`
- Create: `src/components/site/book/WhoShouldRead.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`, `BOOK_THEMES`, `BOOK_AUDIENCES` from `@/content/book`.

**Ruling — themes vs. chapters:** The section heading label MUST read "What you&rsquo;ll explore" and the eyebrow MUST label these as **Themes** or **Ideas**. Do not use the word "Chapters" anywhere in this section. Cost if wrong: implies fabricated chapter titles, breaking AC-30/AC-32.

- [ ] **Step 1: `BookThemes.tsx`**

Two-column grid on desktop, single column on mobile. Ten themes from `BOOK_THEMES`.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_THEMES } from "@/content/book";

export function BookThemes() {
  return (
    <Section
      aria-labelledby="themes-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 05 &middot; Themes" id="themes-title" className="max-w-3xl">
            What you&rsquo;ll explore
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Broad ideas the book returns to &mdash; not a chapter list. Actual chapter titles will be
            published as the book&rsquo;s final structure is confirmed.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
          {BOOK_THEMES.map((t, i) => (
            <Reveal as="li" key={t.title} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                  Theme / {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {t.title}
                </h3>
                <p className="mt-3 max-w-lg text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {t.summary}
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

- [ ] **Step 2: `WhoShouldRead.tsx`**

Uses `BOOK_AUDIENCES`. Situations, not job titles.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_AUDIENCES } from "@/content/book";

export function WhoShouldRead() {
  return (
    <Section
      aria-labelledby="who-should-read-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 06" id="who-should-read-title" className="max-w-3xl">
            Who should read it
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Written for the situations transformation puts people in &mdash; not simply for job titles.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-12">
          {BOOK_AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.situation} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                {a.label ? (
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                    {a.label}
                  </p>
                ) : null}
                <p
                  className="mt-4 max-w-xl font-semibold leading-[1.25] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h3)" }}
                >
                  {a.situation}
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

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/book/BookThemes.tsx src/components/site/book/WhoShouldRead.tsx
git commit -m "feat(book): themes + who-should-read sections"
```

---

### Task 7: Book page — Section 7 AI World + Section 8 Book Journey (chapters placeholder)

**Files:**
- Create: `src/components/site/book/AIWorld.tsx`
- Create: `src/components/site/book/BookJourney.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`, `BookChapter` (Task 3), `CHAPTERS` from `@/content/book`.

- [ ] **Step 1: `AIWorld.tsx`**

Deliberately restrained on AI hype. Questions posed as a numbered list.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const QUESTIONS = [
  "What changes?",
  "Who benefits?",
  "What becomes uncertain?",
  "What skills are required?",
  "What happens to trust?",
  "How do people participate rather than simply comply?",
] as const;

export function AIWorld() {
  return (
    <Section
      aria-labelledby="ai-world-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Section 07" id="ai-world-title" className="max-w-md">
              Transformation in an AI world
            </SectionHeading>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
                AI can accelerate technology change dramatically.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-4 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-accent-yellow)]">
                It does not automatically accelerate human adoption.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                As organizations introduce AI into everyday work, leaders face questions that are
                deeply human:
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <ol className="mt-6 flex flex-col gap-3">
                {QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-4 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                    <span aria-hidden="true" className="w-8 shrink-0 text-[length:var(--text-small)] font-semibold tracking-[0.2em] uppercase text-[color:var(--color-accent-cyan)]">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delayMs={380}>
              <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                This is where transformation leadership matters.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `BookJourney.tsx`**

Renders the `CHAPTERS` array via `BookChapter`. Empty array → clearly-marked placeholder block. Do not label the placeholder as "Chapter 01 — Coming soon" — use "Book Journey" heading + a single explanatory line.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BookChapter } from "@/components/ui/BookChapter";
import { CHAPTERS } from "@/content/book";

export function BookJourney() {
  return (
    <Section
      aria-labelledby="book-journey-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 08" id="book-journey-title" className="max-w-3xl">
            Book journey
          </SectionHeading>
        </Reveal>

        {CHAPTERS.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Chapter-by-chapter overview coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 flex flex-col gap-10">
            {CHAPTERS.map((c) => (
              <Reveal key={c.number}>
                <BookChapter
                  number={c.number}
                  title={c.title}
                  summary={c.summary}
                  optionalQuote={c.optionalQuote}
                />
              </Reveal>
            ))}
          </div>
        )}
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
git add src/components/site/book/AIWorld.tsx src/components/site/book/BookJourney.tsx
git commit -m "feat(book): ai-world + book-journey (empty-state chapters)"
```

---

### Task 8: Book page — Section 9 From the Book (excerpt placeholder) + Section 10 Endorsements

**Files:**
- Create: `src/components/site/book/FromTheBook.tsx`
- Create: `src/components/site/book/BookEndorsements.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Reveal`, `Testimonial` (Task 3), `EXCERPTS`, `TESTIMONIALS` from `@/content/book`, `next/image`.

- [ ] **Step 1: `FromTheBook.tsx`**

Uses `/book-lying-flat.png`. Empty `EXCERPTS` → placeholder line. Do NOT fabricate a quote.

```tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { EXCERPTS } from "@/content/book";

export function FromTheBook() {
  return (
    <Section
      bleed="full"
      aria-labelledby="from-the-book-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[520px]">
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

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading eyebrow="Section 09" id="from-the-book-title">
                From the book
              </SectionHeading>
            </Reveal>

            {EXCERPTS.length === 0 ? (
              <Reveal delayMs={100}>
                <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
                  Selected excerpts coming soon.
                </p>
              </Reveal>
            ) : (
              <ul className="mt-10 flex flex-col gap-10">
                {EXCERPTS.map((e, i) => (
                  <Reveal as="li" key={i} delayMs={80 * i}>
                    <blockquote className="max-w-xl border-l border-[color:var(--color-accent-cyan-soft)] pl-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                      &ldquo;{e.text}&rdquo;
                    </blockquote>
                    {e.source ? (
                      <p className="mt-3 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
                        &mdash; {e.source}
                      </p>
                    ) : null}
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `BookEndorsements.tsx`**

Empty `TESTIMONIALS` → placeholder line. Otherwise renders `Testimonial` grid.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Testimonial } from "@/components/ui/Testimonial";
import { TESTIMONIALS } from "@/content/book";

export function BookEndorsements() {
  return (
    <Section
      aria-labelledby="endorsements-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 10" id="endorsements-title" className="max-w-3xl">
            What readers are saying
          </SectionHeading>
        </Reveal>

        {TESTIMONIALS.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Reader perspectives and endorsements coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delayMs={100 * (i % 3)}>
                <Testimonial quote={t.quote} attribution={t.attribution} role={t.role} org={t.org} />
              </Reveal>
            ))}
          </div>
        )}
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
git add src/components/site/book/FromTheBook.tsx src/components/site/book/BookEndorsements.tsx
git commit -m "feat(book): excerpt + endorsements sections (empty-state safe)"
```

---

### Task 9: Book page — Final CTA + compose `/book` route + metadata + attach Header/Footer

**Files:**
- Create: `src/components/site/book/BookFinalCTA.tsx`
- Create: `src/app/book/page.tsx`

**Interfaces:**
- Consumes: All Task 4–8 sections; `PURCHASE_URL`; `Header`, `Footer`.
- Produces: The `/book` route.

- [ ] **Step 1: `BookFinalCTA.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PURCHASE_URL } from "@/config/site";

export function BookFinalCTA() {
  return (
    <Section
      bleed="full"
      aria-labelledby="book-final-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Book
            </p>
            <h2
              id="book-final-cta-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Ready to look at transformation{" "}
              <span className="text-[color:var(--color-accent-yellow)]">differently?</span>
            </h2>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror invites leaders and change agents to look beyond tools and frameworks
              and examine how change is actually experienced.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
              <Button href="/authors" variant="secondary">Meet the Authors</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `src/app/book/page.tsx`** — compose + metadata

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookHero } from "@/components/site/book/BookHero";
import { CentralQuestion } from "@/components/site/book/CentralQuestion";
import { WhyWeWroteIt } from "@/components/site/book/WhyWeWroteIt";
import { TitleMetaphor } from "@/components/site/book/TitleMetaphor";
import { BookThemes } from "@/components/site/book/BookThemes";
import { WhoShouldRead } from "@/components/site/book/WhoShouldRead";
import { AIWorld } from "@/components/site/book/AIWorld";
import { BookJourney } from "@/components/site/book/BookJourney";
import { FromTheBook } from "@/components/site/book/FromTheBook";
import { BookEndorsements } from "@/components/site/book/BookEndorsements";
import { BookFinalCTA } from "@/components/site/book/BookFinalCTA";

export const metadata: Metadata = {
  title: "Be the Mirror | The Book",
  description:
    "Discover Be the Mirror, A Change Agent\u2019s Guide to Transformation for an AI World by Lois Wortley, Ajay Ghanagam and Hiren Doshi — exploring leadership, people, resistance, trust and organizational change.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main id="main">
        <BookHero />
        <CentralQuestion />
        <WhyWeWroteIt />
        <TitleMetaphor />
        <BookThemes />
        <WhoShouldRead />
        <AIWorld />
        <BookJourney />
        <FromTheBook />
        <BookEndorsements />
        <BookFinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; build succeeds; `/book` appears in the route list.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/book/BookFinalCTA.tsx src/app/book/page.tsx
git commit -m "feat(book): final CTA + compose /book route with metadata"
```

---

### Task 10: Authors page — Hero + Shared Story

**Files:**
- Create: `src/components/site/authors/AuthorsHero.tsx`
- Create: `src/components/site/authors/SharedStory.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `Button`, `Reveal`, `AUTHORS` from `@/content/authors`.
- Produces: `<h1 id="authors-hero-title">` on the Authors page; the Shared Story section has `id="shared-story-title"` on its heading.

- [ ] **Step 1: `AuthorsHero.tsx`**

Editorial hero, single-column centered. Names displayed as an anchor row that scrolls to per-author sections.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AUTHORS } from "@/content/authors";

export function AuthorsHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="authors-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Authors
            </p>
            <h1
              id="authors-hero-title"
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">Three perspectives.</span>
              <span className="block text-[color:var(--color-accent-yellow)]">One shared belief.</span>
            </h1>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation is never only about process or technology.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-secondary)]">
              Ultimately, it is about people.
            </p>
          </Reveal>

          <Reveal delayMs={280}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]">
              {AUTHORS.map((a) => (
                <li key={a.slug}>
                  <a
                    href={`#${a.slug}`}
                    className="border-b border-[color:var(--color-border-subtle)] pb-1 hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-fg-primary)]"
                  >
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `SharedStory.tsx`**

Safe framing copy. Do not fabricate personal anecdotes.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function SharedStory() {
  return (
    <Section
      aria-labelledby="shared-story-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Together" id="shared-story-title" className="max-w-md">
              Why we wrote this together
            </SectionHeading>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                Be the Mirror brings together three perspectives shaped by working with people and
                organizations navigating change.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                While experiences may differ, the underlying lesson is consistent: lasting
                transformation requires more than new technology, processes or organizational
                structures.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                It requires understanding people.
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                The book brings those perspectives together around one idea:
              </p>
            </Reveal>
            <Reveal delayMs={340}>
              <p
                className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-accent-yellow)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Sometimes the most valuable thing a change agent can do is help an organization see
                itself more clearly.
              </p>
            </Reveal>
          </div>
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
git add src/components/site/authors/AuthorsHero.tsx src/components/site/authors/SharedStory.tsx
git commit -m "feat(authors): hero + shared-story sections"
```

---

### Task 11: Authors page — Individual profile section (reusable)

**Files:**
- Create: `src/components/site/authors/AuthorProfile.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `Reveal`, `AuthorPerspective` (Task 3), `Author` type from `@/content/authors`, `next/image`.
- Produces: `AuthorProfile({ author, index })` — one section per author. Uses `index` (0-based) to alternate photo/bio orientation on desktop. Renders `<article id={author.slug}>` so the hero's name-anchor list scrolls to the profile.

**Layout rule:**
- Desktop `lg`: even index → photo LEFT, bio RIGHT (`grid-cols-[minmax(0,440px)_minmax(0,1fr)]`); odd index → photo RIGHT, bio LEFT (same widths, flipped via `order` on the two children).
- Mobile: photo stacked above bio (`order-1` / `order-2`).

**Placeholder discipline:**
- `author.image` missing → render a large neutral placeholder (large initials, subtle radial background) with a clearly-labeled caption `"Author photograph — to be supplied."`. Do NOT AI-generate a face.
- `author.shortBio` / `author.fullBio` / `author.expertise` / `author.linkedinUrl` / `author.speakingTopics` missing → render labeled "to be provided" placeholders per field. Never render fabricated content.

- [ ] **Step 1: `AuthorProfile.tsx`**

```tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AuthorPerspective } from "@/components/ui/AuthorPerspective";
import type { Author } from "@/content/authors";
import { cn } from "@/lib/cn";

type Props = { author: Author; index: number };

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function AuthorProfile({ author, index }: Props) {
  const photoOnRight = index % 2 === 1;
  const titleId = `${author.slug}-title`;
  return (
    <Section
      aria-labelledby={titleId}
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <article id={author.slug} className="scroll-mt-24">
          <div className={cn(
            "grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20",
          )}>
            <Reveal className={cn("order-1", photoOnRight ? "lg:order-2" : "lg:order-1")}>
              <div className="relative mx-auto w-full max-w-[440px]">
                {author.image ? (
                  <Image
                    src={author.image.src}
                    alt={author.image.alt}
                    width={author.image.width}
                    height={author.image.height}
                    sizes="(min-width: 1024px) 440px, 90vw"
                    className="h-auto w-full rounded-2xl"
                  />
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-[color:var(--color-accent-cyan-soft)]"
                      style={{
                        background:
                          "radial-gradient(120% 80% at 30% 20%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 70%)",
                      }}
                    >
                      <span
                        className="font-semibold tracking-[0.06em] text-[color:var(--color-fg-secondary)]"
                        style={{ fontSize: "var(--text-display)" }}
                      >
                        {initialsOf(author.name)}
                      </span>
                    </div>
                    <p className="mt-3 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
                      Author photograph &mdash; to be supplied.
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal
              className={cn("order-2", photoOnRight ? "lg:order-1" : "lg:order-2")}
              delayMs={120}
            >
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
                Author &middot; {String(index + 1).padStart(2, "0")}
              </p>
              <h2
                id={titleId}
                className="mt-4 font-semibold leading-[1.05] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
                style={{ fontSize: "var(--text-h1)" }}
              >
                {author.name}
              </h2>
              <p className="mt-2 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
                {author.role ?? "Author"}
              </p>

              {author.shortBio ? (
                <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                  {author.shortBio}
                </p>
              ) : (
                <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
                  Short introduction to be provided.
                </p>
              )}

              {author.fullBio ? (
                <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {author.fullBio}
                </p>
              ) : (
                <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-muted)]">
                  Biography content to be provided.
                </p>
              )}

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                <div>
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    Areas of experience
                  </p>
                  {author.expertise && author.expertise.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {author.expertise.map((e) => (
                        <li
                          key={e}
                          className="rounded-full border border-[color:var(--color-border-subtle)] px-3 py-1 text-[length:var(--text-small)] text-[color:var(--color-fg-primary)]"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[length:var(--text-body)] text-[color:var(--color-fg-muted)]">
                      Areas of expertise to be provided.
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    Connect
                  </p>
                  {author.linkedinUrl ? (
                    <a
                      href={author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex border-b border-[color:var(--color-accent-cyan-soft)] pb-1 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-accent-cyan)]"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <p className="mt-4 text-[length:var(--text-body)] text-[color:var(--color-fg-muted)]">
                      LinkedIn URL to be provided.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <AuthorPerspective name={author.name} quote={author.perspective} />
              </div>
            </Reveal>
          </div>
        </article>
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
git add src/components/site/authors/AuthorProfile.tsx
git commit -m "feat(authors): AuthorProfile with alternating editorial layout"
```

---

### Task 12: Authors page — Collective CTA + compose `/authors` route + metadata

**Files:**
- Create: `src/components/site/authors/AuthorsCollectiveCTA.tsx`
- Create: `src/app/authors/page.tsx`

**Interfaces:**
- Consumes: `AuthorsHero`, `SharedStory`, `AuthorProfile`, `AuthorsCollectiveCTA`; `Header`, `Footer`; `AUTHORS`.

- [ ] **Step 1: `AuthorsCollectiveCTA.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function AuthorsCollectiveCTA() {
  return (
    <Section
      bleed="full"
      aria-labelledby="authors-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Together
            </p>
            <h2
              id="authors-cta-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              The conversation continues.
            </h2>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Explore the ideas behind Be the Mirror and the questions shaping transformation in an
              AI-driven world.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="primary">Explore the Book</Button>
              <Button href="/#ideas" variant="secondary">Explore the Ideas</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

**Ruling — "Explore the Ideas" target:** The Ideas destination has no dedicated route in Phase 3. `/#ideas` is a valid cross-page anchor that lands at the homepage's Mirror Moments section (Phase 2 assigned `id="ideas"` there). Cost if wrong: users on the Authors page click "Explore the Ideas" and jump to homepage Mirror Moments — acceptable interim.

- [ ] **Step 2: `src/app/authors/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AuthorsHero } from "@/components/site/authors/AuthorsHero";
import { SharedStory } from "@/components/site/authors/SharedStory";
import { AuthorProfile } from "@/components/site/authors/AuthorProfile";
import { AuthorsCollectiveCTA } from "@/components/site/authors/AuthorsCollectiveCTA";
import { AUTHORS } from "@/content/authors";

export const metadata: Metadata = {
  title: "Authors | Be the Mirror",
  description:
    "Meet Lois Wortley, Ajay Ghanagam and Hiren Doshi, authors of Be the Mirror: A Change Agent\u2019s Guide to Transformation for an AI World.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <AuthorsHero />
        <SharedStory />
        {AUTHORS.map((author, i) => (
          <AuthorProfile key={author.slug} author={author} index={i} />
        ))}
        <AuthorsCollectiveCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; build succeeds; `/authors` appears in the route list.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/authors/AuthorsCollectiveCTA.tsx src/app/authors/page.tsx
git commit -m "feat(authors): collective CTA + compose /authors route with metadata"
```

---

### Task 13: Attach Footer to homepage + full validation pass

**Files:**
- Modify: `src/app/page.tsx` (attach `<Footer />` after `<main>`).

**Interfaces:**
- Consumes: `Footer` (Task 3).
- Produces: Consistent footer across `/`, `/book`, `/authors`.

- [ ] **Step 1: Update homepage**

```tsx
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
// … existing section imports unchanged …

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* … existing sections unchanged … */}
      </main>
      <Footer />
    </>
  );
}
```

Do not modify the section imports or ordering. Only add the `Footer` import and place `<Footer />` between the closing `</main>` and `</>`.

- [ ] **Step 2: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors. Route list shows `/`, `/book`, `/authors`.

- [ ] **Step 3: Dev-server smoke test**

Start the dev server in the background, then curl each route and grep for content that MUST be present.

```bash
npm run dev &
DEV_PID=$!
# wait briefly for the dev server (skill's Bash timeout norm)
sleep 5
curl -sI http://localhost:3000/       | head -1   # expect: HTTP/1.1 200
curl -sI http://localhost:3000/book   | head -1   # expect: HTTP/1.1 200
curl -sI http://localhost:3000/authors| head -1   # expect: HTTP/1.1 200

# Homepage still contains Phase 2 landmarks
curl -s http://localhost:3000/        | grep -E "Mirror Moments|Willing to see|BE THE" > /dev/null

# Book page verifies each of the 10 sections + final CTA + footer
curl -s http://localhost:3000/book    | grep -E "Why Be the Mirror|Why .Be the Mirror.|What you.*ll explore|Transformation in an AI world|Book journey|From the book|What readers are saying|Ready to look at transformation" > /dev/null

# Authors page verifies hero + shared story + all three names + collective CTA
curl -s http://localhost:3000/authors | grep -E "Three perspectives|Why we wrote this together|Lois Wortley|Ajay Ghanagam|Hiren Doshi|The conversation continues" > /dev/null

kill $DEV_PID 2>/dev/null || true
```

Expected: every `curl -sI` returns `HTTP/1.1 200`. Every grep exits 0 (all substrings found).

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(site): attach shared footer to homepage"
```

---

## Self-review checklist (author, before dispatching)

- **Spec coverage** — Every Phase 3 section (Book Sections 1–10 + Final CTA; Authors Hero + Shared Story + 3 individual sections + Collective CTA; Footer; nav update; homepage CTA retargeting; metadata; internal linking) is covered by exactly one task. AC-26..AC-44 map cleanly: AC-26/27/28 → Task 4; AC-29 → Task 5; AC-30 → Task 6; AC-31 → Task 7; AC-32 → Task 7; AC-33 → Task 8; AC-34 → Task 8; AC-35/38 → Tasks 10/11/12; AC-36 → Task 1 + Task 11 (data model + placeholder rendering); AC-37 → Task 1 + Task 11 (typed data model + presentational component); AC-39 → Task 2 (BookPreview → /book); AC-40 → Task 2 (AuthorsPreview → /authors) + Task 9 (Book final CTA → /authors); AC-41 → responsive utilities in each section task; AC-42 → Task 2 (nav lit up) + Task 9/12 (Header on both routes); AC-43 → Task 9 + Task 12 metadata; AC-44 → Task 13 validation pass.

- **Placeholder scan** — Grep for "TBD", "TODO", "lorem": one intentional `TODO(phase-4)` in `src/config/site.ts` (the purchase URL); no lorem; no un-scoped TBD.

- **Type consistency** — `Author` type field names (`slug`, `name`, `role`, `shortBio`, `fullBio`, `expertise`, `linkedinUrl`, `perspective`, `speakingTopics`, `image`) match every consumer. `BookChapterData` fields (`number`, `title`, `summary`, `optionalQuote`) match `BookChapter` component props exactly. `TestimonialData` fields (`quote`, `attribution`, `role`, `org`) match `Testimonial` props exactly. `BOOK_THEMES` fields (`title`, `summary`) and `BOOK_AUDIENCES` fields (`situation`, `label`) match consumers.

- **Anchor targets** — Hero secondary CTA `#why-we-wrote-it` matches Task 5's `<Section id="why-we-wrote-it">`. Authors hero's name-anchor list `#{slug}` matches Task 11's `<article id={author.slug}>`. `/authors` from Task 9's `BookFinalCTA` and `/book` from Task 12's `AuthorsCollectiveCTA` resolve to real routes.

- **Global constraint pass** — No new dependencies (Task 3's `MetaphorVisual` is inline SVG only). No client components introduced. All copy is verbatim from spec. Empty-state placeholders in Tasks 7/8/11 are labeled, restrained, and never lorem.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-17-be-the-mirror-phase-3.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?

