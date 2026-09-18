# Be the Mirror — Phase 5 Implementation Plan (Speaking & Workshops + Contact + V1 Completion)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the public-facing V1 by shipping `/speaking` and `/contact`, a shared inquiry form with an honest submission architecture (no fake email delivery), a light-touch cross-page CTA pass, footer/nav completion, and a minimal `not-found` page — reusing every Phase 1–4 primitive and adding no new runtime dependencies.

**Architecture:**
- Structured content lives in TypeScript modules under `src/content/` (Phase 1–4 convention). Speaking topics, engagement formats, audience groups, and take-aways are typed arrays in one `speaking.ts` module.
- Enquiry submission is a Server Action (`src/app/actions/submit-enquiry.ts`) that validates the payload with a hand-rolled validator (no Zod) and calls a swappable adapter (`src/lib/enquiry-adapter.ts`). Default adapter logs to server console and returns `delivered: false, reason: "no-provider-configured"` so the UI can display an honest "ready for integration" state rather than fake delivery.
- One new client component (`InquiryForm.tsx`) — the ONLY new `"use client"` in Phase 5. All page sections stay Server Components.
- Speaking + Contact routes are Server Components. Contact reads `?type=` from `searchParams` to pre-select the enquiry type.
- Cross-page CTAs are added with minimal edits (small tertiary links; no new sections on `/`, `/authors`, `/ideas`, `/resources`, `/book`).

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript 5 (strict) · Tailwind v4 (`@theme` tokens in `globals.css`) · `@/lib/cn` · no new dependencies.

**Spec:** User's Phase 5 message on 2026-09-18 in this session. AC-66..AC-85 come from that message.

## Global Constraints

- **No new runtime dependencies.** No form library, no Zod, no email SDK, no CAPTCHA, no analytics.
- **Server components by default.** ONE new client component allowed in Phase 5: `InquiryForm.tsx`. Every other new component is a Server Component.
- **Reuse Phase 1–4 primitives.** `Container`, `Section`, `SectionHeading`, `Button`, `Reveal`, `AuthorCard`, `Footer`, `Header`, `NAV_ITEMS`, tokens.
- **No fabricated claims.** Do NOT invent speaking history, clients, testimonials, event appearances, audience sizes, awards, ratings, or commercial outcomes (AC-69, AC-83). Session topics are described as website session concepts, not existing paid programs.
- **No fabricated author content.** Reuse the existing `AUTHORS` array. `AuthorCard` already renders explicit "to be provided" placeholders when fields are absent — keep that pattern.
- **Honest submission state (AC-73).** The success screen must NEVER claim "email sent" if no provider is wired. The default adapter returns `delivered: false`; the UI honors it and shows a development-safe "message received — email integration required" copy path when `delivered === false`.
- **No secrets in the browser.** Server Action + adapter only. No env vars are consumed by client code.
- **Centralized purchase URL (AC-76).** `PURCHASE_URL` in `src/config/site.ts` is already centralized; every Buy CTA uses it. Do not hard-code a second URL anywhere.
- **Copy verbatim from spec** where the spec quotes exact strings (hero headlines, section headings, CTA labels). HTML entities per Phase 2/3 convention (`&mdash;`, `&rsquo;`, `&ldquo;`, `&rdquo;`).
- **Slugs.** N/A — no dynamic content routes are added in Phase 5.
- **Navigation.** `Speaking` and `Contact` flip to `live: true` with real routes `/speaking` and `/contact`. Every primary nav item must resolve to a real route (AC-75, AC-77).
- **Cross-page CTAs (AC-78..AC-80).** SUBTLE. One added link per touched page maximum. No new sections on `/`, `/authors`, `/ideas`, `/resources`, `/book`.
- **Legal / social links.** Footer omits Privacy/Terms links (no page exists). No fake LinkedIn or social URLs.
- **Validation.** `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean. Dev-server curl smoke test for `/`, `/book`, `/authors`, `/ideas`, `/ideas/why-people-resist-change`, `/resources`, `/speaking`, `/contact`, `/contact?type=speaking`.

---

## Content Model Decision (informational — implementers follow the task briefs)

**Speaking content** (`src/content/speaking.ts`):
- `SessionTopic { slug; title; oneLiner; description; relatedIdeaSlug? }`
- `EngagementFormat { id; label; description }`
- `AudienceGroup { id; label }`
- `Outcome { id; text }`

**Enquiry types** (`src/lib/enquiry.ts`):
- `EnquiryType = "general" | "speaking" | "workshop" | "media" | "book"` (spec §"INQUIRY TYPES")
- `EngagementType = "keynote" | "executive" | "workshop" | "panel" | "virtual"` (spec §"SESSION FORMATS")
- `LocationFormat = "in-person" | "virtual" | "hybrid" | "unsure"`
- `ENQUIRY_TYPE_LABELS: Record<EnquiryType, string>` with the exact spec labels

**Submission adapter** (`src/lib/enquiry-adapter.ts`):
- `SubmitEnquiryInput` interface containing every form field (all optional except `name`, `email`, `enquiryType`, `message`)
- `SubmitResult = { ok: true; delivered: boolean; reason?: string } | { ok: false; errors: Record<string, string> }`
- `submitEnquiry(input): Promise<SubmitResult>` — default implementation logs `input` server-side and returns `{ok: true, delivered: false, reason: "no-provider-configured"}`. Documented integration point at the top of the file.

## Preflight cross-task scan

- Task 1 (speaking data types) → consumed by Tasks 5 (Speaking page) and Task 6 (Contact page reads `EnquiryType`). Task 3 (server action) validates against `enquiry.ts` types.
- Task 2 (form primitives) → consumed by Task 4 (InquiryForm).
- Task 4 (InquiryForm) → consumed by Task 6 (Contact page) and OPTIONALLY Task 5 (Speaking page — deferred to Task 6; Speaking page's final CTA links to `/contact?type=speaking`).
- Task 7 (cross-page CTAs) → depends on `/speaking` existing (Task 5) and `/contact` existing (Task 6).
- Task 8 (docs + 404) → independent.
- Task 9 (validation) → runs last.

No task pairs contradict each other; no task contradicts Global Constraints. Session-topic → related-idea references (`relatedIdeaSlug`) must resolve against Phase 4's `IDEAS` aggregator — Task 1 handles the mapping using existing published slugs (`why-people-resist-change`, `technology-can-change-faster-than-organizations`, `before-another-framework-look-in-the-mirror`, etc.). Scan clean.

---

## Task 1: Speaking data model + enquiry types + submission adapter + nav flip

**Files:**
- Create: `src/content/speaking.ts`
- Create: `src/lib/enquiry.ts`
- Create: `src/lib/enquiry-adapter.ts`
- Modify: `src/lib/nav.ts` (flip Speaking + Contact to `live: true` with `/speaking` and `/contact`)

**Interfaces:**
- Produces: `SESSION_TOPICS`, `ENGAGEMENT_FORMATS`, `AUDIENCE_GROUPS`, `OUTCOMES`, plus the types `SessionTopic`, `EngagementFormat`, `AudienceGroup`, `Outcome` from `@/content/speaking`.
- Produces: `EnquiryType`, `EngagementType`, `LocationFormat` unions and `ENQUIRY_TYPE_LABELS`, `ENGAGEMENT_TYPE_LABELS`, `LOCATION_FORMAT_LABELS` from `@/lib/enquiry`.
- Produces: `SubmitEnquiryInput` type, `SubmitResult` discriminated union, `submitEnquiry` function from `@/lib/enquiry-adapter`.

- [ ] **Step 1: Create `src/lib/enquiry.ts`**

```ts
// src/lib/enquiry.ts
// Enquiry taxonomies used by /contact, /speaking, and the submission adapter.

