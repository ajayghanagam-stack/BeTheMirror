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
