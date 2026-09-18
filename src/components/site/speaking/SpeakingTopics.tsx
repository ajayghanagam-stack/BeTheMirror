// src/components/site/speaking/SpeakingTopics.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SESSION_TOPICS } from "@/content/speaking";

export function SpeakingTopics() {
  return (
    <Section id="session-topics" aria-labelledby="session-topics-heading" className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading eyebrow="Session Topics" id="session-topics-heading" align="left">
          Conversations we can bring to your organization.
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SESSION_TOPICS.map((topic) => (
            <div
              key={topic.slug}
              className="flex flex-col gap-3 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)] p-6"
            >
              <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {topic.title}
              </h3>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-accent-cyan)] font-medium">
                {topic.oneLiner}
              </p>
              <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] flex-1">
                {topic.description}
              </p>
              {topic.relatedIdeaSlug && (
                <a
                  href={`/ideas/${topic.relatedIdeaSlug}`}
                  className="text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline mt-auto"
                >
                  Read the idea &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
