// src/lib/enquiry-adapter.ts
//
// Enquiry submission adapter.
//
// Integration point for Phase 5. The default adapter logs the submission to
// the server console and returns { delivered: false, reason: "no-provider-configured" }.
// The UI honors that flag and shows a development-safe success state that does
// NOT claim email delivery.
//
// To wire a real email provider later, replace `submitEnquiry` below with a
// call to that provider using a server-side API key from process.env.
// Never expose credentials to the browser.

import type { EnquiryType, EngagementType, LocationFormat } from "./enquiry";

export type SubmitEnquiryInput = {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  enquiryType: EnquiryType;
  message: string;
  // Speaking / workshop extras (optional)
  engagementType?: EngagementType;
  event?: string;
  preferredDate?: string;
  location?: LocationFormat;
  audienceSize?: string;
};

export type SubmitResult =
  | { ok: true; delivered: boolean; reason?: string }
  | { ok: false; errors: Record<string, string> };

export async function submitEnquiry(input: SubmitEnquiryInput): Promise<SubmitResult> {
  // Redact email for the log line; keep it inspectable server-side.
  const safeSummary = {
    name: input.name,
    email: input.email.replace(/(.).+(@.+)/, "$1***$2"),
    organization: input.organization ?? "",
    enquiryType: input.enquiryType,
    engagementType: input.engagementType ?? "",
    location: input.location ?? "",
    messageLength: input.message.length,
  };
  console.info("[enquiry] received (no provider wired):", safeSummary);
  return { ok: true, delivered: false, reason: "no-provider-configured" };
}
