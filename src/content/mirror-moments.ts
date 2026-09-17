export type MirrorMomentCategory =
  | "Transformation"
  | "Leadership"
  | "Change Management"
  | "Change Agents";

export type MirrorMomentData = {
  id: string;
  slug: string;
  paragraphs: readonly string[];
  emphasisIndex?: number; // index into paragraphs — rendered in accent-yellow
  category: MirrorMomentCategory;
  author: "Be the Mirror Editorial";
  publishedDate: string;
  featured?: boolean;
};

export const MIRROR_MOMENTS: readonly MirrorMomentData[] = [
  {
    id: "mm-01",
    slug: "why-people-resist-change",
    paragraphs: [
      "We often ask why people resist change.",
      "A better question may be:",
      "What about the change made resistance rational?",
    ],
    emphasisIndex: 2,
    category: "Change Management",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-02",
    slug: "technology-vs-organizations",
    paragraphs: [
      "Technology can change in months.",
      "Organizations rarely do.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-03",
    slug: "announced-vs-experienced",
    paragraphs: [
      "Transformation isn\u2019t what leadership announces.",
      "It\u2019s what people experience.",
    ],
    category: "Leadership",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
    featured: true,
  },
  {
    id: "mm-04",
    slug: "implementation-vs-adoption",
    paragraphs: [
      "Implementation changes systems.",
      "Adoption changes behaviour.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-05",
    slug: "plan-vs-organization",
    paragraphs: [
      "A transformation plan tells you where you want to go.",
      "Your organization tells you how difficult the journey will be.",
    ],
    category: "Transformation",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-06",
    slug: "change-fatigue",
    paragraphs: [
      "Change fatigue is not always resistance to change.",
      "Sometimes it is resistance to one more unfinished transformation.",
    ],
    category: "Change Management",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-07",
    slug: "intent-vs-experience",
    paragraphs: [
      "The gap between leadership intent and employee experience is where many transformations struggle.",
    ],
    category: "Leadership",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
  {
    id: "mm-08",
    slug: "somebody-elses-strategy",
    paragraphs: [
      "If people do not understand why change matters to them, the strategy will remain somebody else\u2019s strategy.",
    ],
    category: "Change Agents",
    author: "Be the Mirror Editorial",
    publishedDate: "2026-09-17",
  },
];

export function getMirrorMoment(slug: string): MirrorMomentData | undefined {
  return MIRROR_MOMENTS.find((m) => m.slug === slug);
}
