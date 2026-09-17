import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function CentralQuestion() {
  return (
    <Section
      aria-label="Central question"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl py-10 md:py-16">
          <Reveal>
            <p
              className="font-semibold leading-[1.15] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Transformation asks organizations to change.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <p
              className="mt-8 leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-secondary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              But how often do the people leading transformation examine what they may need to
              change themselves?
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="mt-12 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-accent-yellow)]">
              That is the idea behind Be the Mirror.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
