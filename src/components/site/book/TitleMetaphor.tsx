import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MetaphorVisual } from "./MetaphorVisual";

const SURFACES = [
  "assumptions,",
  "behaviours,",
  "disconnects,",
  "resistance,",
  "unintended consequences,",
  "and the gap between what leaders intend and what people experience.",
] as const;

export function TitleMetaphor() {
  return (
    <Section
      aria-labelledby="title-metaphor-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Section 04" id="title-metaphor-title">
              Why &ldquo;Be the Mirror&rdquo;?
            </SectionHeading>
            <div className="mt-10">
              <MetaphorVisual />
              <p className="mt-4 text-[length:var(--text-small)] uppercase tracking-[0.28em] text-[color:var(--color-fg-muted)]">
                Fracture <span aria-hidden="true">&rarr;</span> Reflection <span aria-hidden="true">&rarr;</span> Light
              </p>
            </div>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[length:var(--text-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]">
                A mirror does not make the decision for us.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-4 text-[length:var(--text-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-accent-yellow)]">
                It helps us see.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                Change agents often play the same role.
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                They surface what may be difficult to see:
              </p>
            </Reveal>
            <Reveal delayMs={340}>
              <ul className="mt-4 flex flex-col gap-2 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                {SURFACES.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
            <Reveal delayMs={420}>
              <p className="mt-10 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                But being the mirror also requires looking inward.
              </p>
            </Reveal>
            <Reveal delayMs={480}>
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                The most effective change agents are willing to examine their own assumptions and
                behaviour as well.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
