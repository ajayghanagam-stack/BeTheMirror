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
