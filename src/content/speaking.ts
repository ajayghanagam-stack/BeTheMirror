// src/content/speaking.ts
export type SessionTopic = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  relatedIdeaSlug?: string;
};

export type EngagementFormat = {
  id: string;
  label: string;
  description: string;
};

export type AudienceGroup = {
  id: string;
  label: string;
};

export type Outcome = {
  id: string;
  text: string;
};

export const SESSION_TOPICS: readonly SessionTopic[] = [
  {
    slug: "be-the-mirror-leading-from-within",
    title: "Be the Mirror: Leading Transformation from Within",
    oneLiner: "Seeing what is really happening during change.",
    description:
      "How leaders and change agents can help organizations see what is really happening during transformation \u2014 including resistance, trust, behaviour, and the gap between intention and experience.",
    relatedIdeaSlug: "before-another-framework-look-in-the-mirror",
  },
  {
    slug: "transformation-in-an-ai-world",
    title: "Transformation in an AI World",
    oneLiner: "Why absorbing AI is harder than deploying it.",
    description:
      "AI can accelerate technology change dramatically. The harder challenge is helping organizations absorb, adopt, and sustain that change.",
    relatedIdeaSlug: "technology-can-change-faster-than-organizations",
  },
  {
    slug: "why-people-resist-change",
    title: "Why People Resist Change",
    oneLiner: "Resistance as a rational response.",
    description:
      "A practical conversation about resistance, uncertainty, trust, and why resistance may sometimes be a rational response to how change is introduced.",
    relatedIdeaSlug: "why-people-resist-change",
  },
  {
    slug: "building-change-agents-inside-the-organization",
    title: "Building Change Agents Inside the Organization",
    oneLiner: "Influence without formal authority.",
    description:
      "How people can influence transformation even when they do not have formal authority or control.",
    relatedIdeaSlug: "change-agents-dont-need-to-control-everything",
  },
  {
    slug: "ai-adoption-is-an-organizational-change-problem",
    title: "AI Adoption Is an Organizational Change Problem",
    oneLiner: "Deploying AI is only part of the journey.",
    description:
      "Why deploying AI technology is only part of the journey \u2014 and why adoption depends on leadership, behaviour, trust, skills, and operating models.",
    relatedIdeaSlug: "ai-adoption-is-an-organizational-change-problem",
  },
  {
    slug: "from-transformation-fatigue-to-transformation-ownership",
    title: "From Transformation Fatigue to Transformation Ownership",
    oneLiner: "Beyond repeated programs.",
    description:
      "How organizations can move beyond repeated programs and help people participate meaningfully in change.",
    relatedIdeaSlug: "transformation-intent-vs-experience",
  },
] as const;

export const ENGAGEMENT_FORMATS: readonly EngagementFormat[] = [
  {
    id: "keynote",
    label: "Keynote",
    description:
      "A focused leadership talk designed for conferences, executive events, and large organizational gatherings.",
  },
  {
    id: "executive",
    label: "Executive Session",
    description:
      "A facilitated conversation with senior leaders around transformation, leadership, and organizational change.",
  },
  {
    id: "workshop",
    label: "Workshop",
    description:
      "An interactive session where teams reflect on current transformation challenges and apply Be the Mirror ideas.",
  },
  {
    id: "panel",
    label: "Panel / Fireside Chat",
    description:
      "A conversational format for leadership events, conferences, and internal programs.",
  },
  {
    id: "virtual",
    label: "Virtual Session",
    description:
      "A remote session for distributed leadership or transformation teams.",
  },
] as const;

export const AUDIENCE_GROUPS: readonly AudienceGroup[] = [
  { id: "exec-leadership", label: "Executive leadership teams" },
  { id: "tech-leadership", label: "Technology leadership teams" },
  { id: "transformation-office", label: "Transformation offices" },
  { id: "product-engineering", label: "Product and engineering organizations" },
  { id: "hr-people", label: "HR / people leaders" },
  { id: "change-community", label: "Change management communities" },
  { id: "ai-adoption", label: "AI adoption teams" },
  { id: "corporate-events", label: "Corporate leadership events" },
  { id: "conferences", label: "Industry conferences" },
] as const;

export const OUTCOMES: readonly Outcome[] = [
  { id: "o1", text: "A clearer way to think about resistance." },
  { id: "o2", text: "A better understanding of the gap between transformation intent and employee experience." },
  { id: "o3", text: "Questions leaders can ask before introducing more process or technology." },
  { id: "o4", text: "Ways change agents can create influence." },
  { id: "o5", text: "A more human approach to AI adoption." },
  { id: "o6", text: "Practical reflection questions for leadership teams." },
] as const;
