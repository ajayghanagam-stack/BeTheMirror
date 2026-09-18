import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getCategories } from "@/content/ideas";

export function ExploreByTheme() {
  const categories = getCategories();
  return (
    <Section
      aria-labelledby="explore-by-theme-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Explore" id="explore-by-theme-title" className="max-w-3xl">
            Explore by theme
          </SectionHeading>
        </Reveal>
        {categories.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Themes will appear once more Ideas are published.
            </p>
          </Reveal>
        ) : (
          <Reveal delayMs={100}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {categories.map(({ category, count }) => (
                <li key={category}>
                  <span
                    className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border-subtle)] px-4 py-2 text-[length:var(--text-small)] text-[color:var(--color-fg-primary)]"
                  >
                    {category}
                    <span className="text-[color:var(--color-fg-muted)]">/ {String(count).padStart(2, "0")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
