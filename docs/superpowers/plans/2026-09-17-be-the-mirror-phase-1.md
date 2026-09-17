# Be the Mirror — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the foundation (framework, design tokens, layout primitives, header/nav, mobile menu) and a production-quality homepage hero for the *Be the Mirror* book site — nothing else.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS v4. Design tokens live in `globals.css` inside a Tailwind `@theme` block so every color/spacing/typography value is a single source of truth. Components are split by role: `layout/` (Container, Section), `ui/` (Button), `site/` (Header, Navigation, MobileNavigation, Hero, HeroBackground, BookVisual). The book photo is served via `next/image` from `public/`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/font` (Inter), `next/image`, ESLint (Next config).

**Spec:** The user's Phase 1 message in the current conversation (verbatim requirements + AC-1..AC-12). No standalone spec file exists — the message is the spec.

## Global Constraints

- **Framework preservation:** repo starts empty; Next.js is the chosen foundation. Do not swap it mid-plan.
- **No UI-kit dependency** (no shadcn, MUI, Chakra, Radix, HeadlessUI, etc.). Hand-rolled components only.
- **No animation libraries** (no Framer Motion, GSAP). CSS transitions/keyframes only.
- **No new deps beyond what `create-next-app` installs.**
- **Do not modify the book PNGs.** Rename filenames for URL safety, but never re-encode or edit pixels.
- **Book title spelling in hero:** two lines — `BE THE` (white) / `MIRROR` (yellow). Not "Be The Mirror". Not "BE THE MIRROR" on one line.
- **Authors, in this order, with middle-dot separator on desktop:** `Lois Wortley · Ajay Ghanagam · Hiren Doshi`.
- **Positioning statement, verbatim:** `Transformation changes when we change what we see.`
- **Supporting copy, verbatim:** `Organizations invest heavily in technology, processes and AI. Yet transformation often succeeds or fails because of something much more human — leadership, trust, behaviour, resistance and our willingness to see what is really happening.`
- **Meta title, verbatim:** `Be the Mirror | A Change Agent's Guide to Transformation for an AI World`
- **Meta description, verbatim:** `Be the Mirror explores how leaders, change agents and organizations can navigate transformation in an AI-driven world by looking beyond technology to leadership, behaviour, trust and change.`
- **Nav items, in order:** Home, The Book, Ideas, Authors, Resources, Speaking, Contact. Only `Home` (`/`) is real; the rest are placeholder `href="#"` with `aria-disabled` treatment. Do **not** build those pages.
- **Aesthetic bans (from spec):** no robots, no glowing AI brains, no circuit imagery, no crypto/gaming/SaaS/neon feel, no heavy glassmorphism, no excessive gradients/animation, no shrunk-desktop mobile nav.
- **File & repo hygiene:** the three PNGs at repo root move to `public/` with URL-safe filenames; originals at repo root are deleted (single canonical location).
- **Node version:** whatever the local machine has, but Next.js 15 requires Node ≥ 18.18. Do not add an `.nvmrc` unless the scaffold produces one.
- **No tests** in Phase 1. Verification is `next build`, `next lint`, `tsc --noEmit`, and manual QA against AC-1..AC-12. Do not add Jest/Vitest/Playwright.

---

### Task 1: Scaffold Next.js app and relocate book assets

**Files:**
- Create: entire Next.js project via `create-next-app` at repo root
- Move: `3 Books.png` → `public/book-3-books.png`
- Move: `45° angled hardcover.png` → `public/book-hero-45.png`
- Move: `Lying-flat hardcover.png` → `public/book-lying-flat.png`
- Delete: the three root-level PNGs after copying
- Verify: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` all exist

**Interfaces:**
- Consumes: nothing
- Produces: working `npm run dev` / `npm run build` / `npm run lint` scripts; `/public/book-hero-45.png` as the canonical hero image path used by later tasks

- [ ] **Step 1: Run create-next-app in place**

The repo root has non-hidden files (three PNGs) which `create-next-app` refuses to overwrite. Move them into a temp dir first, scaffold, then relocate to `public/`.

```bash
cd /Users/ajaychandraghanagam/projects/be-the-mirror
mkdir -p .scaffold-tmp
mv "3 Books.png" "45° angled hardcover.png" "Lying-flat hardcover.png" .scaffold-tmp/
npx --yes create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --no-turbopack --use-npm --yes
```

Expected: scaffold completes; `package.json` lists `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `eslint-config-next`.

