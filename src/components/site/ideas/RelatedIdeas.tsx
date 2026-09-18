import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IdeaCard } from "@/components/ui/IdeaCard";
import { getRelatedIdeas } from "@/content/ideas";

type Props = { slug: string };

export function RelatedIdeas({ slug }: Props) {
  const related = getRelatedIdeas(slug, 3);
  if (related.length === 0) return null;
  return (
    <Section
      aria-labelledby="related-ideas-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Related" id="related-ideas-title" className="max-w-3xl">
            More Ideas to explore
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((i, idx) => (
            <Reveal key={i.meta.slug} delayMs={100 * idx}>
              <IdeaCard meta={i.meta} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
