import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const FRAGMENTATION = [
  "Resistance",
  "Silos",
  "Fear",
  "Misalignment",
  "Fatigue",
  "Confusion",
  "Low ownership",
  "Technology without adoption",
];

const TRANSFORMATION = [
  "Clarity",
  "Trust",
  "Alignment",
  "Ownership",
  "Learning",
  "Adaptability",
  "Change agents",
  "Sustainable transformation",
];

export function FragmentationToTransformation() {
  return (
    <Section
      bleed="full"
      aria-labelledby="journey-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Section 03" id="journey-title">
              Transformation starts with reflection.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Before organizations can transform, they need to see clearly: what is working, what is
              not, how people are experiencing change, and what leaders themselves may need to do
              differently.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {/* LEFT — Fragmentation */}
          <Reveal className="relative order-1">
            <div className="relative border-l border-[color:var(--color-border-subtle)] pl-6">
              <span aria-hidden="true" className="absolute left-0 top-0 h-16 w-px bg-[color:var(--color-accent-cyan-soft)]" />
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-fg-muted)]">
                Fragmentation
              </p>
              <ul className="mt-6 space-y-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-muted)]">
                {FRAGMENTATION.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div aria-hidden="true" className="order-2 flex justify-center text-[color:var(--color-fg-muted)] lg:hidden">
            <span className="text-[length:var(--text-small)]">&darr;</span>
          </div>

          {/* CENTER — Reflection */}
          <Reveal className="order-3 lg:order-2" delayMs={100}>
            <div className="lg:pt-2 lg:text-center">
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
                Reflection
              </p>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                A pause to see what is actually happening &mdash; inside teams, inside leadership,
                inside ourselves.
              </p>
            </div>
          </Reveal>

          <div aria-hidden="true" className="order-4 flex justify-center text-[color:var(--color-fg-muted)] lg:hidden">
            <span className="text-[length:var(--text-small)]">&darr;</span>
          </div>

          {/* RIGHT — Transformation */}
          <Reveal className="order-5 lg:order-3" delayMs={200}>
            <div className="relative border-r border-[color:var(--color-border-subtle)] pr-6 lg:text-right">
              <span aria-hidden="true" className="absolute right-0 top-0 h-16 w-px bg-[color:var(--color-accent-cyan)]" />
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-yellow)]">
                Transformation
              </p>
              <ul className="mt-6 space-y-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-primary)]">
                {TRANSFORMATION.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
