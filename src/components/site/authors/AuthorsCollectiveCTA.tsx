import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function AuthorsCollectiveCTA() {
  return (
    <Section
      bleed="full"
      aria-labelledby="authors-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Together
            </p>
            <h2
              id="authors-cta-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              The conversation continues.
            </h2>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Explore the ideas behind Be the Mirror and the questions shaping transformation in an
              AI-driven world.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="primary">Explore the Book</Button>
              <Button href="/ideas" variant="secondary">Explore the Ideas</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