- [ ] **Step 2: Relocate book assets into public/**

```bash
mkdir -p public
mv .scaffold-tmp/"3 Books.png"              public/book-3-books.png
mv .scaffold-tmp/"45° angled hardcover.png" public/book-hero-45.png
mv .scaffold-tmp/"Lying-flat hardcover.png" public/book-lying-flat.png
rmdir .scaffold-tmp
```

Expected: `public/` contains three PNGs with URL-safe names. Verify with `ls public/`.

- [ ] **Step 3: Sanity-check dev server**

```bash
npm run dev &   # then curl http://localhost:3000 and expect 200
```

Kill the dev server after confirming a 200 response and shut it down cleanly.

- [ ] **Step 4: Commit**

```bash
git init 2>/dev/null || true
git add -A
git commit -m "chore(phase-1): scaffold Next.js app and relocate book assets"
```

If `git init` is skipped because the user hasn't asked for VCS, drop the commit step — but keep the working tree clean.

---

### Task 2: Define design tokens, typography, and fonts

**Files:**
- Modify: `src/app/globals.css` — replace default Tailwind boilerplate with token-defining `@theme` block + base styles
- Create: `src/lib/fonts.ts` — `next/font/google` Inter setup

**Interfaces:**
- Consumes: Tailwind v4 (from Task 1)
- Produces:
  - CSS custom properties + Tailwind utilities: `bg-bg-primary`, `bg-bg-secondary`, `text-fg-primary`, `text-fg-secondary`, `text-accent-cyan`, `text-accent-yellow`, `border-subtle`
  - `export const inter: NextFontWithVariable` — used by root layout to apply `--font-sans`
  - Body defaults to `bg-bg-primary text-fg-primary font-sans antialiased`

- [ ] **Step 1: Set up Inter font**

Create `src/lib/fonts.ts`:

```ts
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
```

- [ ] **Step 2: Rewrite globals.css with tokens**

Replace the file's entire contents with:

```css
@import "tailwindcss";

@theme {
  /* Colors — derived from the book cover artwork */
  --color-bg-primary: #05080b;
  --color-bg-secondary: #0b1116;
  --color-fg-primary: #f4f6f8;
  --color-fg-secondary: #a6b2bc;
  --color-fg-muted: #7a8691;
  --color-accent-cyan: #3ec7ff;
  --color-accent-cyan-soft: rgba(62, 199, 255, 0.18);
  --color-accent-yellow: #f5c94d;
  --color-accent-yellow-soft: rgba(245, 201, 77, 0.16);
  --color-border-subtle: rgba(255, 255, 255, 0.08);

  /* Type scale */
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --text-display: clamp(3.25rem, 6vw + 1rem, 6.5rem);
  --text-display--line-height: 0.95;
  --text-display--letter-spacing: -0.02em;
  --text-h1: clamp(2.25rem, 3.5vw + 1rem, 3.5rem);
  --text-h1--line-height: 1.05;
  --text-h2: clamp(1.75rem, 2vw + 1rem, 2.25rem);
  --text-h2--line-height: 1.15;
  --text-h3: 1.25rem;
  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.65;
  --text-body: 1rem;
  --text-body--line-height: 1.6;
  --text-small: 0.875rem;
  --text-nav: 0.9375rem;
  --text-button: 0.9375rem;

  /* Layout */
  --container-site: 1200px;
  --spacing-gutter: 1.5rem;      /* mobile horizontal padding */
  --spacing-gutter-md: 2rem;
  --spacing-gutter-lg: 3rem;
  --spacing-section: clamp(4rem, 8vw, 7rem);

  /* Breakpoints (Tailwind defaults are fine; document them here for reference)
     sm 40rem / md 48rem / lg 64rem / xl 80rem */
}

