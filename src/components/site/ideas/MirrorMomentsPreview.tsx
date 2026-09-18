import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MirrorMomentCard } from "@/components/ui/MirrorMomentCard";
import { MIRROR_MOMENTS } from "@/content/mirror-moments";

export function MirrorMomentsPreview() {
  const featured = MIRROR_MOMENTS.filter((m) => m.featured).slice(0, 3);
  return (
    <Section
      aria-labelledby="mirror-moments-preview-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Mirror Moments" id="mirror-moments-preview-title" className="max-w-3xl">
            Short reflections for people leading change
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((moment, i) => (
            <Reveal key={moment.id} delayMs={100 * i}>
              <MirrorMomentCard moment={moment} index={i + 1} />
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={300}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/#ideas" variant="secondary">View more Mirror Moments</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
