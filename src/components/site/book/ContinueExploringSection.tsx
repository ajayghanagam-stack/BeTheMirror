import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContinueExploring } from "@/components/ui/ContinueExploring";

export function ContinueExploringSection() {
  return (
    <Section
      aria-labelledby="continue-exploring-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading eyebrow="Continue" id="continue-exploring-title">
              Continue exploring
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10">
              <ContinueExploring
                items={[
                  {
                    label: "Ideas",
                    href: "/ideas",
                    description:
                      "Reflections on leading change \u2014 practical writing for leaders, managers and change agents.",
                  },
                  {
                    label: "Resources",
                    href: "/resources",
                    description:
                      "Tools, checklists and guides for turning reflection into action.",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
