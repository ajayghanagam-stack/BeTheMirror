// src/components/site/Header.tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";
import { Button } from "@/components/ui/Button";
import { PURCHASE_URL } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-[color:var(--color-bg-primary)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/55">
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="text-[length:var(--text-nav)] font-semibold tracking-[0.22em] uppercase text-[color:var(--color-fg-primary)]"
        >
          Be the Mirror
        </Link>

        <div className="flex items-center gap-8">
          <Navigation />
          <div className="hidden lg:block">
            <Button href={PURCHASE_URL} variant="primary">
              Buy the Book
            </Button>
          </div>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
