import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Item = { title: string; body: string };

const ITEMS: Item[] = [
  { title: "Resistance", body: "What looks like resistance may actually be uncertainty, lack of trust or a rational response to previous change." },
  { title: "Misalignment", body: "Strategy on paper and behaviour on the ground rarely tell the same story." },
  { title: "Lack of trust", body: "Change asks people to move first; trust decides whether they do." },
  { title: "Transformation fatigue", body: "After enough programmes, another one feels like weather to wait out." },
  { title: "Silos", body: "Local incentives quietly outrun the shared direction." },
  { title: "Poor communication", body: "What is announced and what is understood are rarely the same message." },
  { title: "Fear of change", body: "Under uncertainty, protecting what works can look like resistance." },
  { title: "Technology-first thinking", body: "A tool without adoption is a cost, not a capability." },
  { title: "AI without adoption", body: "Models scale in months; the organizations using them do not." },
];

export function WhyTransformationsStruggle() {
  return (
    <Section
      aria-labelledby="why-struggle-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 02" id="why-struggle-title" className="max-w-3xl">
            Why transformations struggle
          </SectionHeading>
        </Reveal>

        <Reveal delayMs={100}>
          <p className="mt-8 max-w-3xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Transformation rarely fails because people don&rsquo;t understand the strategy.
          </p>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-4 max-w-3xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            It often struggles because the organization experiences the change differently from the
            way leadership intended it.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.title} delayMs={80 * (i % 3)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-5">
                <h3 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
