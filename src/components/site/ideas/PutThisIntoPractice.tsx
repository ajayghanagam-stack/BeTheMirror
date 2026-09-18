import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { getResource } from "@/content/resources";

type Props = { resourceSlug?: string };

export function PutThisIntoPractice({ resourceSlug }: Props) {
  if (!resourceSlug) return null;
  const resource = getResource(resourceSlug);
  if (!resource) return null;
  return (
    <Section
      aria-labelledby="practice-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Take it further" id="practice-title">
              Put this idea into practice
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10">
              <ResourceCard resource={resource} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
