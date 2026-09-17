import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { OpeningProvocation } from "@/components/site/sections/OpeningProvocation";
import { WhyTransformationsStruggle } from "@/components/site/sections/WhyTransformationsStruggle";
import { FragmentationToTransformation } from "@/components/site/sections/FragmentationToTransformation";
import { MirrorPhilosophy } from "@/components/site/sections/MirrorPhilosophy";
import { WhoIsThisFor } from "@/components/site/sections/WhoIsThisFor";
import { MirrorMoments } from "@/components/site/sections/MirrorMoments";
import { BookPreview } from "@/components/site/sections/BookPreview";
import { AuthorsPreview } from "@/components/site/sections/AuthorsPreview";
import { FinalCTA } from "@/components/site/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <OpeningProvocation />
        <WhyTransformationsStruggle />
        <FragmentationToTransformation />
        <MirrorPhilosophy />
        <WhoIsThisFor />
        <MirrorMoments />
        <BookPreview />
        <AuthorsPreview />
        <FinalCTA />
      </main>
    </>
  );
}
