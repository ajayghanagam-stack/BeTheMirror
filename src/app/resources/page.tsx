import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ResourcesHero } from "@/components/site/resources/ResourcesHero";
import { FeaturedResource } from "@/components/site/resources/FeaturedResource";
import { ResourceGrid } from "@/components/site/resources/ResourceGrid";

export const metadata: Metadata = {
  title: "Resources | Be the Mirror",
  description:
    "Practical tools, checklists and reflection guides for leaders and change agents navigating organizational transformation and AI-driven change.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <ResourcesHero />
        <FeaturedResource />
        <ResourceGrid />
      </main>
      <Footer />
    </>
  );
}
