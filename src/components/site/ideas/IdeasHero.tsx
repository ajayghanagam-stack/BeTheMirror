import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function IdeasHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="ideas-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Ideas
            </p>
            <h1
              id="ideas-hero-title"
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">Reflections on</span>
              <span className="block text-[color:var(--color-accent-yellow)]">leading change.</span>
            </h1>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Transformation rarely follows the plan exactly. Ideas is where we explore the
              questions, behaviours and lessons that shape how change is actually experienced.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
