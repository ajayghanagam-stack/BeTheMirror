import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Block = { role: string; question: string };

const BLOCKS: Block[] = [
  { role: "For leaders asking:", question: "Why isn\u2019t our transformation working?" },
  { role: "For technology leaders asking:", question: "Why isn\u2019t adoption following implementation?" },
  { role: "For managers asking:", question: "How do I help my team navigate change?" },
  { role: "For change agents asking:", question: "How do I influence change when I don\u2019t control everything?" },
  { role: "For AI leaders asking:", question: "How do we make AI adoption an organizational capability?" },
  { role: "For transformation professionals asking:", question: "How do we make change sustainable after the program ends?" },
];

export function WhoIsThisFor() {
  return (
    <Section
      aria-labelledby="audience-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 05" id="audience-title" className="max-w-3xl">
            Who is this book for?
          </SectionHeading>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
          {BLOCKS.map((b, i) => (
            <Reveal as="li" key={b.role} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                  {b.role}
                </p>
                <p
                  className="mt-5 max-w-lg font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  &ldquo;{b.question}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
