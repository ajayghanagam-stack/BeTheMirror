// src/lib/enquiry.ts
// Enquiry taxonomies used by /contact, /speaking, and the submission adapter.

export type EnquiryType = "general" | "speaking" | "workshop" | "media" | "book";

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  general: "General Inquiry",
  speaking: "Speaking",
  workshop: "Workshop",
  media: "Media / Interview",
  book: "Book / Event",
};

export const ENQUIRY_TYPES: readonly EnquiryType[] = [
  "general",
  "speaking",
  "workshop",
  "media",
  "book",
] as const;

export type EngagementType = "keynote" | "executive" | "workshop" | "panel" | "virtual";

export const ENGAGEMENT_TYPE_LABELS: Record<EngagementType, string> = {
  keynote: "Keynote",
  executive: "Executive Session",
  workshop: "Workshop",
  panel: "Panel / Fireside Chat",
  virtual: "Virtual Session",
};

export type LocationFormat = "in-person" | "virtual" | "hybrid" | "unsure";

export const LOCATION_FORMAT_LABELS: Record<LocationFormat, string> = {
  "in-person": "In Person",
  virtual: "Virtual",
  hybrid: "Hybrid",
  unsure: "Not Sure Yet",
};

// Narrow an untrusted string to a known EnquiryType, or return the fallback.
export function coerceEnquiryType(value: unknown, fallback: EnquiryType = "general"): EnquiryType {
  return typeof value === "string" && (ENQUIRY_TYPES as readonly string[]).includes(value)
    ? (value as EnquiryType)
    : fallback;
}
