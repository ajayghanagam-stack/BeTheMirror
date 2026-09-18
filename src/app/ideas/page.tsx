import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IdeasHero } from "@/components/site/ideas/IdeasHero";
import { FeaturedIdea } from "@/components/site/ideas/FeaturedIdea";
import { LatestIdeas } from "@/components/site/ideas/LatestIdeas";
import { ExploreByTheme } from "@/components/site/ideas/ExploreByTheme";
import { MirrorMomentsPreview } from "@/components/site/ideas/MirrorMomentsPreview";

export const metadata: Metadata = {
  title: "Ideas | Be the Mirror",
  description:
    "Explore practical ideas about leadership, transformation, change agents, organizational culture and AI-driven change from Be the Mirror.",
  alternates: { canonical: "/ideas" },
};

export default function IdeasPage() {
  return (
    <>
      <Header />
      <main id="main">
        <IdeasHero />
        <FeaturedIdea />
        <LatestIdeas />
        <ExploreByTheme />
        <MirrorMomentsPreview />
      </main>
      <Footer />
    </>
  );
}
