import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const QUESTIONS = [
  "What changes?",
  "Who benefits?",
  "What becomes uncertain?",
  "What skills are required?",
  "What happens to trust?",
  "How do people participate rather than simply comply?",
] as const;

export function AIWorld() {
  return (
    <Section
      aria-labelledby="ai-world-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Section 07" id="ai-world-title" className="max-w-md">
              Transformation in an AI world
            </SectionHeading>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
                AI can accelerate technology change dramatically.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-4 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-accent-yellow)]">
                It does not automatically accelerate human adoption.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                As organizations introduce AI into everyday work, leaders face questions that are
                deeply human:
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <ol className="mt-6 flex flex-col gap-3">
                {QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-4 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                    <span aria-hidden="true" className="w-8 shrink-0 text-[length:var(--text-small)] font-semibold tracking-[0.2em] uppercase text-[color:var(--color-accent-cyan)]">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delayMs={380}>
              <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                This is where transformation leadership matters.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
