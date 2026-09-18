// src/components/site/speaking/SpeakingAuthors.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { Button } from "@/components/ui/Button";
import { AUTHORS } from "@/content/authors";

export function SpeakingAuthors() {
  return (
    <Section aria-labelledby="speaking-authors-heading" className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="speaking-authors-heading" align="left">
          The authors.
        </SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {AUTHORS.map((author) => (
            <AuthorCard key={author.slug} name={author.name} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/authors" variant="secondary">Meet the Authors</Button>
        </div>
      </Container>
    </Section>
  );
}