@layer base {
  html { color-scheme: dark; }
  body {
    background-color: var(--color-bg-primary);
    color: var(--color-fg-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  :focus-visible {
    outline: 2px solid var(--color-accent-cyan);
    outline-offset: 3px;
    border-radius: 2px;
  }
  ::selection {
    background: var(--color-accent-yellow-soft);
    color: var(--color-fg-primary);
  }
}
```

- [ ] **Step 3: Verify tokens compile**

```bash
npm run build
```

Expected: build succeeds, no PostCSS errors. If Tailwind v4's `@theme` syntax errors on this version, downgrade to v3 by editing tailwind config accordingly — but v4 is the version create-next-app installs today.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(phase-1): design tokens, Inter font, base styles"
```

---

### Task 3: Build Container / Section / Button primitives

**Files:**
- Create: `src/components/layout/Container.tsx`
- Create: `src/components/layout/Section.tsx`
- Create: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: Tailwind utilities defined in Task 2
- Produces:
  - `<Container as="div" className?>` — max-width 1200px, responsive gutter
  - `<Section as="section" bleed?: "none"|"full" className?>` — vertical section spacing (`--spacing-section`) + optional edge bleed for hero background
  - `<Button variant="primary"|"secondary" as="a"|"button" href? className? children>` — used by hero + header

- [ ] **Step 1: Container**

```tsx
// src/components/layout/Container.tsx
import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-site)]",
        "px-[var(--spacing-gutter)] md:px-[var(--spacing-gutter-md)] lg:px-[var(--spacing-gutter-lg)]",
        className
      )}
      {...props}
    />
  );
}
```

Also create `src/lib/cn.ts`:

```ts
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
```

(No `clsx`/`tailwind-merge` dependency — this is enough for Phase 1.)

- [ ] **Step 2: Section**

```tsx
// src/components/layout/Section.tsx
import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { bleed?: "none" | "full" };

export function Section({ className, bleed = "none", ...props }: Props) {
  return (
    <section
      className={cn(
        "relative",
        bleed === "none" && "py-[var(--spacing-section)]",
        bleed === "full" && "py-[var(--spacing-section)] overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 3: Button**

```tsx
// src/components/ui/Button.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Common = { variant?: Variant; className?: string; children: ReactNode };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[length:var(--text-button)] font-semibold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-yellow)] text-[color:var(--color-bg-primary)] hover:bg-[color-mix(in_srgb,var(--color-accent-yellow) 88%,white)]",
  secondary:
    "border border-[color:var(--color-border-subtle)] bg-transparent text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-accent-cyan)]",
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);
  if ("href" in props && props.href) {
    const { href, ...rest } = props as AsLink;
    return <Link href={href} className={classes} {...rest}>{children}</Link>;
  }
  const { variant: _v, className: _c, children: _ch, ...rest } = props as AsButton;
  return <button className={classes} {...rest}>{children}</button>;
}
```

- [ ] **Step 4: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(phase-1): Container, Section, Button primitives"
```

---

### Task 4: Build Header, Navigation, MobileNavigation

**Files:**
- Create: `src/lib/nav.ts`
- Create: `src/components/site/Header.tsx`
- Create: `src/components/site/Navigation.tsx`
- Create: `src/components/site/MobileNavigation.tsx`

**Interfaces:**
- Consumes: `Container`, `Button` (Task 3)
- Produces:
  - `NAV_ITEMS: ReadonlyArray<{ label: string; href: string; live: boolean }>` — the seven-item nav
  - `<Header />` — a `<header>` sticky-transparent bar, dark treatment, subtle bottom border on scroll (CSS-only via `backdrop-filter` — no JS scroll listener in Phase 1)
  - `<Navigation />` — desktop-only nav list (`hidden lg:flex`)
  - `<MobileNavigation />` — hamburger button + fullscreen drawer, `lg:hidden`

