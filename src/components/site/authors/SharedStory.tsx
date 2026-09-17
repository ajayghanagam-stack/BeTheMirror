import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function SharedStory() {
  return (
    <Section
      aria-labelledby="shared-story-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Together" id="shared-story-title" className="max-w-md">
              Why we wrote this together
            </SectionHeading>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                Be the Mirror brings together three perspectives shaped by working with people and
                organizations navigating change.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                While experiences may differ, the underlying lesson is consistent: lasting
                transformation requires more than new technology, processes or organizational
                structures.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                It requires understanding people.
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                The book brings those perspectives together around one idea:
              </p>
            </Reveal>
            <Reveal delayMs={340}>
              <p
                className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-accent-yellow)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Sometimes the most valuable thing a change agent can do is help an organization see
                itself more clearly.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
