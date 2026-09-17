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
