import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AUTHORS } from "@/content/authors";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE_NAME, SITE_TAGLINE, PURCHASE_URL } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              {SITE_NAME}
            </p>
            <p className="mt-4 max-w-md text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              {SITE_TAGLINE}
            </p>
            <a
              href="/speaking"
              className="mt-4 inline-block text-[length:var(--text-small)] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-accent-cyan)] transition-colors"
            >
              Bring Be the Mirror to your organization
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_ITEMS.filter((i) => i.label !== "Home").map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-disabled={!item.live || undefined}
                    className={
                      "text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg-primary)] " +
                      (!item.live ? "cursor-not-allowed opacity-70" : "")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Authors
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {AUTHORS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href="/authors"
                    className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg-primary)]"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center py-8 border-t border-[color:var(--color-border-subtle)]">
          <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
        </div>

        <div className="flex flex-col gap-4 border-t border-[color:var(--color-border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