- [ ] **Step 1: Nav data**

```ts
// src/lib/nav.ts
export type NavItem = { label: string; href: string; live: boolean };

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home",      href: "/",         live: true  },
  { label: "The Book",  href: "#the-book", live: false },
  { label: "Ideas",     href: "#ideas",    live: false },
  { label: "Authors",   href: "#authors",  live: false },
  { label: "Resources", href: "#resources",live: false },
  { label: "Speaking",  href: "#speaking", live: false },
  { label: "Contact",   href: "#contact",  live: false },
];
```

- [ ] **Step 2: Navigation (desktop)**

```tsx
// src/components/site/Navigation.tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Navigation() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-disabled={!item.live || undefined}
              className={cn(
                "text-[length:var(--text-nav)] tracking-wide text-[color:var(--color-fg-secondary)]",
                "transition-colors duration-200 hover:text-[color:var(--color-fg-primary)]",
                !item.live && "cursor-not-allowed opacity-70"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 3: MobileNavigation (hamburger + drawer)**

```tsx
// src/components/site/MobileNavigation.tsx
"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-fg-primary)]"
      >
        <span className="sr-only">Menu</span>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          {open ? (
            <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M3 11h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col",
          "bg-[color:var(--color-bg-primary)]/98 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--color-border-subtle)]">
          <span className="text-[length:var(--text-nav)] tracking-widest uppercase text-[color:var(--color-fg-secondary)]">
            Be the Mirror
          </span>
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-fg-primary)]"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-disabled={!item.live || undefined}
                  className={cn(
                    "block text-3xl font-medium tracking-tight",
                    "text-[color:var(--color-fg-primary)] hover:text-[color:var(--color-accent-cyan)]",
                    !item.live && "opacity-70"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 pb-10">
          <Button href="#buy" variant="primary" className="w-full" onClick={() => setOpen(false)}>
            Buy the Book
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Header composition**

```tsx
// src/components/site/Header.tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-[color:var(--color-bg-primary)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/55">
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="text-[length:var(--text-nav)] font-semibold tracking-[0.22em] uppercase text-[color:var(--color-fg-primary)]"
        >
          Be the Mirror
        </Link>

        <div className="flex items-center gap-8">
          <Navigation />
          <div className="hidden lg:block">
            <Button href="#buy" variant="primary">
              Buy the Book
            </Button>
          </div>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 5: Verify typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(phase-1): header, desktop nav, accessible mobile drawer"
```

---

### Task 5: Build HeroBackground and BookVisual

**Files:**
- Create: `src/components/site/HeroBackground.tsx`
- Create: `src/components/site/BookVisual.tsx`

**Interfaces:**
- Consumes: `public/book-hero-45.png` (from Task 1)
- Produces:
  - `<HeroBackground />` — position-absolute layered SVG hex pattern + radial-gradient glows, `pointer-events-none`, `-z-10`
  - `<BookVisual priority?: boolean />` — `next/image` at intrinsic aspect, wrapped in a `<figure>` with ambient CSS lighting behind it (no card, no rounded frame)

- [ ] **Step 1: HeroBackground**

Restrained hex pattern via inline SVG data URI + two radial gradients. No neon, no full-bleed color.

```tsx
// src/components/site/HeroBackground.tsx
export function HeroBackground() {
  // Small hex tile — SVG stroked at 8% opacity for the "extremely restrained" pattern.
  const hex = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="64" viewBox="0 0 56 64">
       <g fill="none" stroke="rgba(62,199,255,0.08)" stroke-width="1">
         <path d="M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z"/>
       </g>
     </svg>`
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[color:var(--color-bg-primary)]" />
      {/* hex pattern */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${hex}")`,
          backgroundSize: "56px 64px",
          maskImage:
            "radial-gradient(ellipse at 65% 40%, black 0%, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 65% 40%, black 0%, black 35%, transparent 75%)",
        }}
      />
      {/* cyan glow, upper-left */}
      <div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-cyan-soft), transparent 70%)" }}
      />
      {/* soft yellow illumination, behind book */}
      <div
        className="absolute right-[6%] top-[18%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-yellow-soft), transparent 70%)" }}
      />
      {/* vignette to keep type readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
```

- [ ] **Step 2: BookVisual**

```tsx
// src/components/site/BookVisual.tsx
import Image from "next/image";

export function BookVisual({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      {/* subtle ambient light behind the book — CSS only, does not touch the image */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 55% at 55% 45%, rgba(245,201,77,0.22), transparent 70%), radial-gradient(50% 60% at 30% 60%, rgba(62,199,255,0.18), transparent 75%)",
        }}
      />
      <Image
        src="/book-hero-45.png"
        alt="Be the Mirror — A Change Agent's Guide to Transformation for an AI World by Lois Wortley, Ajay Ghanagam and Hiren Doshi"
        width={1400}
        height={1400}
        priority={priority}
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 80vw"
        className="h-auto w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
      />
    </figure>
  );
}
```

Note on `width`/`height`: pass the intrinsic pixel dimensions of the source PNG. Before writing this file, run `sips -g pixelWidth -g pixelHeight public/book-hero-45.png` and substitute the actual values (fallback of 1400×1400 above is a safe placeholder — replace it).

- [ ] **Step 3: Read intrinsic dimensions and update if needed**

```bash
sips -g pixelWidth -g pixelHeight public/book-hero-45.png
```

Edit the `width`/`height` in `BookVisual.tsx` to match the actual dimensions.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(phase-1): hero background + book visual"
```

