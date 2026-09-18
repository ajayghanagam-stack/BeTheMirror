"use server";
// src/app/actions/submit-enquiry.ts

import { coerceEnquiryType } from "@/lib/enquiry";
import { submitEnquiry, type SubmitResult } from "@/lib/enquiry-adapter";

export type { SubmitResult };

export async function submitEnquiryAction(
  _prev: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const organization = (formData.get("organization") ?? "").toString().trim();
  const role = (formData.get("role") ?? "").toString().trim();
  const enquiryTypeRaw = formData.get("enquiryType")?.toString();
  const message = (formData.get("message") ?? "").toString().trim();
  const engagementType = (formData.get("engagementType") ?? "").toString().trim() || undefined;
  const event = (formData.get("event") ?? "").toString().trim() || undefined;
  const preferredDate = (formData.get("preferredDate") ?? "").toString().trim() || undefined;
  const location = (formData.get("location") ?? "").toString().trim() || undefined;
  const audienceSize = (formData.get("audienceSize") ?? "").toString().trim() || undefined;

  const errors: Record<string, string> = {};

  if (name.length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const enquiryType = coerceEnquiryType(enquiryTypeRaw);

  if (message.length < 10) {
    errors.message = "Please tell us a bit more (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return submitEnquiry({
    name,
    email,
    organization: organization || undefined,
    role: role || undefined,
    enquiryType,
    message,
    engagementType: engagementType as Parameters<typeof submitEnquiry>[0]["engagementType"],
    event,
    preferredDate,
    location: location as Parameters<typeof submitEnquiry>[0]["location"],
    audienceSize,
  });
}
