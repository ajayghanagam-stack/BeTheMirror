export type ResourceType =
  | "Checklist"
  | "Assessment"
  | "Discussion Guide"
  | "Worksheet"
  | "Framework"
  | "Playbook";

export type ResourceStatus = "available" | "coming-soon" | "in-development";

export type ResourceAudience = "Leadership" | "Transformation" | "AI" | "Change Agents";

export type ResourceData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  audience: readonly ResourceAudience[];
  status: ResourceStatus;
  downloadUrl?: string;
  externalUrl?: string;
  emailRequired?: boolean;
  featured?: boolean;
  relatedIdeaSlug?: string;
};

export const RESOURCES: readonly ResourceData[] = [
  {
    id: "res-01",
    slug: "be-the-mirror-leadership-checklist",
    title: "Be the Mirror Leadership Checklist",
    description:
      "A short reflection tool for leaders to examine how their own actions may be shaping transformation.",
    type: "Checklist",
    audience: ["Leadership"],
    status: "coming-soon",
    featured: true,
    relatedIdeaSlug: "before-another-framework-look-in-the-mirror",
  },
  {
    id: "res-02",
    slug: "transformation-readiness-assessment",
    title: "Transformation Readiness Assessment",
    description:
      "A structured self-assessment to gauge how ready an organization is for the transformation it is about to attempt.",
    type: "Assessment",
    audience: ["Leadership", "Transformation"],
    status: "coming-soon",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
  {
    id: "res-03",
    slug: "change-agent-reflection-guide",
    title: "Change Agent Reflection Guide",
    description:
      "Questions to help change agents examine the assumptions they bring to a transformation before asking others to change.",
    type: "Discussion Guide",
    audience: ["Change Agents"],
    status: "coming-soon",
    relatedIdeaSlug: "change-agents-dont-need-to-control-everything",
  },
  {
    id: "res-04",
    slug: "ai-transformation-readiness-checklist",
    title: "AI Transformation Readiness Checklist",
    description:
      "A practical checklist for leaders introducing AI into everyday work — beyond tools and toward adoption.",
    type: "Checklist",
    audience: ["AI", "Leadership"],
    status: "coming-soon",
    relatedIdeaSlug: "ai-adoption-is-an-organizational-change-problem",
  },
  {
    id: "res-05",
    slug: "leadership-reflection-questions",
    title: "Leadership Reflection Questions",
    description:
      "A worksheet of reflection prompts for leaders navigating transformation, resistance and the gap between intent and experience.",
    type: "Worksheet",
    audience: ["Leadership"],
    status: "coming-soon",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
  {
    id: "res-06",
    slug: "team-transformation-conversation-guide",
    title: "Team Transformation Conversation Guide",
    description:
      "A discussion guide for team-level conversations about what is changing, why it matters, and what people need to make the change stick.",
    type: "Discussion Guide",
    audience: ["Leadership", "Change Agents"],
    status: "coming-soon",
    relatedIdeaSlug: "why-people-resist-change",
  },
];

export function getResource(slug: string): ResourceData | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcesByAudience(audience: ResourceAudience): readonly ResourceData[] {
  return RESOURCES.filter((r) => r.audience.includes(audience));
}