---

### Task 6: Compose Hero and homepage

**Files:**
- Create: `src/components/site/Hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Section`, `Container`, `Button`, `HeroBackground`, `BookVisual`
- Produces: `<Hero />` — full hero composition; `page.tsx` renders `<Header /> <main><Hero /></main>` and nothing else in Phase 1.

- [ ] **Step 1: Hero component**

```tsx
// src/components/site/Hero.tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { BookVisual } from "./BookVisual";

export function Hero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <HeroBackground />
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Leadership · Change · Transformation
            </p>

            <h1
              id="hero-title"
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
              Lois Wortley <span aria-hidden="true">·</span> Ajay Ghanagam <span aria-hidden="true">·</span> Hiren Doshi
            </p>

            <p className="mt-10 max-w-xl text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation changes when we change what we see.
            </p>

            <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Organizations invest heavily in technology, processes and AI. Yet transformation often
              succeeds or fails because of something much more human &mdash; leadership, trust,
              behaviour, resistance and our willingness to see what is really happening.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#buy" variant="primary">Buy the Book</Button>
              <Button href="#ideas" variant="secondary">Explore the Ideas</Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2">
            <BookVisual priority />
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

Copy rules honored:
- `BE THE` white, `MIRROR` yellow
- Positioning statement verbatim
- Supporting copy verbatim (with typographic em-dash `&mdash;`)
- Authors in the required order with middle-dot separators
- Two CTAs: `Buy the Book`, `Explore the Ideas`
- Eyebrow uppercase-tracked, per spec

Mobile order (from spec option A): Title → Book → Positioning + copy → CTAs. Implemented via `order-1`/`order-2` on the visual/left columns so on mobile the book sits between title and body. If a stricter Title → Positioning → Book → CTAs ordering is later preferred, the swap is a one-line change to the `order-*` classes.

- [ ] **Step 2: Wire homepage**

Replace `src/app/page.tsx` contents:

```tsx
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(phase-1): homepage hero composition"
```

---

### Task 7: Root layout + metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `inter` from `src/lib/fonts.ts`
- Produces: page-level `<title>` and `<meta name="description">` matching the spec verbatim; body wired to the Inter font variable.

- [ ] **Step 1: Rewrite layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Be the Mirror | A Change Agent's Guide to Transformation for an AI World",
  description:
    "Be the Mirror explores how leaders, change agents and organizations can navigate transformation in an AI-driven world by looking beyond technology to leadership, behaviour, trust and change.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[color:var(--color-bg-primary)] text-[color:var(--color-fg-primary)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[color:var(--color-accent-cyan)] focus:px-4 focus:py-2 focus:text-[color:var(--color-bg-primary)]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(phase-1): metadata, Inter font, skip-link"
```

