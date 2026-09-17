import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AuthorsHero } from "@/components/site/authors/AuthorsHero";
import { SharedStory } from "@/components/site/authors/SharedStory";
import { AuthorProfile } from "@/components/site/authors/AuthorProfile";
import { AuthorsCollectiveCTA } from "@/components/site/authors/AuthorsCollectiveCTA";
import { AUTHORS } from "@/content/authors";

export const metadata: Metadata = {
  title: "Authors | Be the Mirror",
  description:
    "Meet Lois Wortley, Ajay Ghanagam and Hiren Doshi, authors of Be the Mirror: A Change Agent\u2019s Guide to Transformation for an AI World.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <AuthorsHero />
        <SharedStory />
        {AUTHORS.map((author, i) => (
          <AuthorProfile key={author.slug} author={author} index={i} />
        ))}
        <AuthorsCollectiveCTA />
      </main>
      <Footer />
    </>
  );
}
