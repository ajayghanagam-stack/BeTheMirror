// src/components/site/contact/ContactHero.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

export function ContactHero() {
  return (
    <Section className="pt-[var(--spacing-section)] pb-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <p className="text-[length:var(--text-nav)] uppercase tracking-widest text-[color:var(--color-accent-cyan)] mb-4">
            Contact
          </p>
        </Reveal>
        <Reveal delayMs={100}>
          <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Start a conversation.
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Whether you&rsquo;re interested in a speaking engagement, a workshop, a media conversation, or simply want to reach out &mdash; we&rsquo;d love to hear from you.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
