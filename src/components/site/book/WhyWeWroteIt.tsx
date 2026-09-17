import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const FOCUS = ["Technology", "Process", "Frameworks", "Programs", "Governance", "Tools", "AI"] as const;
const ADDS  = ["Leadership", "Trust", "Behaviour", "Communication", "Culture", "Resistance", "Ownership", "Learning"] as const;

export function WhyWeWroteIt() {
  return (
    <Section
      id="why-we-wrote-it"
      aria-labelledby="why-we-wrote-it-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 03" id="why-we-wrote-it-title" className="max-w-3xl">
            Why Be the Mirror?
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
              Transformation discussions often focus on
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {FOCUS.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-[color:var(--color-border-subtle)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]"
                >
                  {word}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
              But successful transformation also depends on
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {ADDS.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-[color:var(--color-accent-cyan-soft)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]"
                >
                  {word}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 max-w-3xl">
          <Reveal delayMs={80}>
            <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
              Organizations rarely struggle with transformation because they lack another framework.
            </p>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              The harder challenge is helping people understand change, trust it, participate in it
              and eventually make it their own.
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror brings the conversation back to the human realities of transformation.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
