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
