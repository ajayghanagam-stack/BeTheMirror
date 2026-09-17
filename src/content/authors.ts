export type AuthorImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Author = {
  slug: string;
  name: string;
  role?: string;
  shortBio?: string;
  fullBio?: string;
  expertise?: readonly string[];
  linkedinUrl?: string;
  perspective?: string;
  speakingTopics?: readonly string[];
  image?: AuthorImage;
};

// Canonical author order — do not change without a spec update.
// Content fields deliberately omitted (undefined) rather than fabricated.
// The UI renders explicit "to be provided" placeholders whenever a field is missing.
export const AUTHORS: readonly Author[] = [
  { slug: "lois-wortley",  name: "Lois Wortley" },
  { slug: "ajay-ghanagam", name: "Ajay Ghanagam" },
  { slug: "hiren-doshi",   name: "Hiren Doshi" },
] as const;
