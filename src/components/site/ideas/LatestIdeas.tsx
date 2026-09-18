import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IdeaCard } from "@/components/ui/IdeaCard";
import { IDEAS, getFeaturedIdea } from "@/content/ideas";

export function LatestIdeas() {
  const featured = getFeaturedIdea();
  const rest = IDEAS.filter((i) => i.meta.slug !== featured?.meta.slug);
  return (
    <Section
      aria-labelledby="latest-ideas-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Latest" id="latest-ideas-title" className="max-w-3xl">
            Latest Ideas
          </SectionHeading>
        </Reveal>
        {rest.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              More Ideas coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((i, idx) => (
              <Reveal key={i.meta.slug} delayMs={80 * (idx % 3)}>
                <IdeaCard meta={i.meta} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
