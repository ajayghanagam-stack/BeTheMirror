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
