export type BookChapterData = {
  number: number;
  title: string;
  summary: string;
  optionalQuote?: string;
};

export type ExcerptData = {
  text: string;
  source?: string;
};

export type TestimonialData = {
  quote: string;
  attribution: string;
  role?: string;
  org?: string;
};

export type BookTheme = { title: string; summary: string };
export type BookAudience = { situation: string; label?: string };

// Empty until verified content is supplied. Consumers render placeholder blocks
// when these arrays are empty. Do not populate with fabricated chapter names,
// excerpts, or endorsements.
export const CHAPTERS: readonly BookChapterData[] = [] as const;
export const EXCERPTS: readonly ExcerptData[] = [] as const;
export const TESTIMONIALS: readonly TestimonialData[] = [] as const;

// Themes are framing labels (broad ideas). They are NOT chapter titles.
// The UI must label this section as "themes" or "ideas", never "chapters".
export const BOOK_THEMES: readonly BookTheme[] = [
  { title: "Leading through transformation",
    summary: "How leaders shape whether change becomes real for the people it asks to change." },
  { title: "Understanding resistance",
    summary: "Resistance often signals something rational about the change itself." },
  { title: "Building trust during change",
    summary: "Trust is the currency change spends — and how it is rebuilt when spent down." },
  { title: "Creating change agents",
    summary: "Change scales when more people help others make sense of it." },
  { title: "Turning strategy into lived experience",
    summary: "The distance between what is announced and what is experienced." },
  { title: "Culture and organizational behaviour",
    summary: "The patterns that shape how a change is absorbed, ignored, or reshaped." },
  { title: "Technology transformation",
    summary: "Why implementation and adoption are not the same thing." },
  { title: "AI-driven change",
    summary: "What accelerates when the technology accelerates — and what does not." },
  { title: "Learning and adaptability",
    summary: "How organizations build the capability to keep changing." },
  { title: "Sustainable transformation",
    summary: "What it takes for change to hold after the program ends." },
] as const;

// Audiences: situations, not job-title claims.
export const BOOK_AUDIENCES: readonly BookAudience[] = [
  { label: "For leaders",
    situation: "trying to understand why a well-designed transformation is struggling to gain traction." },
  { label: "For technology leaders",
    situation: "discovering that implementation and adoption are not the same thing." },
  { label: "For managers",
    situation: "helping teams work through uncertainty." },
  { label: "For change agents",
    situation: "who need to influence without always having authority." },
  { label: "For AI leaders",
    situation: "introducing AI into organizations that are still learning how to absorb continuous change." },
  { label: "For HR and organizational leaders",
    situation: "supporting people through overlapping waves of change." },
  { label: "For consultants and coaches",
    situation: "working alongside organizations navigating transformation." },
] as const;
