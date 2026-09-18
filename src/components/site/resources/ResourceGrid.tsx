import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { RESOURCES, type ResourceType } from "@/content/resources";

const TYPE_ORDER: readonly ResourceType[] = [
  "Checklist",
  "Assessment",
  "Discussion Guide",
  "Worksheet",
  "Framework",
  "Playbook",
];

export function ResourceGrid() {
  const rest = RESOURCES.filter((r) => !r.featured);
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    resources: rest.filter((r) => r.type === type),
  })).filter((g) => g.resources.length > 0);

  return (
    <Section
      aria-labelledby="resource-grid-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Library" id="resource-grid-title" className="max-w-3xl">
            More resources
          </SectionHeading>
        </Reveal>
        {grouped.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              More resources coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 flex flex-col gap-16">
            {grouped.map((group) => (
              <div key={group.type}>
                <Reveal>
                  <h3 className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    {group.type}
                  </h3>
                </Reveal>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.resources.map((r, i) => (
                    <Reveal key={r.slug} delayMs={80 * (i % 3)}>
                      <ResourceCard resource={r} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <Reveal delayMs={200}>
          <a
            href="/speaking"
            className="mt-10 inline-block text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
          >
            Need to explore these ideas with your team? &rarr; Explore workshops
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