export type EnquiryType = "general" | "speaking" | "workshop" | "media" | "book";

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  general: "General Inquiry",
  speaking: "Speaking",
  workshop: "Workshop",
  media: "Media / Interview",
  book: "Book / Event",
};

export const ENQUIRY_TYPES: readonly EnquiryType[] = [
  "general",
  "speaking",
  "workshop",
  "media",
  "book",
] as const;

export type EngagementType = "keynote" | "executive" | "workshop" | "panel" | "virtual";

export const ENGAGEMENT_TYPE_LABELS: Record<EngagementType, string> = {
  keynote: "Keynote",
  executive: "Executive Session",
  workshop: "Workshop",
  panel: "Panel / Fireside Chat",
  virtual: "Virtual Session",
};

export type LocationFormat = "in-person" | "virtual" | "hybrid" | "unsure";

export const LOCATION_FORMAT_LABELS: Record<LocationFormat, string> = {
  "in-person": "In Person",
  virtual: "Virtual",
  hybrid: "Hybrid",
  unsure: "Not Sure Yet",
};

// Narrow an untrusted string to a known EnquiryType, or return the fallback.
export function coerceEnquiryType(value: unknown, fallback: EnquiryType = "general"): EnquiryType {
  return typeof value === "string" && (ENQUIRY_TYPES as readonly string[]).includes(value)
    ? (value as EnquiryType)
    : fallback;
}
```

- [ ] **Step 2: Create `src/content/speaking.ts`**

Six session topics matching spec §"SPEAKING PAGE — SESSION TOPICS", mapped to existing Ideas by slug where a natural connection exists.

```ts
// src/content/speaking.ts
export type SessionTopic = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  relatedIdeaSlug?: string;
};

export type EngagementFormat = {
  id: string;
  label: string;
  description: string;
};

export type AudienceGroup = {
  id: string;
  label: string;
};

export type Outcome = {
  id: string;
  text: string;
};

