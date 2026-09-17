import Link from "next/link";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string; description: string };

type Props = { items: readonly Item[]; className?: string };

export function ContinueExploring({ items, className }: Props) {
  return (
    <nav
      aria-label="Continue exploring"
      className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex flex-col rounded-2xl border border-[color:var(--color-border-subtle)] p-6 transition-colors duration-300 hover:border-[color:var(--color-accent-cyan)]"
        >
          <span className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
            {item.label}
          </span>
          <span className="mt-3 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
            {item.description}
          </span>
        </Link>
      ))}
    </nav>
  );
}
