// src/components/site/speaking/WhyThisMatters.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyThisMatters() {
  return (
    <Section aria-labelledby="why-this-matters" className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <SectionHeading id="why-this-matters" align="left">
          Transformation is not just a strategy conversation.
        </SectionHeading>
        <div className="mt-6 max-w-2xl text-[color:var(--color-fg-secondary)] text-[length:var(--text-body-lg)]" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
          <p className="mb-4">
            Most transformation efforts focus on the strategy, the technology, or the process. The harder part &mdash; the part that determines whether change actually takes hold &mdash; is the human part.
          </p>
          <p className="mb-6">
            These conversations are for organizations that want to look honestly at how change is experienced, not just how it is communicated.
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              "Why people resist change &mdash; and when resistance is rational.",
              "How AI adoption is as much an organizational challenge as a technical one.",
              "The gap between transformation intent and transformation experience.",
              "How change agents create influence without formal authority.",
              "What leaders can do before reaching for another framework.",
              "How to move from transformation fatigue to transformation ownership.",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-1 text-[color:var(--color-accent-cyan)] select-none">&middot;</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
