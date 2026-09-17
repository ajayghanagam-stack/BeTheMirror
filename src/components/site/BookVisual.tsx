import Image from "next/image";

export function BookVisual({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      {/* subtle ambient light behind the book — CSS only, does not touch the image */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 55% at 55% 45%, rgba(245,201,77,0.22), transparent 70%), radial-gradient(50% 60% at 30% 60%, rgba(62,199,255,0.18), transparent 75%)",
        }}
      />
      <Image
        src="/book-hero-45.png"
        alt="Be the Mirror — A Change Agent's Guide to Transformation for an AI World by Lois Wortley, Ajay Ghanagam and Hiren Doshi"
        width={1254}
        height={1254}
        priority={priority}
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 80vw"
        className="h-auto w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
      />
    </figure>
  );
}