---

### Task 8: Verify — build, lint, typecheck, manual QA

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: everything above
- Produces: a green build + a completed AC-1..AC-12 checklist

- [ ] **Step 1: Automated checks**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

All three must be clean. If ESLint complains about `<a href="#...">` accessibility for the placeholder nav items, add a targeted `aria-disabled` treatment rather than disabling the rule wholesale.

- [ ] **Step 2: Start dev server and hit each viewport**

```bash
npm run dev
```

Manually verify at `http://localhost:3000` in browser devtools:

- Desktop (≥1024px): two-column hero, book right, text left. Header shows the full nav + "Buy the Book" pill.
- Tablet (~768px): still readable; book scales without distortion; nav is hamburger.
- Mobile (~375px): stacked hero in the intended order; hamburger opens the drawer; Escape and the close button both dismiss it; no horizontal scroll.
- Devtools console: zero errors, zero warnings from React or Next.
- Focus order through the header + nav is logical; skip-link appears on Tab.

- [ ] **Step 3: Sign off against acceptance criteria**

Walk AC-1 through AC-12 from the spec. For each, note pass/fail and any deferred items. Only mark Phase 1 complete when all twelve pass.

- [ ] **Step 4: Final commit**

If any tweaks were needed:

```bash
git add -A && git commit -m "chore(phase-1): verification adjustments"
```

Then produce the "Final output from Claude Code" report the spec requests: summary, files created, files modified, deps added (should be none beyond `create-next-app` defaults), commands, assumptions, deferred items, AC-1..AC-12 confirmations.

---

## Self-Review

**Spec coverage check** (walking the user's Phase 1 message top-to-bottom):

- Step 1 inspection → captured in Task 1 preamble + this plan's opening notes.
- Brand direction, aesthetic bans → global constraints + Task 5 (background stays restrained, no neon/robots).
- Typography system → Task 2 (Inter + type scale tokens).
- Color tokens → Task 2 (bg/fg/accent/border tokens as CSS variables in `@theme`).
- Layout system → Task 2 (`--container-site`, gutters, `--spacing-section`).
- Header/nav (desktop + mobile) → Task 4.
- Homepage hero (left copy + right book) → Task 6 (composition), Task 5 (visuals).
- Hero background → Task 5 (`HeroBackground`).
- Responsive behaviour → Task 6 (grid + `order-*`), Task 4 (mobile drawer).
- Subtle motion → intentionally minimal: `transition-colors` on hover, no scroll or parallax. No task explicitly adds motion beyond that, which matches the "minimal motion only" constraint.
- Component architecture → Tasks 3, 4, 5, 6 produce Container/Section/Button/Header/Navigation/MobileNavigation/Hero/BookVisual.
- Accessibility → semantic `<header>/<main>/<nav>/<section>`, skip-link (Task 7), `aria-*` on drawer, focus-visible outline (Task 2). No excess ARIA.
- Image handling → Task 1 renames to URL-safe paths; Task 5 uses `next/image` with intrinsic dims + `sizes`. Alt text matches the spec example.
- SEO basics → Task 7 metadata title/description verbatim.
- Non-goals → nothing in the plan builds The Book/Authors/Ideas/etc. pages.
- Validation → Task 8 covers the 12 spec-listed validation steps.

**Placeholder scan:** No "TBD"/"handle edge cases"/"implement later". Every code block is complete. The one substitution left to the executor is the intrinsic image dimensions from `sips` in Task 5 Step 3.

**Type consistency:** `NAV_ITEMS`, `Button` variants (`"primary" | "secondary"`), `Section.bleed` (`"none" | "full"`) are referenced identically in every task that consumes them. `inter.variable` is used in Task 7 as declared in Task 2.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-17-be-the-mirror-phase-1.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
