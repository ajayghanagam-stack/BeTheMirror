// src/components/site/speaking/SessionFormats.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENGAGEMENT_FORMATS } from "@/content/speaking";

export function SessionFormats() {
  return (
    <Section aria-labelledby="session-formats-heading" className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="session-formats-heading" align="left">
          How we can engage.
        </SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ENGAGEMENT_FORMATS.map((format) => (
            <div
              key={format.id}
              className="flex flex-col gap-2 rounded-lg border border-[color:var(--color-border-subtle)] p-6"
            >
              <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {format.label}
              </h3>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]">
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
