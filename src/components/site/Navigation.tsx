// src/components/site/Navigation.tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Navigation() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-disabled={!item.live || undefined}
              className={cn(
                "text-[length:var(--text-nav)] tracking-wide text-[color:var(--color-fg-secondary)]",
                "transition-colors duration-200 hover:text-[color:var(--color-fg-primary)]",
                !item.live && "cursor-not-allowed opacity-70"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
