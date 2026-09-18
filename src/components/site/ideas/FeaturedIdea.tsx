import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedIdeaCard } from "@/components/ui/FeaturedIdeaCard";
import { getFeaturedIdea } from "@/content/ideas";

export function FeaturedIdea() {
  const featured = getFeaturedIdea();
  if (!featured) return null;
  return (
    <Section
      aria-labelledby="featured-idea-heading"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <h2 id="featured-idea-heading" className="sr-only">
          Featured Idea
        </h2>
        <Reveal>
          <FeaturedIdeaCard meta={featured.meta} />
        </Reveal>
      </Container>
    </Section>
  );
}
