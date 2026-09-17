import type { ComponentType } from "react";

export type IdeaCategory =
  | "Leadership"
  | "Transformation"
  | "Change Agents"
  | "AI Transformation"
  | "Organizational Culture"
  | "Technology Leadership"
  | "Change Management"
  | "Book Insights"
  | "Mirror Moments";

export const IDEA_CATEGORIES: readonly IdeaCategory[] = [
  "Leadership",
  "Transformation",
  "Change Agents",
  "AI Transformation",
  "Organizational Culture",
  "Technology Leadership",
  "Change Management",
  "Book Insights",
  "Mirror Moments",
];

export type IdeaAuthor = "Be the Mirror Editorial" | "Lois Wortley" | "Ajay Ghanagam" | "Hiren Doshi";

export type IdeaStatus = "draft" | "published";

export type IdeaMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  category: IdeaCategory;
  tags?: readonly string[];
  author: IdeaAuthor;
  publishedDate: string; // ISO YYYY-MM-DD
  readingTime: number;   // minutes
  featured?: boolean;
  status: IdeaStatus;
  relatedIdeaSlugs?: readonly string[];
  relatedResourceSlug?: string;
  mirrorQuestion?: string;
};

export type IdeaModule = { meta: IdeaMeta; Body: ComponentType };

// Task 3 replaces this stub with real imports.
const modules: readonly { meta: IdeaMeta; default: ComponentType }[] = [];

export const IDEAS: readonly IdeaModule[] = modules
  .filter((m) => m.meta.status === "published")
  .map((m) => ({ meta: m.meta, Body: m.default }))
  .sort((a, b) => (a.meta.publishedDate > b.meta.publishedDate ? -1 : 1));

export function getIdea(slug: string): IdeaModule | undefined {
  return IDEAS.find((i) => i.meta.slug === slug);
}

export function getFeaturedIdea(): IdeaModule | undefined {
  return IDEAS.find((i) => i.meta.featured) ?? IDEAS[0];
}

export function getCategories(): ReadonlyArray<{ category: IdeaCategory; count: number }> {
  const counts = new Map<IdeaCategory, number>();
  for (const i of IDEAS) counts.set(i.meta.category, (counts.get(i.meta.category) ?? 0) + 1);
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }));
}

export function getRelatedIdeas(slug: string, limit = 3): readonly IdeaModule[] {
  const source = getIdea(slug);
  if (!source) return [];
  const explicit = (source.meta.relatedIdeaSlugs ?? [])
    .map((s) => getIdea(s))
    .filter((i): i is IdeaModule => Boolean(i));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fallback = IDEAS.filter(
    (i) => i.meta.slug !== slug && i.meta.category === source.meta.category
  );
  const merged: IdeaModule[] = [...explicit];
  for (const i of fallback) {
    if (merged.length >= limit) break;
    if (!merged.find((m) => m.meta.slug === i.meta.slug)) merged.push(i);
  }
  return merged.slice(0, limit);
}
