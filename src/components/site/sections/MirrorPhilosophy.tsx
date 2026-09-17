import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const IDEAS = [
  "It means questioning assumptions.",
  "Listening before prescribing.",
  "Understanding resistance rather than dismissing it.",
  "Recognizing how leadership behaviour shapes change.",
  "Creating trust.",
  "Surfacing uncomfortable realities.",
  "Helping teams see the difference between intention and experience.",
  "And being willing to examine our own role in the transformation.",
];

export function MirrorPhilosophy() {
  return (
    <Section
      aria-labelledby="philosophy-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <SectionHeading eyebrow="Section 04" id="philosophy-title">
                Don&rsquo;t just manage change.
                <br />
                <span className="text-[color:var(--color-accent-yellow)]">Be the mirror.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-8 max-w-md text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                Being the mirror means helping people and organizations see what they may not
                easily see themselves.
              </p>
            </Reveal>
          </div>

          <ul className="space-y-6 border-l border-[color:var(--color-accent-cyan-soft)] pl-6">
            {IDEAS.map((idea, i) => (
              <Reveal as="li" key={idea} delayMs={60 * i}>
                <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                  {idea}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
