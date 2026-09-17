import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { className?: string; children: ReactNode };

export function MirrorQuestion({ className, children }: Props) {
  return (
    <aside
      aria-label="Mirror question"
      className={cn(
        "my-14 rounded-2xl border p-8 md:p-10",
        "border-[color:var(--color-accent-cyan-soft)] bg-[color:var(--color-bg-secondary)]",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
        Mirror Question
      </p>
      <p
        className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {children}
      </p>
    </aside>
  );
}
