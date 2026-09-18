// src/components/site/speaking/BookConnection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function BookConnection() {
  return (
    <Section className="py-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <h2 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Start with the book. Continue with the conversation.
          </h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Every session draws from the ideas, frameworks, and honest questions in Be the Mirror. The book is a shared starting point &mdash; for individuals, teams, and leadership groups.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <Button href="/book" variant="primary">Explore the Book</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
