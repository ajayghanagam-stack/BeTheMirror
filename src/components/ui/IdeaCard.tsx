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
