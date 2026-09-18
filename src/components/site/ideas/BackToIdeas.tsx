import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function BackToIdeas() {
  return (
    <Section aria-label="Back to Ideas" className="border-t border-[color:var(--color-border-subtle)]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-accent-cyan)]"
          >
            &larr; Back to Ideas
          </Link>
        </div>
      </Container>
    </Section>
  );
}
