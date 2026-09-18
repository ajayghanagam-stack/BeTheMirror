// src/components/site/speaking/AudienceSection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCE_GROUPS } from "@/content/speaking";

export function AudienceSection() {
  return (
    <Section aria-labelledby="audience-heading" className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading id="audience-heading" align="left">
          Who these conversations are for.
        </SectionHeading>
        <div className="mt-8 flex flex-wrap gap-3">
          {AUDIENCE_GROUPS.map((group) => (
            <span
              key={group.id}
              className="rounded-full border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] px-4 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]"
            >
              {group.label}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