export const SESSION_TOPICS: readonly SessionTopic[] = [
  {
    slug: "be-the-mirror-leading-from-within",
    title: "Be the Mirror: Leading Transformation from Within",
    oneLiner: "Seeing what is really happening during change.",
    description:
      "How leaders and change agents can help organizations see what is really happening during transformation \u2014 including resistance, trust, behaviour, and the gap between intention and experience.",
    relatedIdeaSlug: "before-another-framework-look-in-the-mirror",
  },
  {
    slug: "transformation-in-an-ai-world",
    title: "Transformation in an AI World",
    oneLiner: "Why absorbing AI is harder than deploying it.",
    description:
      "AI can accelerate technology change dramatically. The harder challenge is helping organizations absorb, adopt, and sustain that change.",
    relatedIdeaSlug: "technology-can-change-faster-than-organizations",
  },
  {
    slug: "why-people-resist-change",
    title: "Why People Resist Change",
    oneLiner: "Resistance as a rational response.",
    description:
      "A practical conversation about resistance, uncertainty, trust, and why resistance may sometimes be a rational response to how change is introduced.",
    relatedIdeaSlug: "why-people-resist-change",
  },
  {
    slug: "building-change-agents-inside-the-organization",
    title: "Building Change Agents Inside the Organization",
    oneLiner: "Influence without formal authority.",
    description:
      "How people can influence transformation even when they do not have formal authority or control.",
    relatedIdeaSlug: "change-agents-dont-need-to-control-everything",
  },
  {
    slug: "ai-adoption-is-an-organizational-change-problem",
    title: "AI Adoption Is an Organizational Change Problem",
    oneLiner: "Deploying AI is only part of the journey.",
    description:
      "Why deploying AI technology is only part of the journey \u2014 and why adoption depends on leadership, behaviour, trust, skills, and operating models.",
    relatedIdeaSlug: "ai-adoption-is-an-organizational-change-problem",
  },
  {
    slug: "from-transformation-fatigue-to-transformation-ownership",
    title: "From Transformation Fatigue to Transformation Ownership",
    oneLiner: "Beyond repeated programs.",
    description:
      "How organizations can move beyond repeated programs and help people participate meaningfully in change.",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
] as const;

export const ENGAGEMENT_FORMATS: readonly EngagementFormat[] = [
  {
    id: "keynote",
    label: "Keynote",
    description:
      "A focused leadership talk designed for conferences, executive events, and large organizational gatherings.",
  },
  {
    id: "executive",
    label: "Executive Session",
    description:
      "A facilitated conversation with senior leaders around transformation, leadership, and organizational change.",
  },
  {
    id: "workshop",
    label: "Workshop",
    description:
      "An interactive session where teams reflect on current transformation challenges and apply Be the Mirror ideas.",
  },
  {
    id: "panel",
    label: "Panel / Fireside Chat",
    description:
      "A conversational format for leadership events, conferences, and internal programs.",
  },
  {
    id: "virtual",
    label: "Virtual Session",
    description:
      "A remote session for distributed leadership or transformation teams.",
  },
] as const;

export const AUDIENCE_GROUPS: readonly AudienceGroup[] = [
  { id: "exec-leadership", label: "Executive leadership teams" },
  { id: "tech-leadership", label: "Technology leadership teams" },
  { id: "transformation-office", label: "Transformation offices" },
  { id: "product-engineering", label: "Product and engineering organizations" },
  { id: "hr-people", label: "HR / people leaders" },
  { id: "change-community", label: "Change management communities" },
  { id: "ai-adoption", label: "AI adoption teams" },
  { id: "corporate-events", label: "Corporate leadership events" },
  { id: "conferences", label: "Industry conferences" },
] as const;

export const OUTCOMES: readonly Outcome[] = [
  { id: "o1", text: "A clearer way to think about resistance." },
  { id: "o2", text: "A better understanding of the gap between transformation intent and employee experience." },
  { id: "o3", text: "Questions leaders can ask before introducing more process or technology." },
  { id: "o4", text: "Ways change agents can create influence." },
  { id: "o5", text: "A more human approach to AI adoption." },
  { id: "o6", text: "Practical reflection questions for leadership teams." },
] as const;
```

- [ ] **Step 3: Create `src/lib/enquiry-adapter.ts`**

Documented integration point. Default implementation logs server-side and returns `delivered: false` so the UI honestly reflects "no provider wired".

```ts
// src/lib/enquiry-adapter.ts
//
// Enquiry submission adapter.
//
// Integration point for Phase 5. The default adapter logs the submission to
// the server console and returns { delivered: false, reason: "no-provider-configured" }.
// The UI honors that flag and shows a development-safe success state that does
// NOT claim email delivery.
//
// To wire a real email provider later, replace `submitEnquiry` below with a
// call to that provider using a server-side API key from process.env.
// Never expose credentials to the browser.

import type { EnquiryType, EngagementType, LocationFormat } from "./enquiry";

export type SubmitEnquiryInput = {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  enquiryType: EnquiryType;
  message: string;
  // Speaking / workshop extras (optional)
  engagementType?: EngagementType;
  event?: string;
  preferredDate?: string;
  location?: LocationFormat;
  audienceSize?: string;
};

export type SubmitResult =
  | { ok: true; delivered: boolean; reason?: string }
  | { ok: false; errors: Record<string, string> };

export async function submitEnquiry(input: SubmitEnquiryInput): Promise<SubmitResult> {
  // Redact email for the log line; keep it inspectable server-side.
  const safeSummary = {
    name: input.name,
    email: input.email.replace(/(.).+(@.+)/, "$1***$2"),
    organization: input.organization ?? "",
    enquiryType: input.enquiryType,
    engagementType: input.engagementType ?? "",
    location: input.location ?? "",
    messageLength: input.message.length,
  };
  // eslint-disable-next-line no-console
  console.info("[enquiry] received (no provider wired):", safeSummary);
  return { ok: true, delivered: false, reason: "no-provider-configured" };
}
```

- [ ] **Step 4: Modify `src/lib/nav.ts` — flip Speaking + Contact to live routes**

Replace lines 10-11:

```ts
  { label: "Speaking",  href: "#speaking",  live: false },
  { label: "Contact",   href: "#contact",   live: false },
```

with:

```ts
  { label: "Speaking",  href: "/speaking",  live: true  },
  { label: "Contact",   href: "/contact",   live: true  },
```

- [ ] **Step 5: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/content/speaking.ts src/lib/enquiry.ts src/lib/enquiry-adapter.ts src/lib/nav.ts
git commit -m "feat(content): speaking data + enquiry types + submission adapter + nav flip"
```

---

## Task 2: Reusable form primitives (server-safe)

**Files:**
- Create: `src/components/ui/FormField.tsx`
- Create: `src/components/ui/TextField.tsx`
- Create: `src/components/ui/TextArea.tsx`
- Create: `src/components/ui/SelectField.tsx`
- Create: `src/components/ui/FormMessage.tsx`
- Create: `src/components/ui/FormSuccess.tsx`

**Interfaces:**
- All six components are Server Components — NO `"use client"`.
- Consumed by: Task 4 (`InquiryForm.tsx`).

- [ ] **Step 1: Create `src/components/ui/FormField.tsx`**

```tsx
// src/components/ui/FormField.tsx
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ id, label, required, description, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[length:var(--text-body)] font-medium text-[color:var(--color-fg-primary)]">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[color:var(--color-accent-cyan)]">
            *
          </span>
        )}
      </label>
      {description && (
        <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">{description}</p>
      )}
      {children}
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-[length:var(--text-small)] text-red-400"
        >
          {error}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/TextField.tsx`**

```tsx
// src/components/ui/TextField.tsx
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = {
  id: string;
  name: string;
  type?: "text" | "email";
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  describedById?: string;
  invalid?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type" | "autoComplete" | "defaultValue" | "required" | "placeholder">;

export function TextField({
  id,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  required,
  placeholder,
  describedById,
  invalid,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "placeholder:text-[color:var(--color-fg-muted)]",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
      {...rest}
    />
  );
}
```

- [ ] **Step 3: Create `src/components/ui/TextArea.tsx`**

```tsx
// src/components/ui/TextArea.tsx
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = {
  id: string;
  name: string;
  rows?: number;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  describedById?: string;
  invalid?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name" | "rows" | "autoComplete" | "defaultValue" | "required" | "placeholder">;

export function TextArea({
  id,
  name,
  rows = 5,
  autoComplete,
  defaultValue,
  required,
  placeholder,
  describedById,
  invalid,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "placeholder:text-[color:var(--color-fg-muted)] resize-y",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
      {...rest}
    />
  );
}
```

- [ ] **Step 4: Create `src/components/ui/SelectField.tsx`**

```tsx
// src/components/ui/SelectField.tsx
import { cn } from "@/lib/cn";

type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  id: string;
  name: string;
  options: readonly SelectOption[];
  defaultValue?: string;
  required?: boolean;
  describedById?: string;
  invalid?: boolean;
  className?: string;
};

export function SelectField({
  id,
  name,
  options,
  defaultValue,
  required,
  describedById,
  invalid,
  className,
}: SelectFieldProps) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      required={required}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/FormMessage.tsx`**

```tsx
// src/components/ui/FormMessage.tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type FormMessageProps = {
  variant: "error" | "info" | "success";
  children: ReactNode;
  className?: string;
};

export function FormMessage({ variant, children, className }: FormMessageProps) {
  const colorMap = {
    error: "text-red-400 bg-red-950/30 border border-red-800/40",
    info: "text-[color:var(--color-fg-secondary)] bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border-subtle)]",
    success: "text-[color:var(--color-accent-cyan)] bg-[color:var(--color-accent-cyan-soft)]/10 border border-[color:var(--color-accent-cyan)]/20",
  };

  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md px-4 py-3 text-[length:var(--text-body)]",
        colorMap[variant],
        className
      )}
    >
      {children}
    </p>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/FormSuccess.tsx`**

```tsx
// src/components/ui/FormSuccess.tsx
import { Button } from "@/components/ui/Button";

type FormSuccessProps = {
  delivered: boolean;
  reason?: string;
};

export function FormSuccess({ delivered }: FormSuccessProps) {
  const navLinks = (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button href="/" variant="secondary">Home</Button>
      <Button href="/book" variant="secondary">Explore the Book</Button>
      <Button href="/ideas" variant="secondary">Ideas</Button>
    </div>
  );

  if (delivered) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-primary)]">
          Thank you. Your message has been received. We appreciate you reaching out to Be the Mirror.
        </p>
        {navLinks}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-primary)]">
        Thank you. Your message was received for now, but email delivery is not yet configured for this site.
      </p>
      <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]">
        If you were expecting an email response, please try again after configuration is complete.
      </p>
      {navLinks}
    </div>
  );
}
```

- [ ] **Step 7: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/FormField.tsx src/components/ui/TextField.tsx src/components/ui/TextArea.tsx src/components/ui/SelectField.tsx src/components/ui/FormMessage.tsx src/components/ui/FormSuccess.tsx
git commit -m "feat(ui): reusable form primitives"
```

---

## Task 3: Server action for enquiry submission

**Files:**
- Create: `src/app/actions/submit-enquiry.ts`

**Interfaces:**
- Produces: `submitEnquiryAction` (exported async Server Action).
- Consumes: `coerceEnquiryType` from `@/lib/enquiry`, `submitEnquiry` + `SubmitResult` from `@/lib/enquiry-adapter`.

- [ ] **Step 1: Create `src/app/actions/submit-enquiry.ts`**

```ts
"use server";
// src/app/actions/submit-enquiry.ts

import { coerceEnquiryType } from "@/lib/enquiry";
import { submitEnquiry, type SubmitResult } from "@/lib/enquiry-adapter";

export type { SubmitResult };

export async function submitEnquiryAction(
  _prev: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const organization = (formData.get("organization") ?? "").toString().trim();
  const role = (formData.get("role") ?? "").toString().trim();
  const enquiryTypeRaw = formData.get("enquiryType")?.toString();
  const message = (formData.get("message") ?? "").toString().trim();
  const engagementType = (formData.get("engagementType") ?? "").toString().trim() || undefined;
  const event = (formData.get("event") ?? "").toString().trim() || undefined;
  const preferredDate = (formData.get("preferredDate") ?? "").toString().trim() || undefined;
  const location = (formData.get("location") ?? "").toString().trim() || undefined;
  const audienceSize = (formData.get("audienceSize") ?? "").toString().trim() || undefined;

  const errors: Record<string, string> = {};

  if (name.length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const enquiryType = coerceEnquiryType(enquiryTypeRaw);

  if (message.length < 10) {
    errors.message = "Please tell us a bit more (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return submitEnquiry({
    name,
    email,
    organization: organization || undefined,
    role: role || undefined,
    enquiryType,
    message,
    engagementType: engagementType as Parameters<typeof submitEnquiry>[0]["engagementType"],
    event,
    preferredDate,
    location: location as Parameters<typeof submitEnquiry>[0]["location"],
    audienceSize,
  });
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/actions/submit-enquiry.ts
git commit -m "feat(actions): server action for enquiry submission"
```

---

## Task 4: `InquiryForm` client component

**Files:**
- Create: `src/components/site/contact/InquiryForm.tsx`

**Interfaces:**
- This is the ONLY new `"use client"` component in Phase 5.
- Consumes: `submitEnquiryAction` + `SubmitResult` from `@/app/actions/submit-enquiry`, `EnquiryType` + `ENQUIRY_TYPES` + `ENQUIRY_TYPE_LABELS` + `LOCATION_FORMAT_LABELS` from `@/lib/enquiry`, `FormField`, `TextField`, `TextArea`, `SelectField`, `FormMessage`, `FormSuccess` from `@/components/ui/*`.

- [ ] **Step 1: Create `src/components/site/contact/InquiryForm.tsx`**

```tsx
"use client";
// src/components/site/contact/InquiryForm.tsx

import { useActionState, useState } from "react";
import { submitEnquiryAction } from "@/app/actions/submit-enquiry";
import type { SubmitResult } from "@/app/actions/submit-enquiry";
import type { EnquiryType } from "@/lib/enquiry";
import { ENQUIRY_TYPES, ENQUIRY_TYPE_LABELS, LOCATION_FORMAT_LABELS } from "@/lib/enquiry";
import { FormField } from "@/components/ui/FormField";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { SelectField } from "@/components/ui/SelectField";
import { FormMessage } from "@/components/ui/FormMessage";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Button } from "@/components/ui/Button";

type InquiryFormProps = {
  defaultEnquiryType?: EnquiryType;
};

const enquiryTypeOptions = ENQUIRY_TYPES.map((t) => ({
  value: t,
  label: ENQUIRY_TYPE_LABELS[t],
}));

const locationOptions = (
  Object.entries(LOCATION_FORMAT_LABELS) as [string, string][]
).map(([value, label]) => ({ value, label }));

const speakingEnquiryTypes: readonly EnquiryType[] = ["speaking", "workshop"];

export function InquiryForm({ defaultEnquiryType = "general" }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState<SubmitResult | null, FormData>(
    submitEnquiryAction,
    null
  );
  const [selectedType, setSelectedType] = useState<EnquiryType>(defaultEnquiryType);

  const errors = state?.ok === false ? state.errors : {};
  const showSpeakingExtras = speakingEnquiryTypes.includes(selectedType);

  if (state?.ok === true) {
    return <FormSuccess delivered={state.delivered} reason={state.reason} />;
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {state?.ok === false && (
        <FormMessage variant="error">
          There was a problem with your submission. Please review the fields below.
        </FormMessage>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <TextField
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            describedById={errors.name ? "name-error" : undefined}
            invalid={!!errors.name}
          />
        </FormField>

        <FormField id="email" label="Email" required error={errors.email}>
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            describedById={errors.email ? "email-error" : undefined}
            invalid={!!errors.email}
          />
        </FormField>

        <FormField id="organization" label="Organization" error={errors.organization}>
          <TextField
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Your organization (optional)"
          />
        </FormField>

        <FormField id="role" label="Role / Title" error={errors.role}>
          <TextField
            id="role"
            name="role"
            type="text"
            placeholder="Your role or title (optional)"
          />
        </FormField>
      </div>

      <FormField id="enquiryType" label="Inquiry Type" required error={errors.enquiryType}>
        <SelectField
          id="enquiryType"
          name="enquiryType"
          options={enquiryTypeOptions}
          defaultValue={defaultEnquiryType}
          required
          onChange={(e) => setSelectedType(e.target.value as EnquiryType)}
        />
      </FormField>

      {showSpeakingExtras && (
        <div className="grid gap-6 md:grid-cols-2 border border-[color:var(--color-border-subtle)] rounded-lg p-4">
          <p className="col-span-full text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
            Speaking &amp; Workshop details (optional)
          </p>

          <FormField id="event" label="Event or Organization">
            <TextField id="event" name="event" type="text" placeholder="Event name or organizing body" />
          </FormField>

          <FormField id="preferredDate" label="Preferred Date">
            <TextField id="preferredDate" name="preferredDate" type="text" placeholder="e.g. Q1 2027 or March 2027" />
          </FormField>

          <FormField id="location" label="Location Format">
            <SelectField
              id="location"
              name="location"
              options={[{ value: "", label: "— select —" }, ...locationOptions]}
            />
          </FormField>

          <FormField id="audienceSize" label="Expected Audience Size">
            <TextField id="audienceSize" name="audienceSize" type="text" placeholder="e.g. 50, 200, unsure" />
          </FormField>
        </div>
      )}

      <FormField id="message" label="Message" required error={errors.message}>
        <TextArea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your inquiry..."
          describedById={errors.message ? "message-error" : undefined}
          invalid={!!errors.message}
        />
      </FormField>

      <div className="flex flex-col gap-3">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Sending\u2026" : "Send Message"}
        </Button>
        <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
          We will use the information you provide only to respond to your inquiry.
        </p>
      </div>
    </form>
  );
}
```

Note: `SelectField` must forward `onChange` — update `SelectFieldProps` in `src/components/ui/SelectField.tsx` to accept `onChange?: React.ChangeEventHandler<HTMLSelectElement>` and spread it onto the `<select>` element. This is the one controlled prop needed for the conditional speaking-extras reveal.

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/contact/InquiryForm.tsx src/components/ui/SelectField.tsx
git commit -m "feat(contact): client InquiryForm bound to server action"
```

---

## Task 5: `/speaking` page + sections

**Files:**
- Create: `src/components/site/speaking/SpeakingHero.tsx`
- Create: `src/components/site/speaking/WhyThisMatters.tsx`
- Create: `src/components/site/speaking/SpeakingTopics.tsx`
- Create: `src/components/site/speaking/SessionFormats.tsx`
- Create: `src/components/site/speaking/AudienceSection.tsx`
- Create: `src/components/site/speaking/TakeAways.tsx`
- Create: `src/components/site/speaking/BookConnection.tsx`
- Create: `src/components/site/speaking/SpeakingAuthors.tsx`
- Create: `src/components/site/speaking/SpeakingFinalCTA.tsx`
- Create: `src/app/speaking/page.tsx`

**Interfaces:**
- All components are Server Components.
- Consumes: `SESSION_TOPICS`, `ENGAGEMENT_FORMATS`, `AUDIENCE_GROUPS`, `OUTCOMES` from `@/content/speaking`; `AUTHORS` from `@/content/authors`; Phase 1–4 primitives.

- [ ] **Step 1: Create `src/components/site/speaking/SpeakingHero.tsx`**

```tsx
// src/components/site/speaking/SpeakingHero.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function SpeakingHero() {
  return (
    <Section className="pt-[var(--spacing-section)] pb-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <p className="text-[length:var(--text-nav)] uppercase tracking-widest text-[color:var(--color-accent-cyan)] mb-4">
            Speaking &amp; Workshops
          </p>
        </Reveal>
        <Reveal delayMs={100}>
          <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-3xl">
            Bring Be the Mirror into the conversation.
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-2xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            The authors of Be the Mirror speak, facilitate, and work with leadership teams, transformation offices, and organizations navigating change in an AI-driven world.
          </p>
        </Reveal>
        <Reveal delayMs={300}>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact?type=speaking" variant="primary">Invite the Authors</Button>
            <Button href="#session-topics" variant="secondary">Explore Session Topics</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/site/speaking/WhyThisMatters.tsx`**

```tsx
// src/components/site/speaking/WhyThisMatters.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyThisMatters() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="why-this-matters" align="left">
          Transformation is not just a strategy conversation.
        </SectionHeading>
        <div className="mt-6 max-w-2xl text-[color:var(--color-fg-secondary)] text-[length:var(--text-body-lg)]" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
          <p className="mb-4">
            Most transformation efforts focus on the strategy, the technology, or the process. The harder part &mdash; the part that determines whether change actually takes hold &mdash; is the human part.
          </p>
          <p className="mb-6">
            These conversations are for organizations that want to look honestly at how change is experienced, not just how it is communicated.
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              "Why people resist change &mdash; and when resistance is rational.",
              "How AI adoption is as much an organizational challenge as a technical one.",
              "The gap between transformation intent and transformation experience.",
              "How change agents create influence without formal authority.",
              "What leaders can do before reaching for another framework.",
              "How to move from transformation fatigue to transformation ownership.",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-1 text-[color:var(--color-accent-cyan)] select-none">&middot;</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Create `src/components/site/speaking/SpeakingTopics.tsx`**

```tsx
// src/components/site/speaking/SpeakingTopics.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SESSION_TOPICS } from "@/content/speaking";

export function SpeakingTopics() {
  return (
    <Section id="session-topics" className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading eyebrow="Session Topics" id="session-topics-heading" align="left">
          Conversations we can bring to your organization.
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SESSION_TOPICS.map((topic) => (
            <div
              key={topic.slug}
              className="flex flex-col gap-3 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] p-6"
            >
              <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {topic.title}
              </h3>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-accent-cyan)] font-medium">
                {topic.oneLiner}
              </p>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] flex-1">
                {topic.description}
              </p>
              {topic.relatedIdeaSlug && (
                <a
                  href={`/ideas/${topic.relatedIdeaSlug}`}
                  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline mt-auto"
                >
                  Read the idea &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Create `src/components/site/speaking/SessionFormats.tsx`**

```tsx
// src/components/site/speaking/SessionFormats.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENGAGEMENT_FORMATS } from "@/content/speaking";

export function SessionFormats() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="session-formats-heading" align="left">
          How we can engage.
        </SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ENGAGEMENT_FORMATS.map((format) => (
            <div
              key={format.id}
              className="flex flex-col gap-2 rounded-lg border border-[color:var(--color-border-subtle)] p-6"
            >
              <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {format.label}
              </h3>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]">
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Create `src/components/site/speaking/AudienceSection.tsx`**

```tsx
// src/components/site/speaking/AudienceSection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCE_GROUPS } from "@/content/speaking";

export function AudienceSection() {
  return (
    <Section className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading id="audience-heading" align="left">
          Who these conversations are for.
        </SectionHeading>
        <div className="mt-8 flex flex-wrap gap-3">
          {AUDIENCE_GROUPS.map((group) => (
            <span
              key={group.id}
              className="rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]"
            >
              {group.label}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: Create `src/components/site/speaking/TakeAways.tsx`**

```tsx
// src/components/site/speaking/TakeAways.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OUTCOMES } from "@/content/speaking";

export function TakeAways() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="takeaways-heading" align="left">
          What participants take away.
        </SectionHeading>
        <ul className="mt-8 flex flex-col gap-4 max-w-2xl">
          {OUTCOMES.map((outcome) => (
            <li key={outcome.id} className="flex gap-3 items-start">
              <span className="mt-1 text-[color:var(--color-accent-cyan)] select-none">&middot;</span>
              <span className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]">
                {outcome.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)] max-w-2xl">
          These are intended discussion outcomes, not guaranteed business outcomes.
        </p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 7: Create `src/components/site/speaking/BookConnection.tsx`**

```tsx
// src/components/site/speaking/BookConnection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function BookConnection() {
  return (
    <Section className="py-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <h2 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Start with the book. Continue with the conversation.
          </h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Every session draws from the ideas, frameworks, and honest questions in Be the Mirror. The book is a shared starting point &mdash; for individuals, teams, and leadership groups.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <Button href="/book" variant="primary">Explore the Book</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 8: Create `src/components/site/speaking/SpeakingAuthors.tsx`**

```tsx
// src/components/site/speaking/SpeakingAuthors.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { Button } from "@/components/ui/Button";
import { AUTHORS } from "@/content/authors";

export function SpeakingAuthors() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="speaking-authors-heading" align="left">
          The authors.
        </SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {AUTHORS.map((author) => (
            <AuthorCard key={author.slug} name={author.name} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/authors" variant="secondary">Meet the Authors</Button>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 9: Create `src/components/site/speaking/SpeakingFinalCTA.tsx`**

```tsx
// src/components/site/speaking/SpeakingFinalCTA.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function SpeakingFinalCTA() {
  return (
    <Section className="py-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <h2 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Let&rsquo;s start a conversation.
          </h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Whether you&rsquo;re planning a leadership event, an internal program, or an executive offsite, we&rsquo;re happy to explore what a conversation with Be the Mirror might look like for your organization.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <Button href="/contact?type=speaking" variant="primary">Invite the Authors</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 10: Create `src/app/speaking/page.tsx`**

```tsx
// src/app/speaking/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SpeakingHero } from "@/components/site/speaking/SpeakingHero";
import { WhyThisMatters } from "@/components/site/speaking/WhyThisMatters";
import { SpeakingTopics } from "@/components/site/speaking/SpeakingTopics";
import { SessionFormats } from "@/components/site/speaking/SessionFormats";
import { AudienceSection } from "@/components/site/speaking/AudienceSection";
import { TakeAways } from "@/components/site/speaking/TakeAways";
import { BookConnection } from "@/components/site/speaking/BookConnection";
import { SpeakingAuthors } from "@/components/site/speaking/SpeakingAuthors";
import { SpeakingFinalCTA } from "@/components/site/speaking/SpeakingFinalCTA";

export const metadata: Metadata = {
  title: "Speaking & Workshops | Be the Mirror",
  description:
    "Explore speaking sessions and workshops from Be the Mirror for leaders, change agents and organizations navigating transformation in an AI-driven world.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      <Header />
      <main id="main">
        <SpeakingHero />
        <WhyThisMatters />
        <SpeakingTopics />
        <SessionFormats />
        <AudienceSection />
        <TakeAways />
        <BookConnection />
        <SpeakingAuthors />
        <SpeakingFinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 11: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; `/speaking` present in route list.

- [ ] **Step 12: Commit**

```bash
git add src/components/site/speaking/ src/app/speaking/page.tsx
git commit -m "feat(speaking): /speaking page + section components"
```

---


## Task 6: `/contact` page + sections

**Files:**
- Create: `src/components/site/contact/ContactHero.tsx`
- Create: `src/components/site/contact/ContactOptions.tsx`
- Create: `src/components/site/contact/ContactSection.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- All section components are Server Components; `ContactSection` wraps the `InquiryForm` client component.
- Consumes: `InquiryForm` from `@/components/site/contact/InquiryForm`, `coerceEnquiryType` + `EnquiryType` from `@/lib/enquiry`, Phase 1–4 primitives.

- [ ] **Step 1: Create `src/components/site/contact/ContactHero.tsx`**

```tsx
// src/components/site/contact/ContactHero.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

export function ContactHero() {
  return (
    <Section className="pt-[var(--spacing-section)] pb-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <p className="text-[length:var(--text-nav)] uppercase tracking-widest text-[color:var(--color-accent-cyan)] mb-4">
            Contact
          </p>
        </Reveal>
        <Reveal delayMs={100}>
          <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Start a conversation.
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Whether you&rsquo;re interested in a speaking engagement, a workshop, a media conversation, or simply want to reach out &mdash; we&rsquo;d love to hear from you.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/site/contact/ContactOptions.tsx`**

```tsx
// src/components/site/contact/ContactOptions.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

type ContactOptionCard = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const CONTACT_OPTIONS: readonly ContactOptionCard[] = [
  {
    title: "Speaking & Workshops",
    description:
      "Invite the authors to speak at your conference, leadership event, or executive offsite. We offer keynotes, workshops, panel participation, and virtual sessions.",
    ctaLabel: "Enquire about Speaking",
    ctaHref: "/contact?type=speaking#inquiry-form",
  },
  {
    title: "Media & Interviews",
    description:
      "Podcast appearances, editorial interviews, and media conversations about organizational transformation, AI adoption, and the ideas in Be the Mirror.",
    ctaLabel: "Enquire about Media",
    ctaHref: "/contact?type=media#inquiry-form",
  },
  {
    title: "General Enquiry",
    description:
      "For all other questions &mdash; about the book, bulk orders, or anything else &mdash; use the general enquiry form.",
    ctaLabel: "Send a General Enquiry",
    ctaHref: "/contact?type=general#inquiry-form",
  },
];

export function ContactOptions() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {CONTACT_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="flex flex-col gap-4 rounded-lg border border-[color:var(--color-border-subtle)] p-6"
            >
              <h2 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {option.title}
              </h2>
              <p
                className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] flex-1"
                dangerouslySetInnerHTML={{ __html: option.description }}
              />
              <a
                href={option.ctaHref}
                className="text-[length:var(--text-button)] text-[color:var(--color-accent-cyan)] hover:underline font-medium mt-auto"
              >
                {option.ctaLabel} &rarr;
              </a>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Create `src/components/site/contact/ContactSection.tsx`**

```tsx
// src/components/site/contact/ContactSection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/site/contact/InquiryForm";
import type { EnquiryType } from "@/lib/enquiry";

type ContactSectionProps = {
  defaultEnquiryType: EnquiryType;
};

export function ContactSection({ defaultEnquiryType }: ContactSectionProps) {
  return (
    <Section id="inquiry-form" className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading eyebrow="Get in touch" id="inquiry-form-heading" align="left">
          Tell us about your inquiry.
        </SectionHeading>
        <div className="mt-10 max-w-2xl">
          <InquiryForm defaultEnquiryType={defaultEnquiryType} />
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Create `src/app/contact/page.tsx`**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactHero } from "@/components/site/contact/ContactHero";
import { ContactOptions } from "@/components/site/contact/ContactOptions";
import { ContactSection } from "@/components/site/contact/ContactSection";
import { coerceEnquiryType } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "Contact | Be the Mirror",
  description:
    "Contact the Be the Mirror authors about speaking, workshops, media, events and conversations about organizational transformation and change.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const defaultEnquiryType = coerceEnquiryType(typeParam);

  return (
    <>
      <Header />
      <main id="main">
        <ContactHero />
        <ContactOptions />
        <ContactSection defaultEnquiryType={defaultEnquiryType} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; `/contact` present in route list.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/contact/ContactHero.tsx src/components/site/contact/ContactOptions.tsx src/components/site/contact/ContactSection.tsx src/app/contact/page.tsx
git commit -m "feat(contact): /contact page + sections wrapping InquiryForm"
```

---

## Task 7: Cross-page CTA cleanup + footer completion

**Files to modify** (Read + Edit each; implementer inspects exact current content before editing):
- `src/components/site/Footer.tsx`
- `src/components/site/sections/FinalCTA.tsx`
- `src/components/site/authors/AuthorsCollectiveCTA.tsx`
- `src/components/site/book/BookFinalCTA.tsx`
- Final section on `/ideas` (inspect `src/components/site/ideas/` — likely `IdeasFinalCTA.tsx` or bottom of `MirrorMomentsPreview.tsx`)
- Final section on `/resources` (inspect `src/components/site/resources/` — likely `ResourceGrid.tsx` or similar)

**Interfaces:**
- No new components. All changes are additive: one anchor or small link element per file.
- Consumes: `PURCHASE_URL` from `@/config/site`, `Button` from `@/components/ui/Button`.

- [ ] **Step 1: Modify `src/components/site/Footer.tsx`**

Read the file first, then apply two edits:

**Edit A** — In the tagline column, after the tagline `<p>` element, add:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-accent-cyan)] transition-colors"
>
  Bring Be the Mirror to your organization
</a>
```

**Edit B** — Above the copyright divider row, add a centered CTA row:
```tsx
<div className="flex justify-center py-8 border-t border-[color:var(--color-border-subtle)]">
  <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
</div>
```

Ensure `PURCHASE_URL` is imported from `@/config/site` and `Button` is imported from `@/components/ui/Button` (add imports if missing). Remove any `<span aria-disabled="true">` placeholder Privacy/Terms links if present.

- [ ] **Step 2: Modify `src/components/site/sections/FinalCTA.tsx`**

Read the file, then add ONE tertiary text link below the existing buttons:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
>
  Bring Be the Mirror to your organization &rarr;
</a>
```

- [ ] **Step 3: Modify `src/components/site/authors/AuthorsCollectiveCTA.tsx`**

Read the file, then add ONE tertiary text link below the existing button pair:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
>
  Invite the Authors &rarr;
</a>
```

- [ ] **Step 4: Modify `src/components/site/book/BookFinalCTA.tsx`**

Read the file, then add ONE tertiary text link below the existing buttons:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
>
  Invite the Authors &rarr;
</a>
```

- [ ] **Step 5: Add speaking CTA to `/ideas` final section**

Inspect `src/components/site/ideas/` to find the last section rendered on the `/ideas` page. Add ONE tertiary link inside that section's container, after existing content:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
>
  Take the conversation further &rarr; Speaking &amp; Workshops
</a>
```

- [ ] **Step 6: Add speaking CTA to `/resources` final section**

Inspect `src/components/site/resources/` to find the last section rendered on the `/resources` page. Add ONE tertiary link inside that section's container, after the grid:
```tsx
<a
  href="/speaking"
  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
>
  Need to explore these ideas with your team? &rarr; Explore workshops
</a>
```

- [ ] **Step 7: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/site/Footer.tsx src/components/site/sections/FinalCTA.tsx src/components/site/authors/AuthorsCollectiveCTA.tsx src/components/site/book/BookFinalCTA.tsx
git commit -m "feat(cross-link): site-wide Speaking CTAs + footer completion"
```

---

## Task 8: `not-found` page + phase-5 docs

**Files:**
- Create: `src/app/not-found.tsx`
- Create or append: `docs/phases.md`

**Interfaces:**
- `not-found.tsx` is a Server Component.
- `docs/phases.md` is a factual record of Phase 5 completion.

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
// src/app/not-found.tsx
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <Section className="py-[var(--spacing-section)]">
          <Container>
            <div className="flex flex-col items-center text-center gap-6 max-w-lg mx-auto">
              <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)]">
                Not everything goes to plan.
              </h1>
              <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
                Neither does transformation. Return to Be the Mirror.
              </p>
              <Button href="/" variant="primary">Back to Home</Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `docs/phases.md`**

Contents:

```md
# Be the Mirror — Phase Completion Log

## Phase 5 (2026-09-18)

### Routes added
- `/speaking` — Speaking & Workshops page
- `/contact` — Contact page with pre-selectable enquiry type via `?type=` query param
- `not-found` — Custom 404 page (`src/app/not-found.tsx`)

### Components added
- `src/components/ui/FormField.tsx`
- `src/components/ui/TextField.tsx`
- `src/components/ui/TextArea.tsx`
- `src/components/ui/SelectField.tsx`
- `src/components/ui/FormMessage.tsx`
- `src/components/ui/FormSuccess.tsx`
- `src/components/site/contact/InquiryForm.tsx` (only new `"use client"` in Phase 5)
- `src/components/site/contact/ContactHero.tsx`
- `src/components/site/contact/ContactOptions.tsx`
- `src/components/site/contact/ContactSection.tsx`
- `src/components/site/speaking/SpeakingHero.tsx`
- `src/components/site/speaking/WhyThisMatters.tsx`
- `src/components/site/speaking/SpeakingTopics.tsx`
- `src/components/site/speaking/SessionFormats.tsx`
- `src/components/site/speaking/AudienceSection.tsx`
- `src/components/site/speaking/TakeAways.tsx`
- `src/components/site/speaking/BookConnection.tsx`
- `src/components/site/speaking/SpeakingAuthors.tsx`
- `src/components/site/speaking/SpeakingFinalCTA.tsx`

### Server Action + Adapter architecture
- Server Action: `src/app/actions/submit-enquiry.ts` — validates form data with a hand-rolled validator (no Zod), calls the adapter.
- Adapter: `src/lib/enquiry-adapter.ts` — default implementation logs to server console and returns `{ ok: true, delivered: false, reason: "no-provider-configured" }`. The UI honors `delivered: false` and shows a development-safe success state that does NOT claim email delivery.
- Future integration point: replace `submitEnquiry` in `src/lib/enquiry-adapter.ts` with a server-side email provider call using credentials from `process.env`. Never expose credentials to the browser.

### Env vars required
None at this time. No env vars are required to run Phase 5. The adapter works without any configuration and honestly reports `delivered: false`.

### Known gaps / deferred
- `PURCHASE_URL` in `src/config/site.ts` is still `"#"`. A real purchase URL must be set before launch.
- Email delivery is not configured. Wire `src/lib/enquiry-adapter.ts` to a real provider before launch.

### Phase boundary
**Phase 5 is the current implementation stopping point. Do not begin Phase 6.**
```

- [ ] **Step 3: Type-check + lint + build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: 0 errors; not-found page included in build output.

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx docs/phases.md
git commit -m "feat(v1): not-found page + phase-5 docs"
```

---

## Task 9: Full validation pass (tsc + lint + build + dev-server smoke)

No code changes. Runs the Phase 5 validation gate.

- [ ] **Step 1: Full build check**

Run: `npx tsc --noEmit && npm run lint && npm run build`

Expected: 0 errors. Build output must list these routes:
- `/` (home)
- `/book`
- `/authors`
- `/ideas`
- `/ideas/[slug]` — 6 prerendered pages (`why-people-resist-change`, `technology-can-change-faster-than-organizations`, `before-another-framework-look-in-the-mirror`, `change-agents-dont-need-to-control-everything`, `ai-adoption-is-an-organizational-change-problem`, `transformation-intent-vs-experience`)
- `/resources`
- `/speaking`
- `/contact`
- `not-found` page

- [ ] **Step 2: Dev-server smoke test**

Start the dev server and curl-HEAD every route, expecting `HTTP/1.1 200` for each:

```bash
npm run dev &
sleep 5
for path in "/" "/book" "/authors" "/ideas" "/ideas/why-people-resist-change" "/resources" "/speaking" "/contact" "/contact?type=speaking"; do
  echo -n "HEAD $path: "
  curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${path}"
  echo
done
```

- [ ] **Step 3: Content grep smoke**

Verify key strings are present in rendered HTML:

```bash
# /speaking
curl -s http://localhost:3000/speaking | grep -c "Bring Be the Mirror into the conversation"
curl -s http://localhost:3000/speaking | grep -c "Session Topics"
curl -s http://localhost:3000/speaking | grep -c "How we can engage"
curl -s http://localhost:3000/speaking | grep -c "Who these conversations are for"
curl -s http://localhost:3000/speaking | grep -c "Start with the book"
curl -s http://localhost:3000/speaking | grep -c "Invite the Authors"

# /contact
curl -s http://localhost:3000/contact | grep -c "Start a conversation"
curl -s http://localhost:3000/contact | grep -c "Speaking"
curl -s http://localhost:3000/contact | grep -c "Media"
curl -s http://localhost:3000/contact | grep -c "General Enquiry"
curl -s http://localhost:3000/contact | grep -c "We will use the information you provide only to respond"

# / (home — FinalCTA tertiary link)
curl -s http://localhost:3000/ | grep -c "Bring Be the Mirror to your organization"
```

All counts must be ≥ 1.

- [ ] **Step 4: Validation complete — no commit required**

Task 9 is verification only. If any check fails, return to the relevant task and fix before re-running.

---
