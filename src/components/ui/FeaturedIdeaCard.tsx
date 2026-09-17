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
