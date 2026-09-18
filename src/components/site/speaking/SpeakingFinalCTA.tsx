// src/components/site/speaking/SpeakingFinalCTA.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function SpeakingFinalCTA() {
  return (
    <Section className="py-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <h2 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)] mb-6 max-w-2xl">
            Let&rsquo;s start a conversation.
          </h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)] mb-8 max-w-xl" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
            Whether you&rsquo;re planning a leadership event, an internal program, or an executive offsite, we&rsquo;re happy to explore what a conversation with Be the Mirror might look like for your organization.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <Button href="/contact?type=speaking" variant="primary">Invite the Authors</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
