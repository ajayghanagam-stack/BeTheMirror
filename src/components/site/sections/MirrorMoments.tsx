import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MirrorMomentCard } from "@/components/ui/MirrorMomentCard";
import { MIRROR_MOMENTS } from "@/content/mirror-moments";

export function MirrorMoments() {
  const featured = MIRROR_MOMENTS.filter((m) => m.featured).slice(0, 3);
  return (
    <Section
      id="ideas"
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
          {featured.map((moment, i) => (
            <Reveal key={moment.id} delayMs={120 * i}>
              <MirrorMomentCard moment={moment} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={360}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/ideas" variant="secondary">Explore more Ideas</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
