// src/components/site/speaking/TakeAways.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OUTCOMES } from "@/content/speaking";

export function TakeAways() {
  return (
    <Section aria-labelledby="takeaways-heading" className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="takeaways-heading" align="left">
          What participants take away.
        </SectionHeading>
        <ul className="mt-8 flex flex-col gap-4 max-w-2xl">
          {OUTCOMES.map((outcome) => (
            <li key={outcome.id} className="flex gap-3 items-start">
              <span className="mt-1 text-[color:var(--color-accent-cyan)] select-none">&middot;</span>
              <span className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]">
                {outcome.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)] max-w-2xl">
          These are intended discussion outcomes, not guaranteed business outcomes.
        </p>
      </Container>
    </Section>
  );
}
