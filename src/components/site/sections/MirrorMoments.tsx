import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MirrorMoment } from "@/components/ui/MirrorMoment";
import { Reveal } from "@/components/motion/Reveal";

export function MirrorMoments() {
  return (
    <Section
      aria-labelledby="moments-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 06" id="moments-title" className="max-w-3xl">
            Mirror Moments
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Short reflections for people leading change.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal delayMs={0}>
            <MirrorMoment index={1}>
              &ldquo;We often ask why people resist change.
              <br />
              <br />
              A better question may be:
              <br />
              <br />
              <span className="text-[color:var(--color-accent-yellow)]">
                What about the change made resistance rational?
              </span>
              &rdquo;
            </MirrorMoment>
          </Reveal>
          <Reveal delayMs={120}>
            <MirrorMoment index={2}>
              &ldquo;Technology can change in months.
              <br />
              <br />
              Organizations rarely do.&rdquo;
            </MirrorMoment>
          </Reveal>
          <Reveal delayMs={240}>
            <MirrorMoment index={3}>
              &ldquo;Transformation isn&rsquo;t what leadership announces.
              <br />
              <br />
              It&rsquo;s what people experience.&rdquo;
            </MirrorMoment>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
