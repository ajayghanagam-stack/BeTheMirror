import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MirrorQuestion } from "@/components/ui/MirrorQuestion";
import { ArticleHeader } from "@/components/site/ideas/ArticleHeader";
import { RelatedIdeas } from "@/components/site/ideas/RelatedIdeas";
import { PutThisIntoPractice } from "@/components/site/ideas/PutThisIntoPractice";
import { BackToIdeas } from "@/components/site/ideas/BackToIdeas";
import { IDEAS, getIdea } from "@/content/ideas";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return IDEAS.map((i) => ({ slug: i.meta.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return { title: "Idea not found | Be the Mirror" };
  return {
    title: `${idea.meta.title} | Be the Mirror`,
    description: idea.meta.summary,
    alternates: { canonical: `/ideas/${idea.meta.slug}` },
    openGraph: {
      title: idea.meta.title,
      description: idea.meta.summary,
      type: "article",
      publishedTime: idea.meta.publishedDate,
    },
  };
}

export default async function IdeaPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) notFound();
  const { meta, Body } = idea;
  return (
    <>
      <Header />
      <main id="main">
        <ArticleHeader meta={meta} />
        <Section aria-label="Article body" className="border-t border-[color:var(--color-border-subtle)]">
          <Container>
            <Reveal>
              <article className="idea-prose mx-auto max-w-3xl">
                <Body />
                {meta.mirrorQuestion ? (
                  <MirrorQuestion>{meta.mirrorQuestion}</MirrorQuestion>
                ) : null}
              </article>
            </Reveal>
          </Container>
        </Section>
        <PutThisIntoPractice resourceSlug={meta.relatedResourceSlug} />
        <RelatedIdeas slug={meta.slug} />
        <BackToIdeas />
      </main>
      <Footer />
    </>
  );
}
