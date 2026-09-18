// src/components/site/speaking/SpeakingHero.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function SpeakingHero() {
  return (
    <Section className="pt-[var(--spacing-section)] pb-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <p className="text-[length:var(--text-nav)] uppercase tracking-widest text-[color:var(--color-accent-cyan)] mb-4">
            Speaking &amp; Workshops
          </p>
        </Reveal>
        <Reveal delayMs={100}>
          <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-3xl">
            Bring Be the Mirror into the conversation.
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-2xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            The authors of Be the Mirror speak, facilitate, and work with leadership teams, transformation offices, and organizations navigating change in an AI-driven world.
          </p>
        </Reveal>
        <Reveal delayMs={300}>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact?type=speaking" variant="primary">Invite the Authors</Button>
            <Button href="#session-topics" variant="secondary">Explore Session Topics</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
